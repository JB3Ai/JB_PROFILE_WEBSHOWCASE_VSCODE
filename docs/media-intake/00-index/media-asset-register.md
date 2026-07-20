# Media Asset Register

## Intake Rules

This register supports review and classification only. No candidate media in
`docs/media-intake` is approved for publication by being placed in this folder.

Important:

- Do not reference `media-intake` from application code or `assetRegistry.ts`.
- Do not commit raw videos, PDFs, documents, archive material, or private files.
- Anything committed beneath `public/` can become publicly accessible after
  deployment.
- Move approved, optimized public assets to their final production location
  only after a separate review and explicit approval.
- Keep legal, family, financial, court, evidence, investor, and private case
  material outside public deployment paths.
- Do not use `archive-candidates` as a live asset source.

## Public-Safe Status Labels

| Status | Meaning |
| --- | --- |
| `PUBLIC` | Approved as safe for website use or public download. |
| `PUBLIC-EXTRACT` | Potentially public-safe only after editing, redaction, trimming, or re-export. |
| `INVESTOR-ONLY` | Restricted review material that must not appear on public routes. |
| `BOOK-ONLY` | Manuscript or GTR³ publishing material that must not appear on the website. |
| `INTERNAL` | Reference or source material only. |
| `BLOCKED` | Do not upload, commit, publish, or distribute. |

## Review Guidance

- Use historical framing for Elite Technologies and iMED archive material.
- Do not imply iMED is currently operating.
- Keep GTR³ aspirational and do not imply the vehicle exists or has been
  obtained.
- Remove private names, direct contact details, signatures, addresses,
  financial information, case references, and confidential identifiers before
  considering public use.
- Treat DOC and DOCX files as source material unless a reviewed public extract
  is produced.
- Keep large raw video outside Git. Record it here first, then decide on editing
  and external hosting.
- Use one register row per source asset, including rejected or blocked assets,
  so decisions remain traceable.

## Asset Register

| Asset ID | Original filename | Asset type | Era/category | Public-safe status | Recommended use | Risk notes | Final proposed filename | Needs editing | Publish decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `VID-001` | `gtr-intro-vid.webm` | Video | GTR³ / book | `PUBLIC-EXTRACT` | Future GTR³ teaser candidate | Keep aspirational; confirm no ownership implication | `gtr3-loading-teaser-01.webm` | Yes | Hold |
| `VID-002` | `IMed Company Profile Video FINAL23.mp4` | Video | iMED historical | `PUBLIC-EXTRACT` | Historical iMED archive candidate | Reframe as historical and remove active-service cues | `imed-historical-profile-01.mp4` | Yes | Hold |
| `LINK-001` | `IMed Company Profile Video FINAL23.mp4 - Shortcut.lnk` | Shortcut | iMED historical | `BLOCKED` | None | Shortcut file, not a source asset | `n/a` | No | Block |
| `VID-003` | `iMED Company Profile.mp4` | Video | iMED historical | `PUBLIC-EXTRACT` | Historical iMED archive candidate | Reframe as historical and verify no current-service claim | `imed-historical-profile-02.mp4` | Yes | Hold |
| `VID-004` | `iMED DNA genetics video.mp4` | Video | iMED historical | `PUBLIC-EXTRACT` | Historical diagnostics chapter candidate | Historical only; review patient/privacy context | `imed-historical-dna-01.mp4` | Yes | Hold |
| `VID-005` | `loading accelerated systems.mp4` | Video | GTR³ / JB³Ai | `PUBLIC-EXTRACT` | Motion teaser candidate | Confirm public-safe tone and GTR³ aspiration | `gtr3-loading-systems-01.mp4` | Yes | Hold |
| `VID-006` | `mazanzi1_16_9.mp4` | Video | Unknown / archive | `INTERNAL` | Source review only | Context unclear; classify after review | `mazanzi-archive-source-01.mp4` | Yes | Hold |
| `PDF-001` | `52877 brochure (1).pdf` | PDF | Unknown / archive | `INTERNAL` | Source review only | Filename gives insufficient public context | `archive-brochure-source-01.pdf` | Yes | Hold |
| `PDF-002` | `Copy of Sovereign VOICEGRID Infrastructure Manual.pdf` | PDF | JB³Ai / VoiceGrid | `INTERNAL` | Product source reference | Infrastructure manual; not a public route asset | `voicegrid-infrastructure-source-01.pdf` | Yes | Hold |
| `PDF-003` | `Cyber-Noir Music Console Magazine-combined.pdf` | PDF | DukeBox / creative | `PUBLIC-EXTRACT` | Future creative project proof candidate | Review licensing, names, and media rights | `dukebox-cyber-noir-public-extract.pdf` | Yes | Hold |
| `PDF-004` | `Elite Technologies Company profile..pdf` | PDF | Elite Technologies historical | `PUBLIC-EXTRACT` | Historical Signal phase proof candidate | Archive only; remove old contacts and current-operation confusion | `elite-technologies-historical-profile.pdf` | Yes | Hold |
| `PDF-005` | `Global Satellite Overlay The Sentinel Eye.pdf` | PDF | JB³Ai / ViewGrid | `DELETED` | Removed 2026-07-20 | Superseded by compressed version | `viewgrid-sentinel-eye-source.pdf` | N/A | Archived |
| `PDF-006` | `iMED Marketing Brochure 2025.pdf` | PDF | iMED historical | `BLOCKED` | None | Risks implying iMED is currently operating | `n/a` | Yes | Block public |
| `PDF-007` | `JB³ ISIKOLO AI —final.pdf` | PDF | JB³Ai / education | `PUBLIC-EXTRACT` | Future JB³Ai product overview candidate | Review claims, contacts, and public readiness | `jb3ai-isikolo-public-extract.pdf` | Yes | Hold |
| `PDF-008` | `JB³ OS³ Dash The Operating System.pdf` | PDF | JB³Ai / OS³ | `PUBLIC-EXTRACT` | Future OS³ overview candidate | Review claims and remove sensitive roadmap detail | `jb3ai-os3-dash-public-extract.pdf` | Yes | Hold |
| `PDF-009` | `JB³Ai Forensic Intelligence Systems Overview.pdf` | PDF | JB³Ai / specialist product | `INTERNAL` | Source review only | Sensitive positioning; not public-ready | `jb3ai-specialist-systems-source.pdf` | Yes | Hold |
| `PDF-010` | `JB³Ai Intelligence in Motion (Presentation) (1).pdf` | PDF | JB³Ai / founder platform | `PUBLIC-EXTRACT` | Future JB³Ai public overview candidate | Review investor, roadmap, and private detail | `jb3ai-intelligence-in-motion-public-extract.pdf` | Yes | Hold |
| `PDF-011` | `Trust In Hope Brochure 2.0.pdf` | PDF | Trust in Hope / recovery | `PUBLIC-EXTRACT` | Structure phase story candidate | Review names, contact details, and sensitive recovery context | `trust-in-hope-public-extract.pdf` | Yes | Hold |
| `PDF-012` | `aiagents_draftv4.pdf` | PDF | JB³Ai / source draft | `INTERNAL` | Product source reference | Draft state; not public-approved | `ai-agents-source-draft-v4.pdf` | Yes | Hold |
| `PDF-013` | `company_profile2017.pdf` | PDF | iMED / historical archive | `PUBLIC-EXTRACT` | Historical iMED proof candidate | Archive only; remove outdated contacts and current-operation cues | `imed-historical-profile-2017.pdf` | Yes | Hold |
| `PDF-014` | `style guide.pdf` | PDF | Brand source | `INTERNAL` | Brand reference only | Source design material, not a download asset | `brand-style-guide-source.pdf` | No | Hold |
| `DOC-001` | `asssetsforjbweb.docx` | DOCX | Website source | `INTERNAL` | Asset planning reference | Source document; review before extracting public rows | `jbweb-assets-source.docx` | Yes | Hold |
| `IMG-001` | `dukebox bb.png` | Image | DukeBox / creative | `PUBLIC-EXTRACT` | Future project visual candidate | Verify rights, crop, and public context | `dukebox-project-candidate-01.png` | Yes | Hold |
| `IMG-002` | `dukebox.png` | Image | DukeBox / creative | `PUBLIC-EXTRACT` | Future project visual candidate | Verify rights, crop, and public context | `dukebox-project-candidate-02.png` | Yes | Hold |
| `IMG-003` | `isikolo.png` | Image | JB³Ai / education | `PUBLIC-EXTRACT` | Future Isikolo visual candidate | Verify product status and public-safe claims | `isikolo-ai-candidate-01.png` | Yes | Hold |
| `PDF-015` | `iMed Distributors (1).pdf` | PDF | iMED historical / awards | `PUBLIC-EXTRACT` | Historical iMED proof candidate | Historical only; check old contacts and active-service wording | `imed-distributors-historical-extract.pdf` | Yes | Hold |
| `PDF-016` | `iMED_Medical_Group_design.pdf` | PDF | iMED historical / press | `PUBLIC-EXTRACT` | Historical iMED archive candidate | Historical only; review branding and date context | `imed-medical-group-historical-extract.pdf` | Yes | Hold |
| `IMG-004` | `Jewish acheivers.jpg` | Image | Press / awards | `PUBLIC-EXTRACT` | Awards proof candidate | Verify finalist wording and image rights | `jewish-achievers-award-candidate.jpg` | Yes | Hold |
| `PDF-017` | `Jewish_Achiever_finalist.pdf` | PDF | Press / awards | `PUBLIC-EXTRACT` | Awards proof candidate | Use finalist wording only | `jewish-achiever-finalist-public-extract.pdf` | Yes | Hold |
| `DOC-002` | `recomendations.docx` | DOCX | Recommendations | `PUBLIC-EXTRACT` | Testimonial extract candidate | Remove private contacts and categorize historical context | `recommendations-public-extract.docx` | Yes | Hold |
| `IMG-005` | `Screenshot 2022-07-20 115944.jpg` | Image | Press / awards | `PUBLIC-EXTRACT` | Awards proof candidate | Verify source, crop, and public context | `award-screenshot-2022-candidate.jpg` | Yes | Hold |
| `IMG-006` | `topcomagazine2.png` | Image | Press / awards | `PUBLIC-EXTRACT` | Press proof candidate | Verify source, rights, and date context | `topco-magazine-proof-candidate.png` | Yes | Hold |
| `DOC-003` | `01 - Life of Perseverance.md` | Markdown | Founder bio / recovery | `PUBLIC-EXTRACT` | Founder story source candidate | Edit for public-safe recovery detail | `founder-perseverance-public-extract.md` | Yes | Hold |
| `DOC-004` | `02 - GTR3 Coming Soon Design.md` | Markdown | GTR³ / book | `BOOK-ONLY` | GTR³ manuscript/design source | Book layer; do not publish directly | `gtr3-coming-soon-source.md` | Yes | Hold |
| `DOC-005` | `03 - Lead with heart.md` | Markdown | Founder bio | `PUBLIC-EXTRACT` | Founder principles candidate | Review names and sensitive context | `founder-lead-with-heart-public-extract.md` | Yes | Hold |
| `DOC-006` | `04 - Quotes for book.md` | Markdown | GTR³ / book | `BOOK-ONLY` | Book quote source | Manuscript source only | `gtr3-book-quotes-source.md` | Yes | Hold |
| `IMG-007` | `DSC03322.JPG` | Image | Founder bio | `PUBLIC-EXTRACT` | Founder portrait/archive candidate | Needs selection, crop, and approval | `founder-archive-candidate-01.jpg` | Yes | Hold |
| `IMG-008` | `DSC03323.JPG` | Image | Founder bio | `PUBLIC-EXTRACT` | Founder portrait/archive candidate | Needs selection, crop, and approval | `founder-archive-candidate-02.jpg` | Yes | Hold |
| `IMG-009` | `DSC03324 - Copy.JPG` | Image | Founder bio | `PUBLIC-EXTRACT` | Founder portrait/archive candidate | Needs selection, crop, and approval | `founder-archive-candidate-03.jpg` | Yes | Hold |
| `IMG-010` | `DSC03328 - Copy.JPG` | Image | Founder bio | `PUBLIC-EXTRACT` | Founder portrait/archive candidate | Needs selection, crop, and approval | `founder-archive-candidate-04.jpg` | Yes | Hold |
| `IMG-011` | `DSC03329 - Copy.JPG` | Image | Founder bio | `PUBLIC-EXTRACT` | Founder portrait/archive candidate | Needs selection, crop, and approval | `founder-archive-candidate-05.jpg` | Yes | Hold |
| `IMG-012` | `flyerJPG.jpg` | Image | Founder bio / archive | `PUBLIC-EXTRACT` | Historical flyer candidate | Verify dates, contacts, and public context | `founder-flyer-archive-candidate.jpg` | Yes | Hold |
| `IMG-013` | `IMG_0166 - Copy.JPG` | Image | Founder bio | `PUBLIC-EXTRACT` | Founder portrait/archive candidate | Needs selection, crop, and approval | `founder-archive-candidate-06.jpg` | Yes | Hold |
| `IMG-014` | `IMG_0167 - Copy.JPG` | Image | Founder bio | `PUBLIC-EXTRACT` | Founder portrait/archive candidate | Needs selection, crop, and approval | `founder-archive-candidate-07.jpg` | Yes | Hold |
| `IMG-015` | `IMG_0229 - Copy.JPG` | Image | Founder bio | `PUBLIC-EXTRACT` | Founder portrait/archive candidate | Needs selection, crop, and approval | `founder-archive-candidate-08.jpg` | Yes | Hold |
| `IMG-016` | `IMG_0235 - Copy.JPG` | Image | Founder bio | `PUBLIC-EXTRACT` | Founder portrait/archive candidate | Needs selection, crop, and approval | `founder-archive-candidate-09.jpg` | Yes | Hold |
| `IMG-017` | `showroom.jpg` | Image | Founder bio / archive | `PUBLIC-EXTRACT` | Historical business archive candidate | Confirm era and avoid current-operation confusion | `showroom-archive-candidate-01.jpg` | Yes | Hold |
| `IMG-018` | `showroom2.jpg` | Image | Founder bio / archive | `PUBLIC-EXTRACT` | Historical business archive candidate | Confirm era and avoid current-operation confusion | `showroom-archive-candidate-02.jpg` | Yes | Hold |
| `DOC-007` | `the founders story.docx` | DOCX | Founder bio | `PUBLIC-EXTRACT` | Founder biography source candidate | Source only; edit before any public extract | `founder-story-source.docx` | Yes | Hold |
| `IMG-019` | `WORK - Copy.jpg` | Image | Founder bio / archive | `PUBLIC-EXTRACT` | Founder work archive candidate | Confirm context and public suitability | `founder-work-archive-candidate.jpg` | Yes | Hold |
| `IMG-020` | `ChatGPT Image May 14, 2026, 11_55_39 PM.png` | Image | JB³Ai brand | `PUBLIC-EXTRACT` | Brand visual candidate | Generated image; review rights, quality, and fit | `jb3ai-generated-brand-candidate-01.png` | Yes | Hold |
| `IMG-021` | `Gemini_Generated_Image_.png` | Image | JB³Ai brand | `PUBLIC-EXTRACT` | Brand visual candidate | Generated image; review rights, quality, and fit | `jb3ai-generated-brand-candidate-02.png` | Yes | Hold |
| `IMG-022` | `Gemini_Generated_Image_3pugid3pugid3pug.jpg` | Image | JB³Ai brand | `PUBLIC-EXTRACT` | Brand visual candidate | Generated image; review rights, quality, and fit | `jb3ai-generated-brand-candidate-03.jpg` | Yes | Hold |
| `IMG-023` | `Gemini_Generated_Image_e5l2d8e5l2d8e5l2.jpg` | Image | JB³Ai brand | `PUBLIC-EXTRACT` | Brand visual candidate | Generated image; review rights, quality, and fit | `jb3ai-generated-brand-candidate-04.jpg` | Yes | Hold |
| `IMG-024` | `Gemini_Generated_Image_h2dz4vh2dz4vh2dz (1).png` | Image | JB³Ai brand | `PUBLIC-EXTRACT` | Brand visual candidate | Generated image; review rights, quality, and fit | `jb3ai-generated-brand-candidate-05.png` | Yes | Hold |
| `VID-007` | `gtr-intro-vid.webm` | Video | GTR³ / JB³Ai brand | `PUBLIC-EXTRACT` | Future GTR³ teaser candidate | Duplicate candidate location; keep aspirational | `gtr3-loading-teaser-01.webm` | Yes | Hold |
| `PDF-018` | `Investigator AI.pdf` | PDF | JB³Ai / specialist product | `INTERNAL` | Product source reference | Sensitive positioning; not public-ready | `jb3ai-investigator-ai-source.pdf` | Yes | Hold |
| `IMG-025` | `isikoloAi.png` | Image | JB³Ai / education | `PUBLIC-EXTRACT` | Future Isikolo visual candidate | Verify product status and public-safe claims | `isikolo-ai-brand-candidate.png` | Yes | Hold |
| `PDF-019` | `JB³ OS³ Dash The Operating SystemCOMP.pdf` | PDF | JB³Ai / OS³ | `PUBLIC-EXTRACT` | Future OS³ overview candidate | Review claims and remove sensitive roadmap detail | `jb3ai-os3-dash-comp-public-extract.pdf` | Yes | Hold |
| `PDF-020` | `JB³Ai — Investment Deck Intelligence in Motion COMPR.pdf` | PDF | JB³Ai / investor | `INVESTOR-ONLY` | Investor source reference | Investor material; not for public routes | `jb3ai-investment-deck-source-01.pdf` | Yes | Hold |
| `PDF-021` | `JB³Ai Consulting.pdf` | PDF | JB³Ai / consulting | `PUBLIC-EXTRACT` | Public consulting overview candidate | Review contacts, claims, and pricing/context | `jb3ai-consulting-public-extract.pdf` | Yes | Hold |
| `PDF-022` | `JB3Ai_Consolidated_Brand_Style_Guide_v7.docx.pdf` | PDF | JB³Ai brand | `INTERNAL` | Brand source reference | Source guide; not public download | `jb3ai-brand-style-guide-source.pdf` | No | Hold |
| `PDF-023` | `jb3ai-consulting-and-accelerator.pdf` | PDF | JB³Ai / consulting | `PUBLIC-EXTRACT` | Public consulting overview candidate | Review claims and public readiness | `jb3ai-consulting-accelerator-public-extract.pdf` | Yes | Hold |
| `PDF-024` | `jb3ai-dash-the-operating-system.pdf` | PDF | JB³Ai / OS³ | `PUBLIC-EXTRACT` | Future OS³ overview candidate | Review claims and remove sensitive roadmap detail | `jb3ai-dash-operating-system-public-extract.pdf` | Yes | Hold |
| `PDF-025` | `jb3ai-executive-deck-os.pdf` | PDF | JB³Ai / investor | `INVESTOR-ONLY` | Investor source reference | Executive deck; not public route material | `jb3ai-executive-deck-source.pdf` | Yes | Hold |
| `PDF-026` | `jb3ai-intelligence-info-ai.pdf` | PDF | JB³Ai / public overview | `PUBLIC-EXTRACT` | Public JB³Ai overview candidate | Review claims and remove private context | `jb3ai-intelligence-info-public-extract.pdf` | Yes | Hold |
| `PDF-027` | `jb3ai-intelligence-managed.pdf` | PDF | JB³Ai / managed services | `PUBLIC-EXTRACT` | Public JB³Ai overview candidate | Review service language and public readiness | `jb3ai-intelligence-managed-public-extract.pdf` | Yes | Hold |
| `PDF-028` | `jb3ai-investigatorai-app-dash-v1.pdf` | PDF | JB³Ai / specialist product | `INTERNAL` | Product source reference | Sensitive positioning; not public-ready | `jb3ai-investigator-app-source.pdf` | Yes | Hold |
| `PDF-029` | `jb3ai-investment-deck-intelligence-in-motion.pdf` | PDF | JB³Ai / investor | `INVESTOR-ONLY` | Investor source reference | Investor material; not for public routes | `jb3ai-investment-deck-source-02.pdf` | Yes | Hold |
| `PDF-030` | `jb3ai-mindcareai-personal-support-and-growth.pdf` | PDF | JB³Ai / MindCare | `PUBLIC-EXTRACT` | Public product overview candidate | Review health/support claims and public wording | `jb3ai-mindcare-public-extract.pdf` | Yes | Hold |
| `PDF-031` | `jb3ai-os3-voice-grid.pdf` | PDF | JB³Ai / VoiceGrid | `PUBLIC-EXTRACT` | Public VoiceGrid overview candidate | Review claims and public readiness | `jb3ai-os3-voice-grid-public-extract.pdf` | Yes | Hold |
| `PDF-032` | `jb3ai-shieldai-silent-protection.pdf` | PDF | JB³Ai / specialist product | `INTERNAL` | Product source reference | Sensitive positioning; not public-ready | `jb3ai-shieldai-source.pdf` | Yes | Hold |
| `PDF-033` | `MindCare AI.pdf` | PDF | JB³Ai / MindCare | `PUBLIC-EXTRACT` | Public product overview candidate | Review health/support claims and public wording | `mindcare-ai-public-extract.pdf` | Yes | Hold |
| `PDF-034` | `OS³ Dash .pdf` | PDF | JB³Ai / OS³ | `PUBLIC-EXTRACT` | Public OS³ overview candidate | Review claims and public readiness | `os3-dash-public-extract.pdf` | Yes | Hold |
| `PDF-035` | `VIEWGRID Global Satellite Overlay The Sentinel Eye.pdf` | PDF | JB³Ai / ViewGrid | `DELETED` | Removed 2026-07-20 | Superseded by compressed version | `viewgrid-sentinel-eye-source-02.pdf` | N/A | Archived |
| `PDF-036` | `VOICEGRID Call Centre Infrastructure.pdf` | PDF | JB³Ai / VoiceGrid | `INTERNAL` | Product source reference | Infrastructure detail; not public route material | `voicegrid-call-centre-source.pdf` | Yes | Hold |

## 19C Public Extract Shortlist

This shortlist identifies the first public-extract candidates for future editing,
compression, redaction, and export. These assets are not approved for direct
publication and must remain outside `public/` until a separate integration pass.

| Shortlist ID | Asset ID | Original filename | Current classification | Proposed future output | Recommended use | Required redactions/edits | Safety notes | Priority | Publish readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `19C-001` | `DOC-007` | `the founders story.docx` | `PUBLIC-EXTRACT` | Founder story extract / media-kit bio source | Public founder profile and future media kit | Remove private family, legal, case, and sensitive recovery detail; compress into short public-safe narrative | Strong story value, but source document must not be published raw | High | Needs extract |
| `19C-002` | `DOC-005` | `03 - Lead with heart.md` | `PUBLIC-EXTRACT` | Founder operating principles extract | Founder Manual, speaking notes, public profile tone | Remove private names/context; keep principle-led language | Supports authored voice without needing sensitive detail | High | Needs edit |
| `19C-003` | `PDF-004` | `Elite Technologies Company profile..pdf` | `PUBLIC-EXTRACT` | Historical Elite Technologies proof extract | Signal phase archive proof and founder systems origin | Remove old contact details, addresses, pricing, and current-operation cues | Historical framing only; avoid implying active Elite operations | High | Needs extract |
| `19C-004` | `PDF-011` | `Trust In Hope Brochure 2.0.pdf` | `PUBLIC-EXTRACT` | Trust in Hope story extract | Structure phase public-safe recovery and service chapter | Remove personal names, contact details, and sensitive recovery specifics | Use recovery as structure/accountability lesson, not shock value | High | Needs extract |
| `19C-005` | `PDF-013` | `company_profile2017.pdf` | `PUBLIC-EXTRACT` | Historical iMED profile extract | Precision phase historical diagnostics proof | Remove outdated contacts and any active-service wording | iMED must remain historical and not a current service claim | High | Needs extract |
| `19C-006` | `PDF-017` | `Jewish_Achiever_finalist.pdf` | `PUBLIC-EXTRACT` | Award finalist proof card / media-kit proof point | Press and credibility proof pack | Use finalist wording only; verify rights and public source context | Avoid overstating award status | Medium | Needs edit |
| `19C-007` | `PDF-010` | `JB³Ai Intelligence in Motion (Presentation) (1).pdf` | `PUBLIC-EXTRACT` | JB³Ai public overview extract | AI for good / founder platform overview | Remove investor, roadmap, private, or speculative claims | Keep public-facing, principle-led JB³Ai language only | High | Needs extract |
| `19C-008` | `PDF-024` | `jb3ai-dash-the-operating-system.pdf` | `PUBLIC-EXTRACT` | OS³ public explainer extract | Executive Command OS / systems architecture proof | Remove sensitive roadmap or operational detail; simplify claims | Public overview only; no private OS workflow exposure | Medium | Needs extract |
| `19C-009` | `VID-001` | `gtr-intro-vid.webm` | `PUBLIC-EXTRACT` | Short GTR³ teaser clip or still frame | GTR³ third-rise story and social teaser | Trim if needed; confirm no ownership implication; export compressed web format | GTR³ must remain aspirational and symbolic | Medium | Needs edit |
| `19C-010` | `DOC-002` | `recomendations.docx` | `PUBLIC-EXTRACT` | Curated testimonial / recommendation extract | Public media kit credibility quotes | Remove private contacts, names unless approved, and sensitive context | Quote only approved excerpts; do not publish source doc | Medium | Needs extract |

## Intake Priority

1. Founder introduction video, 30-60 seconds
2. Public founder one-page PDF
3. JB³Ai public overview PDF
4. GTR³ book teaser PDF
5. Public press and awards proof pack
6. Public-safe historical iMED profile
7. Archive video clips for later media review
