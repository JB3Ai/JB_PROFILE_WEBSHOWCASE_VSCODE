export interface LeadEmailPayload {
  name: string;
  email: string;
  intent: string;
  mode: 'access' | 'news' | string;
  newsletter: boolean;
  phone?: string;
}

const LEAD_ENGINE_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzuvuJn_QPdPQqal3Tbg4CJwsTMUl3aVIEO_BKn-TA2dMh_DAsd2Mqr64zRdU75y6Bltw/exec';

/**
 * Posts the lead to the Google Apps Script lead engine in parallel.
 * Uses text/plain to avoid a CORS preflight against Apps Script.
 * Fails soft: the lead engine must never break the site form.
 */
export async function sendLeadToEngine(payload: LeadEmailPayload): Promise<boolean> {
  try {
    const res = await fetch(LEAD_ENGINE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        first_name: payload.name.split(' ')[0] || '',
        last_name: payload.name.split(' ').slice(1).join(' ') || '',
        email: payload.email,
        phone: payload.phone || '',
        source: 'WEBSITE',
        mode: payload.mode || 'access',
        intent: payload.intent,
        optIn: payload.newsletter,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Posts the lead to the cPanel PHP mailer (public/api/lead.php).
 * The endpoint emails the owner a notification with the lead details.
 * Returns true when the server confirmed the send.
 * Fails soft (false) in local dev or if the endpoint is missing.
 */
export async function sendLeadEmail(payload: LeadEmailPayload): Promise<boolean> {
  // Stream the lead to the Apps Script engine in parallel. Fire-and-forget:
  // the engine must never block or break the PHP mailer path.
  void sendLeadToEngine(payload);
  try {
    const res = await fetch('/api/lead.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return !!data?.success;
  } catch {
    return false;
  }
}
