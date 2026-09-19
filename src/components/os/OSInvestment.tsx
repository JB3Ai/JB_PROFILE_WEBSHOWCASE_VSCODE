import { Activity } from 'lucide-react';

const sectorSignals = [
  'Market Shift: Enterprise AI adoption accelerates across EMEA',
  'Forensic SaaS valuation multipliers hold strong at 8.2x ARR',
  'Seed Signal: African AI infrastructure rounds up 34% quarter on quarter',
  'Sector Watch: Multilingual voice AI funding reaches new highs',
];

export default function OSInvestment() {
  return (
    <div className="space-y-5 mb-6">
      <div>
        <h3 className="text-lg font-semibold text-white tracking-tight">
          JB³Ai Ventures: Intelligence in Motion
        </h3>
        <p className="text-sm text-white/60 leading-relaxed mt-1">
          Product architecture, market opportunity, and strategic roadmap for the OS³ ecosystem.
        </p>
      </div>

      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-white/40 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-copper-400" />
            Sector Intelligence
          </p>
          <span className="text-[10px] font-mono text-white/25 uppercase tracking-wider">
            Simulated feed
          </span>
        </div>
        <div className="space-y-2">
          {sectorSignals.map(signal => (
            <p
              key={signal}
              className="font-mono text-xs text-white/60 leading-relaxed border-l-2 border-copper-500/30 pl-3"
            >
              {signal}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
