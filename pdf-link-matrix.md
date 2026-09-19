# PDF Link Matrix

This matrix documents the PDF links used in the main page Projects section (`The OS³ Ecosystem: Live Architecture`) and the `/os` page.

## Main page Projects section

Source files:
- `src/sections/Portfolio.tsx` renders the Projects section.
- `src/data/apps.ts` defines the app entries with PDF links.

| Product ID | Product Title | PDF Role | PDF URL | Source Property |
|---|---|---|---|---|
| dukebox-london | The DukeBox of London | Cutsheet | `/assets/pdfs/The DUKEBOX Cutsheet.pdf` | `externalLink` |
| dukebox-london | The DukeBox of London | Brochure | `/assets/pdfs/Cyber-Noir Music Console Magazine Cover.pdf` | `brochureUrl` |
| isikulo-ai | JB³ Isikulo AI | Cutsheet | `/assets/pdfs/OS³ IsikuloAi CUTSHEET.pdf` | `externalLink` |
| isikulo-ai | JB³ Isikulo AI | Brochure | `/assets/pdfs/IsikoloAiforlearners.pdf` | `brochureUrl` |
| clipboard-ai | JB³ ClipboardAI | Cutsheet | `/assets/pdfs/OS³ ClipboardAi CUTSHEET.pdf` | `externalLink` |
| clipboard-ai | JB³ ClipboardAI | Brochure | `/assets/pdfs/JB³ OS³ Dash The Operating System-compressed.pdf` | `brochureUrl` |
| voicegrid-ai | JB³ VoiceGrid AI | Cutsheet | `/assets/pdfs/OS³ VoiceGridAi Telephone CUTSHEET.pdf` | `externalLink` |
| voicegrid-ai | JB³ VoiceGrid AI | Brochure | `/assets/pdfs/jb3ai-os3-voice-grid.pdf` | `brochureUrl` |
| superagents | JB³ SuperAgents | Cutsheet | `/assets/pdfs/JB3Ai_Super_Agent_Operating_System_V5.pdf` | `externalLink` |
| superagents | JB³ SuperAgents | Brochure | `/assets/pdfs/JB3Ai_Super_Agent_DASH.pdf` | `brochureUrl` |
| investigator-ai | JB³ InvestigatorAi | Brochure | `/assets/pdfs/jb3ai-investigatorai-app-dash-v1.pdf` | `brochureUrl` |
| newsroom-ai | JB³ NewsroomAi | Brochure | `/assets/pdfs/JB³ OS³ Dash The Operating System-compressed.pdf` | `brochureUrl` |
| viewgrid | JB³ ViewGrid | Cutsheet | `/assets/pdfs/Global Satellite Overlay The Sentinel Eye-compressed.pdf` | `externalLink` |
| consulting-accelerator | Consultancy and Accelerator Program | Cutsheet | `/assets/pdfs/jb3ai-consulting-and-accelerator-compressed.pdf` | `externalLink` |

Note: `investigator-ai` and `newsroom-ai` are gated products and only expose a brochure link via `brochureUrl` in the public Projects grid.

## `/os` page PDF links

Source files:
- `src/pages/OS.tsx` opens OS windows using `src/data/osApps.ts`.
- `src/components/os/OSFiles.tsx` renders direct file download links on the OS page.

### OS window PDF links from `src/data/osApps.ts`

| OS App ID | Window Title | PDF URL | Source Property |
|---|---|---|---|
| investigator-ai | JB³ InvestigatorAi | `/assets/pdfs/OS³ InvestigatorAi CUTSHEET.pdf` | `pdfUrl` |
| newsroom-ai | JB³ NewsroomAi | `/assets/pdfs/OS³ NewsRoomAi CUTSHEET.pdf` | `pdfUrl` |
| viewgrid | JB³ ViewGrid | `/assets/pdfs/Global Satellite Overlay The Sentinel Eye-compressed.pdf` | `pdfUrl` |
| cv-profile | Executive CV & Profile | `/assets/pdfs/Jonathan_Blackburn_Premium_Resume.pdf` | `pdfUrl` |
| investment-deck | Investment Deck | `/assets/pdfs/JB³Ai Investment Deck Intelligence in Motion-compressed.pdf` | `pdfUrl` |
| gtr3-sneak-peek | GTR³ Sneak Peek | `/assets/pdfs/GTR3_Publishing sneak peek.pdf` | `pdfUrl` |

### OS page download files from `src/components/os/OSFiles.tsx`

| Label | PDF URL | Source Category |
|---|---|---|
| Dual-Layer Intelligence: Eagle Star X JB³Ai | `/assets/pdfs/Dual-Layer Intelligence for Eagle StarXJB³Ai-compressed.pdf` | Intelligence Briefings |
| JB³Ai Forensic Intelligence Systems Overview | `/assets/pdfs/JB³Ai Forensic Intelligence Systems OverviewV2-compressed.pdf` | Intelligence Briefings |
| OS³ InvestigatorAi Cutsheet | `/assets/pdfs/OS³ InvestigatorAi CUTSHEET.pdf` | System Architecture & Records |
| OS³ NewsRoomAi Cutsheet | `/assets/pdfs/OS³ NewsRoomAi CUTSHEET.pdf` | System Architecture & Records |
| OS³ ClipboardAi Cutsheet | `/assets/pdfs/OS³ ClipboardAi CUTSHEET.pdf` | System Architecture & Records |
| Jonathan Blackburn: Executive Resume | `/assets/pdfs/Jonathan_Blackburn_Premium_Resume.pdf` | System Architecture & Records |
| The Bridge of Voices: The Story of Isikolo AI | `/assets/pdfs/The Bridge of Voices_ The Story of Isikolo AI.pdf` | System Architecture & Records |

## Notes

- Most Projects section PDF links are declared in `src/data/apps.ts` and rendered from `Portfolio.tsx`.
- The `/os` page uses both `osApps` window `pdfUrl` values and additional `OSFiles` download items.
- All URLs are relative to the application public assets root and resolve under `/assets/pdfs/`.

## Current server-side PDF file list

The following file paths are currently present on the cPanel server under `/public_html/assets/pdfs/`:

- AD_ISIKOLOAI - ADVERT SPONCERSHIP F1.pdf
- CHECK OS³ Core Platform BriefingsF1OPEN.pdf
- CHECK OS³ INVESTIGATORAI OPEN.pdf
- Cyber-Noir Music Console Magazine-combined.pdf
- Dual-Layer Intelligencetar×JBF1.pdf
- FINAL V2 JB³Ai Forensic Intelligence Systems Overview F1.pdf
- Global Satellite Overlay The Sentinel EyeF1.pdf
- IsikoloAi for learnersF1.pdf
- ISIKOLOAI_DRAFT1.mp4
- JB3_Business_Intelligence_Reports_Catalogue_2026_v2_F1.pdf
- JB3_Consulting & Accelerator_F1.pdf
- JB3Ai_Super_Agent_Operating_System_V5.pdf
- JB3InvestigatorAi VER1 Dash.pdf
- JB3InvestigatorAi VER2 DashF1.pdf
- JBInvestment Intelligence in MotionV2_F!.pdf
- JBInvestment Intelligence in MotionV2_F1.pdf
- JB³ OS³ Dash The Operating SystemF1.pdf
- Jonathan_Blackburn_Premium_Resume.pdf
- OS³ CLIPBOARDAI.pdf
- OS³ Core Platform Briefings WEB F1.pdf
- OS³ DUKEBOX LONDON CUTSHEET.pdf
- OS³ INVESTIGATOR_CUTSHEET_WEB.pdf
- OS³ ISIKOLOAI CUTSHEET.pdf
- OS³ NEWSROOMAI CUTSHEET.pdf
- OS³ VER1 Voice Grid_F1.pdf
- OS³ VOICEGRID CUTSHEET.pdf
- Sovereign VOICEGRID V2 Infrastructure ManualF1.pdf
- The Bridge of Voices_ The Story of Isikolo AI.pdf

## Suggested code reference updates

Based on the server-side file list, the following local references appear to be outdated or mismatched and should be updated to the corresponding current file names:

| Current repo reference | Suggested server file path |
|---|---|
| `/assets/pdfs/Cyber-Noir Music Console Magazine Cover.pdf` | `/assets/pdfs/Cyber-Noir Music Console Magazine-combined.pdf` |
| `/assets/pdfs/Dual-Layer Intelligence for Eagle StarXJB³Ai-compressed.pdf` | `/assets/pdfs/Dual-Layer Intelligencetar×JBF1.pdf` |
| `/assets/pdfs/IsikoloAiforlearners.pdf` | `/assets/pdfs/IsikoloAi for learnersF1.pdf` |
| `/assets/pdfs/JB³ OS³ Dash The Operating System-compressed.pdf` | `/assets/pdfs/JB³ OS³ Dash The Operating SystemF1.pdf` |
| `/assets/pdfs/JB³Ai Investment Deck Intelligence in Motion-compressed.pdf` | `/assets/pdfs/JBInvestment Intelligence in MotionV2_F1.pdf` |
| `/assets/pdfs/OS³ IsikuloAi CUTSHEET.pdf` | `/assets/pdfs/OS³ ISIKOLOAI CUTSHEET.pdf` |
| `/assets/pdfs/OS³ ClipboardAi CUTSHEET.pdf` | `/assets/pdfs/OS³ CLIPBOARDAI.pdf` |
| `/assets/pdfs/OS³ VoiceGridAi Telephone CUTSHEET.pdf` | `/assets/pdfs/OS³ VOICEGRID CUTSHEET.pdf` |
| `/assets/pdfs/jb3ai-investigatorai-app-dash-v1.pdf` | `/assets/pdfs/JB3InvestigatorAi VER1 Dash.pdf` |
| `/assets/pdfs/jb3ai-os3-voice-grid.pdf` | `/assets/pdfs/OS³ VOICEGRID CUTSHEET.pdf` |
| `/assets/pdfs/JB³Ai Forensic Intelligence Systems OverviewV2-compressed.pdf` | `/assets/pdfs/FINAL V2 JB³Ai Forensic Intelligence Systems Overview F1.pdf` |
| `/assets/pdfs/Global Satellite Overlay The Sentinel Eye-compressed.pdf` | `/assets/pdfs/Global Satellite Overlay The Sentinel EyeF1.pdf` |
| `/assets/pdfs/The Bridge of Voices_ The Story of Isikolo AI.pdf` | `/assets/pdfs/The Bridge of Voices_ The Story of Isikolo AI.pdf` (matches) |

The remaining references that do not have an obvious exact match in the provided server list are:

- `/assets/pdfs/GTR3_Publishing sneak peek.pdf`
- `/assets/pdfs/JBInvestment Intelligence in MotionV2_F!.pdf` (possibly a typo variant)

If you want, I can also update the local repo code to use these current server filenames directly.
