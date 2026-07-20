import type { EvidenceItem } from '../types/content.types'
import { assetRegistry } from '../data/assetRegistry'

export const evidenceItems: EvidenceItem[] = [
  {
    id: "executive-cv-portfolio",
    title: "Executive CV Portfolio",
    category: "CV & Resume",
    status: "Available",
    visibility: "Public Preview",
    summary:
      "A structured executive profile covering Jonathan Blackburn’s founder journey, business history, technical capability, and current JB³Ai direction.",
    documentType: "PDF / DOCX",
    fileUrl: "/assets/pdfs/Jonathan_Blackburn_Premium_Resume.pdf",
    thumbnail: assetRegistry.evidencePlaceholder,
    tags: ["cv", "profile", "founder"],
    cautionNote:
      "Public version should remove private phone numbers, legacy contact details, and sensitive personal references."
  },
  {
    id: "core-skills-matrix",
    title: "Core Skills Matrix",
    category: "Skills & Technical Stack",
    status: "Available",
    visibility: "Public",
    summary:
      "A skills profile covering business strategy, systems architecture, AI product design, automation, media systems, and technical build capability.",
    documentType: "Profile",
    fileUrl: "/assets/pdfs/Jonathan Blackburn Resume.pdf",
    thumbnail: "/assets/images/evidence-skills.jpg",
    tags: ["skills", "technical", "systems"],
    cautionNote: ""
  },
  {
    id: "top-empowerment-finalist-2022",
    title: "Top Empowerment Awards 2022 Finalist",
    category: "Awards",
    status: "Verified",
    visibility: "Public",
    summary:
      "Public recognition connected to Jonathan Blackburn and iMED Distributors as a finalist in the Top Empowerment Awards 2022.",
    documentType: "Award Certificate",
    fileUrl: "/assets/images/artwork-curated/top-empowerment-award.jpg",
    thumbnail: "/assets/images/evidence-top-empowerment.jpg",
    tags: ["award", "imed", "entrepreneur"],
    cautionNote:
      "Use finalist wording only. Do not describe this as an overall award win."
  },
  {
    id: "absa-jewish-achiever-finalist-2022",
    title: "Absa Jewish Achiever Awards 2022 Finalist",
    category: "Awards",
    status: "Verified",
    visibility: "Public",
    summary:
      "Public finalist recognition for The Entrepreneur Award, supporting the founder turnaround and enterprise-building story.",
    documentType: "Award Certificate",
    fileUrl: "/assets/pdfs/Jewish_Achiever_finalist.pdf",
    thumbnail: "/assets/images/evidence-jewish-achiever.jpg",
    tags: ["award", "entrepreneur", "recognition"],
    cautionNote:
      "Confirm public-facing certificate version does not expose confidential judge or admin references."
  },
  {
    id: "essential-dna-sequencing",
    title: "Essential DNA Sequencing Certificate",
    category: "Certificates",
    status: "Verified",
    visibility: "Public Preview",
    summary:
      "Training evidence supporting Jonathan’s molecular diagnostics and DNA-related iMED chapter.",
    documentType: "Certificate",
    fileUrl: "/assets/pdfs/Ess DNA Seq__Attendance Certificates__Nov 2021_Jonathan Blackburn.pdf",
    thumbnail: "/assets/images/evidence-dna.jpg",
    tags: ["dna", "imed", "certificate"],
    cautionNote:
      "Avoid presenting short-course certificates as academic degrees."
  },
  {
    id: "iso-9001-qms-implementation",
    title: "ISO 9001 QMS Implementation",
    category: "Certificates",
    status: "Verified",
    visibility: "Public Preview",
    summary:
      "Quality management systems training linked to process design, compliance thinking, and operational structure.",
    documentType: "Certificate",
    fileUrl: "/assets/pdfs/ISO_implementation_auditing.pdf",
    thumbnail: "/assets/images/evidence-iso.jpg",
    tags: ["iso", "quality", "systems"],
    cautionNote:
      "Use as training evidence and process literacy, not as an active professional accreditation claim."
  },
  {
    id: "imed-historical-proof-chapter",
    title: "iMED Historical Proof Chapter",
    category: "Historical Archive",
    status: "Historical",
    visibility: "Historical",
    summary:
      "A historical proof chapter covering iMED’s diagnostic, forensic, COVID-response, laboratory, and medical systems work.",
    documentType: "Case File",
    fileUrl: "/assets/pdfs/JB³Ai Forensic Intelligence Systems OverviewV2-compressed.pdf",
    thumbnail: "/assets/images/evidence-imed.jpg",
    tags: ["imed", "laboratory", "historical"],
    cautionNote:
      "iMED should be presented as a historical chapter, not as an active operating service."
  },
  {
    id: "linkedin-recommendations",
    title: "LinkedIn Recommendations",
    category: "Recommendations",
    status: "Available",
    visibility: "Public",
    summary:
      "A curated set of professional recommendations from clients, partners, colleagues, and business associates.",
    documentType: "Recommendations",
    fileUrl: "/assets/pdfs/Jonathan_LinkedIn_Recommendations.pdf",
    thumbnail: "/assets/images/evidence-recommendations.jpg",
    tags: ["recommendations", "clients", "leadership"],
    cautionNote:
      "Categorise testimonials by historical business context so old Elite Technologies references do not confuse current JB³Ai positioning."
  },
  {
    id: "founder-due-diligence-pack",
    title: "Founder Due Diligence Pack",
    category: "Investor Vault",
    status: "Locked",
    visibility: "Investor Only",
    summary:
      "Controlled access due diligence material for verified investors, strategic partners, and formal review processes.",
    documentType: "Private Pack",
    fileUrl: "/assets/pdfs/JB³Ai Investment Deck Intelligence in Motion.pdf",
    thumbnail: "/assets/images/evidence-locked.jpg",
    tags: ["investor", "due-diligence", "locked"],
    cautionNote:
      "Do not expose publicly. Requires PIN or request-access workflow."
  },
  {
    id: "product-strategy-pack",
    title: "Product Strategy Pack",
    category: "Investor Vault",
    status: "Locked",
    visibility: "Investor Only",
    summary:
      "Private roadmap and product strategy material for the JB³Ai and Jonathan Blackburn OS ecosystem.",
    documentType: "Private Pack",
    fileUrl: "/assets/pdfs/OS³ Core Platform Briefings-compressed.pdf",
    thumbnail: "/assets/images/evidence-locked.jpg",
    tags: ["strategy", "roadmap", "investor"],
    cautionNote:
      "Public site may show that this exists, but document contents must remain restricted."
  }
];
