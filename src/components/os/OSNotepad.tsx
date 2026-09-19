import { useState } from 'react';
import { Mail } from 'lucide-react';

const WELCOME_TEXT = `Welcome to the JB³ Private OS.

This secure environment provides direct access to live intelligence architecture and confidential briefings. Feel free to explore the active modules on the left, or review the intelligence files.

If you require further clearance or wish to discuss deployment, please initiate contact.`;

export default function OSNotepad() {
  const [notes, setNotes] = useState(WELCOME_TEXT);

  return (
    <div className="flex flex-col gap-3 h-full">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        spellCheck={false}
        className="flex-1 w-full min-h-[300px] resize-none rounded-xl bg-ink-950/80 border border-white/10 p-4 text-sm leading-relaxed text-white/85 font-mono outline-none focus:border-copper-500/40 transition-colors"
      />
      <div className="flex items-center justify-between text-xs text-white/30">
        <span>Session notes are cleared on logout.</span>
        <a
          href="mailto:hi@jb3ai.com"
          className="inline-flex items-center gap-1.5 text-copper-400 hover:text-copper-300 transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          Initiate contact
        </a>
      </div>
    </div>
  );
}
