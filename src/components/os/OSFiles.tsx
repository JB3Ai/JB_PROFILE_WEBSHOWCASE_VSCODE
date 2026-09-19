import { Download } from 'lucide-react';

interface FileItem {
  label: string;
  url: string;
}

// Exclusive to the OS portal: security and intelligence applications first.
const intelligenceSecurity: FileItem[] = [
  {
    label: 'Dual-Layer Intelligence: Eagle Star X JB³Ai',
    url: '/assets/pdfs/dual-layer-intelligence-for-eagle-starxjb3ai-compressed.pdf',
  },
  {
    label: 'JB³Ai Forensic Intelligence Systems Overview',
    url: '/assets/pdfs/jb3ai-forensic-intelligence-systems-overviewv2-compressed.pdf',
  },
  { label: 'OS³ InvestigatorAi Cutsheet', url: '/assets/pdfs/os3-investigatorai-cutsheet.pdf' },
  { label: 'InvestigatorAi App Dashboard', url: '/assets/pdfs/jb3ai-investigatorai-app-dash-v1.pdf' },
  { label: 'OS³ NewsRoomAi Cutsheet', url: '/assets/pdfs/os3-newsroomai-cutsheet.pdf' },
  {
    label: 'Global Satellite Overlay: The Sentinel Eye',
    url: '/assets/pdfs/global-satellite-overlay-the-sentinel-eye-compressed.pdf',
  },
];

const systemArchitecture: FileItem[] = [
  { label: 'OS³ ClipboardAi Cutsheet', url: '/assets/pdfs/os3-clipboardai-cutsheet.pdf' },
  { label: 'OS³ VoiceGridAi Telephone Cutsheet', url: '/assets/pdfs/os3-voicegridai-telephone-cutsheet.pdf' },
  { label: 'VoiceGrid Ai Product Overview', url: '/assets/pdfs/jb3ai-os3-voice-grid.pdf' },
  { label: 'OS³ IsikuloAi Cutsheet', url: '/assets/pdfs/os3-isikuloai-cutsheet.pdf' },
  { label: 'Isikolo Ai for Learners', url: '/assets/pdfs/isikoloaiforlearners.pdf' },
  { label: 'The Bridge of Voices: The Story of Isikolo AI', url: '/assets/pdfs/the-bridge-of-voices-the-story-of-isikolo-ai.pdf' },
  { label: 'JB³Ai SuperAgent Operating System V5', url: '/assets/pdfs/jb3ai-super-agent-operating-system-v5.pdf' },
  { label: 'JB³Ai SuperAgent Dashboard', url: '/assets/pdfs/jb3ai-super-agent-dash.pdf' },
  { label: 'JB³ OS³ Dash: The Operating System', url: '/assets/pdfs/jb3-os3-dash-the-operating-system-compressed.pdf' },
  { label: 'The DukeBox Cutsheet', url: '/assets/pdfs/the-dukebox-cutsheet.pdf' },
  { label: 'Cyber-Noir Music Console Magazine Cover', url: '/assets/pdfs/cyber-noir-music-console-magazine-cover.pdf' },
];

const founderBusinessRecords: FileItem[] = [
  { label: 'JB³Ai Investment Deck: Intelligence in Motion', url: '/assets/pdfs/jb3ai-investment-deck-intelligence-in-motion-compressed.pdf' },
  { label: 'JB³Ai Consulting and Accelerator Brief', url: '/assets/pdfs/jb3ai-consulting-accelerator-brief.pdf' },
  { label: 'GTR³ Publishing Sneak Peek', url: '/assets/pdfs/gtr3-publishing-sneak-peek.pdf' },
  { label: 'Jonathan Blackburn: Executive Resume', url: '/assets/pdfs/jonathan-blackburn-premium-resume.pdf' },
  { label: 'Jonathan Blackburn: LinkedIn Recommendations', url: '/assets/pdfs/jonathan-linkedin-recommendations.pdf' },
  { label: 'Absa Jewish Achiever Awards 2022 Finalist', url: '/assets/pdfs/jewish-achiever-finalist.pdf' },
  { label: 'Essential DNA Sequencing Certificate', url: '/assets/pdfs/ess-dna-seq-attendance-certificates-nov-2021-jonathan-blackburn.pdf' },
  { label: 'ISO 9001 QMS Internal Audit', url: '/assets/pdfs/iso9001-internal-audit.pdf' },
];

function FileRow({ file }: { file: FileItem }) {
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-copper-500/40 hover:bg-white/10 transition-colors group"
    >
      <Download className="w-4 h-4 text-copper-400 shrink-0" />
      <span className="text-sm text-white/80 group-hover:text-white transition-colors">{file.label}</span>
    </a>
  );
}

function FileGroup({ title, files }: { title: string; files: FileItem[] }) {
  return (
    <div>
      <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{title}</p>
      <div className="space-y-2">
        {files.map(f => <FileRow key={f.url} file={f} />)}
      </div>
    </div>
  );
}

export default function OSFiles() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-white/60 leading-relaxed">
        Confidential briefings and system architecture records for cleared portal members.
      </p>
      <FileGroup title="Intelligence & Security (Portal Exclusive)" files={intelligenceSecurity} />
      <FileGroup title="System Architecture & Product Cutsheets" files={systemArchitecture} />
      <FileGroup title="Founder & Business Records" files={founderBusinessRecords} />
    </div>
  );
}
