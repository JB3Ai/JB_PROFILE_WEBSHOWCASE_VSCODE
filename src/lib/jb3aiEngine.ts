const GAS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwciPurE_2Q-M03tNonrWret-PVsvKaZx3QPTgB7rWK1_EzMuFzyD9c1ElxSaQwj9eS8Q/exec";

export interface FounderLeadPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  inquiryType?: string;
}

export async function submitJonoBlackburnLead(formData: FounderLeadPayload) {
  const payload = {
    first_name: formData.firstName,
    last_name: formData.lastName || "",
    email: formData.email,
    phone: formData.phone || "",
    source: "JONOBLACKBURN_COM",
    inquiry_type: formData.inquiryType || "executive_advisory",
    opt_in: true
  };

  try {
    await fetch(GAS_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (error) {
    console.error("Lead submission error:", error);
    return false;
  }
}

export const submitFounderLead = submitJonoBlackburnLead;