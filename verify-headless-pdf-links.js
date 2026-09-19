import { chromium } from 'playwright-chromium';
import fs from 'fs';

const baseUrl = 'http://127.0.0.1:4173';
const results = [];

async function collectPdfLinks(page, pageUrl) {
  const anchorLinks = await page.$$eval('a[href]', (nodes) =>
    nodes.map((node) => ({ href: node.getAttribute('href'), text: node.textContent?.trim() }))
  );
  const iframeLinks = await page.$$eval('iframe[src]', (nodes) =>
    nodes.map((node) => ({ href: node.getAttribute('src'), text: node.getAttribute('title') || '' }))
  );
  const links = [...anchorLinks, ...iframeLinks]
    .filter((item) => item.href && /(\.pdf|\.mp4)(\?|#|$)/i.test(item.href))
    .map((item) => ({ href: item.href, text: item.text }));

  const uniqueLinksMap = new Map();
  links.forEach((item) => {
    try {
      const href = new URL(item.href, pageUrl).href;
      if (!uniqueLinksMap.has(href)) uniqueLinksMap.set(href, item);
    } catch {
      // ignore invalid URLs
    }
  });
  return Array.from(uniqueLinksMap.entries()).map(([href, item]) => ({ href, text: item.text }));
}

async function openOsWindow(page, label) {
  const clicked = await page.evaluate((labelText) => {
    const buttons = Array.from(document.querySelectorAll('button'));
    for (const btn of buttons) {
      const text = btn.textContent?.trim() ?? '';
      if (text === labelText || text.includes(labelText)) {
        btn.click();
        return true;
      }
    }
    return false;
  }, label);
  await page.waitForTimeout(800);
  return clicked;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  try {
    const page = await context.newPage();
    const osUrl = new URL('/os', baseUrl).href;
    console.log(`Navigating to ${osUrl}`);
    const response = await page.goto(osUrl, { waitUntil: 'networkidle', timeout: 30000 });
    if (!response) {
      console.warn(`No response for ${osUrl}`);
    } else {
      console.log(`${osUrl} responded ${response.status()}`);
    }

    await page.waitForLoadState('networkidle');
    await page.fill('input[type="text"]', 'Test User');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button:has-text("Enter Private OS")');
    await page.waitForSelector('button:has-text("Accept and Enter")', { timeout: 15000 });
    await page.click('button:has-text("Accept and Enter")');
    await page.waitForSelector('text=SYSTEMS NOMINAL', { timeout: 15000 });
    console.log('Logged in, accepted disclaimer, and landed on OS desktop');

    const windowsToOpen = [
      'Intelligence Files',
      'InvestigatorAi',
      'NewsroomAi',
      'ViewGrid',
      'CV Profile',
      'Investment Deck',
      'GTR³ Book',
    ];

    for (const label of windowsToOpen) {
      const opened = await openOsWindow(page, label);
      console.log(`Opened ${label}: ${opened}`);
    }

    await page.waitForTimeout(1500);
    const osLinks = await collectPdfLinks(page, osUrl);
    console.log(`/os after login: found ${osLinks.length} pdf links`);

    for (const item of osLinks) {
      const res = await context.request.get(item.href, { timeout: 30000 });
      const status = res.status();
      const contentType = res.headers()['content-type'] ?? '';
      const contentLength = res.headers()['content-length'] ?? '';
      console.log(`  ${item.href} -> ${status} ${contentType}`);
      results.push({ page: '/os', href: item.href, text: item.text, status, contentType, contentLength });
    }

    const homePage = await context.newPage();
    const homeUrl = new URL('/', baseUrl).href;
    const homeResp = await homePage.goto(homeUrl, { waitUntil: 'networkidle', timeout: 30000 });
    console.log(`${homeUrl} responded ${homeResp?.status()}`);
    await homePage.waitForLoadState('networkidle');
    const homeLinks = await collectPdfLinks(homePage, homeUrl);
    console.log(`/ home: found ${homeLinks.length} pdf links`);

    for (const item of homeLinks) {
      const res = await context.request.get(item.href, { timeout: 30000 });
      const status = res.status();
      const contentType = res.headers()['content-type'] ?? '';
      const contentLength = res.headers()['content-length'] ?? '';
      console.log(`  ${item.href} -> ${status} ${contentType}`);
      results.push({ page: '/', href: item.href, text: item.text, status, contentType, contentLength });
    }

    const csv = ['page,href,text,status,contentType,contentLength',
      ...results.map((row) =>
        [row.page, row.href, (row.text ?? '').replace(/"/g, '""'), row.status, row.contentType, row.contentLength]
          .map((x) => `"${String(x).replace(/"/g, '""')}"`)
          .join(',')
      )
    ].join('\n');
    fs.writeFileSync('headless_pdf_link_results.csv', csv, 'utf8');
    console.log(`Saved ${results.length} results to headless_pdf_link_results.csv`);
  } catch (error) {
    console.error('Error during headless verification:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
