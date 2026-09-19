import { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';

const BTC_ADDRESS = 'bc1q2ztwzh86f050sdpcwjgrhk0t6kj69r2q40aak0';

/**
 * Sponsorship payment buttons.
 *
 * Today: branded PayPal / Apple Pay buttons that deep-link to the PayPal.Me
 * page, so sponsorship works immediately.
 *
 * Live smart buttons: drop the PayPal Business client ID into
 * PAYPAL_CLIENT_ID below and the official PayPal JS SDK takes over,
 * rendering PayPal, Pay Later, card, and Apple Pay (on eligible Apple
 * devices) directly inline.
 */
const PAYPAL_CLIENT_ID = '';
const PAYPAL_ME_URL = 'https://paypal.me/jonoblackburnza';
const SUGGESTED_AMOUNTS = [5, 25, 75];

declare global {
  interface Window { paypal?: any }
}

export function SponsorPay() {
  const [amount, setAmount] = useState(25);
  const [sdkReady, setSdkReady] = useState(false);
  const [btcCopied, setBtcCopied] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);

  const copyBtcAddress = async () => {
    try {
      await navigator.clipboard.writeText(BTC_ADDRESS);
    } catch {
      // Clipboard API fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = BTC_ADDRESS;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setBtcCopied(true);
    window.setTimeout(() => setBtcCopied(false), 2000);
  };

  useEffect(() => {
    if (!PAYPAL_CLIENT_ID) return;
    const id = 'paypal-sdk-js';
    const render = () => setSdkReady(true);
    if (window.paypal) { render(); return; }
    if (document.getElementById(id)) return;
    const s = document.createElement('script');
    s.id = id;
    s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&enable-funding=paylater&components=buttons`;
    s.onload = render;
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    if (!sdkReady || !window.paypal || !btnRef.current) return;
    btnRef.current.innerHTML = '';
    window.paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
      createOrder: (_d: any, actions: any) => actions.order.create({
        purchase_units: [{
          amount: { value: amount.toFixed(2), currency_code: 'USD' },
          description: 'JB3 Isikulo AI sponsorship: Sponsor the Final 5%',
        }],
      }),
      onApprove: (_d: any, actions: any) => actions.order.capture(),
    }).render(btnRef.current);
  }, [sdkReady, amount]);

  const sdkActive = !!PAYPAL_CLIENT_ID;

  return (
    <div className="mt-10 mx-auto max-w-5xl grid gap-6 lg:grid-cols-[1fr_1.5fr_1fr] items-stretch">
      {/* Buy Me a Coffee QR */}
      <a
        href="https://buymeacoffee.com/jb3ai"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm text-center flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-copper-300 group"
      >
        <img
          src="/assets/images/qr-buymeacoffee.jpg"
          alt="Buy Me a Coffee QR code"
          loading="lazy"
          decoding="async"
          className="w-32 h-32 rounded-xl border border-ink-100"
        />
        <div>
          <p className="text-sm font-semibold text-ink-900">Buy Me a Coffee</p>
          <p className="text-xs text-ink-400 mt-0.5">Scan or tap to support</p>
        </div>
      </a>

      {/* PayPal Quick Sponsor */}
      <div className="rounded-2xl border border-ink-100 bg-white p-6 sm:p-8 shadow-sm text-center">
        <h4 className="text-lg font-semibold text-ink-900 tracking-tight">
          Quick Sponsor
        </h4>
        <p className="mt-1 text-sm text-ink-500">
          Secure checkout via PayPal. Pay in full, Pay Later, card, or Apple Pay on supported devices.
        </p>

        <div className="mt-4 flex justify-center gap-2">
          {SUGGESTED_AMOUNTS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setAmount(v)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                amount === v
                  ? 'bg-ink-900 text-white'
                  : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
              }`}
            >
              ${v}
            </button>
          ))}
        </div>

        {sdkActive ? (
          <div ref={btnRef} className="mt-5 min-h-[110px]" />
        ) : (
          <div className="mt-5 space-y-3">
            <a
              href={`${PAYPAL_ME_URL}/${amount}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center rounded-md bg-[#ffc439] text-[15px] font-semibold text-[#253b80] transition-opacity hover:opacity-90"
            >
              <span className="italic font-bold">
                <span className="text-[#253b80]">Pay</span><span className="text-[#179bd7]">Pal</span>
              </span>
              <span className="ml-2 text-[#111111]">Sponsor ${amount}</span>
            </a>
            <a
              href={`${PAYPAL_ME_URL}/${amount}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center rounded-md bg-black text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            >
              Donate with Apple Pay
            </a>
            <p className="text-xs text-ink-400">
              Apple Pay and Pay Later appear automatically at PayPal checkout on supported devices.
            </p>
          </div>
        )}
      </div>

      {/* Bitcoin QR */}
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm text-center flex flex-col items-center justify-center gap-3">
        <img
          src="/assets/images/qr-bitcoin.png"
          alt="Bitcoin wallet QR code"
          loading="lazy"
          decoding="async"
          className="w-32 h-32 rounded-xl border border-ink-100"
        />
        <div>
          <p className="text-sm font-semibold text-ink-900">Bitcoin</p>
          <p className="text-xs text-ink-400 mt-0.5">Scan to send BTC</p>
        </div>
        <button
          type="button"
          onClick={copyBtcAddress}
          className="inline-flex max-w-full items-center gap-2 rounded-full border border-ink-200 bg-warm-50 px-3 py-1.5 text-[11px] font-mono text-ink-600 transition-colors hover:border-copper-400 hover:text-copper-600"
          title={BTC_ADDRESS}
        >
          <span className="truncate">{BTC_ADDRESS}</span>
          {btcCopied ? (
            <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5 shrink-0" />
          )}
        </button>
        <p className="text-[10px] text-ink-400 -mt-1">
          {btcCopied ? 'Address copied' : 'Tap to copy wallet address'}
        </p>
      </div>
    </div>
  );
}
