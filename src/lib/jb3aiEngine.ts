const JB3AI_ENDPOINT = "https://script.google.com/macros/s/AKfycbwciPurE_2Q-M03tNonrWret-PVsvKaZx3QPTgB7rWK1_EzMuFzyD9c1ElxSaQwj9eS8Q/exec";

export interface FounderLeadPayload {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  inquiry_type: "investor_access" | "consulting_enquiry" | "general_lead";
  opt_in?: boolean;
}

export async function submitFounderLead(data: FounderLeadPayload): Promise<boolean> {
  const payload = {
    first_name: data.first_name,
    last_name: data.last_name || "",
    email: data.email,
    phone: data.phone || "",
    source: "JONOBLACKBURN_COM",
    inquiry_type: data.inquiry_type,
    opt_in: data.opt_in !== undefined ? data.opt_in : true
  };

  try {
    await fetch(JB3AI_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (error) {
    console.error("JB3AI Ingestion Failed:", error);
    return false;
  }
}