import { useState } from 'react';
import { Delete } from 'lucide-react';

type Op = '+' | '-' | '×' | '÷';

function format(n: number): string {
  if (Number.isNaN(n) || !Number.isFinite(n)) return 'Error';
  const rounded = Math.round(n * 1e10) / 1e10;
  return String(rounded);
}

function compute(a: number, b: number, o: Op): number {
  switch (o) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
  }
}

export default function OSCalculator() {
  const [display, setDisplay] = useState('0');
  const [stored, setStored] = useState<number | null>(null);
  const [op, setOp] = useState<Op | null>(null);
  const [waiting, setWaiting] = useState(false);

  const inputDigit = (d: string) => {
    if (waiting) {
      setDisplay(d === '.' ? '0.' : d);
      setWaiting(false);
      return;
    }
    if (d === '.' && display.includes('.')) return;
    if (display === '0' && d !== '.') {
      setDisplay(d);
      return;
    }
    if (display.replace('-', '').length >= 12) return;
    setDisplay(display + d);
  };

  const applyOp = (next: Op) => {
    const value = parseFloat(display);
    if (stored !== null && op && !waiting) {
      const result = compute(stored, value, op);
      setStored(result);
      setDisplay(format(result));
    } else {
      setStored(value);
    }
    setOp(next);
    setWaiting(true);
  };

  const equals = () => {
    if (stored === null || !op) return;
    const result = compute(stored, parseFloat(display), op);
    setDisplay(format(result));
    setStored(null);
    setOp(null);
    setWaiting(true);
  };

  const clearAll = () => {
    setDisplay('0');
    setStored(null);
    setOp(null);
    setWaiting(false);
  };

  const backspace = () => {
    if (waiting) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const percent = () => {
    const value = parseFloat(display);
    if (Number.isNaN(value)) return;
    setDisplay(format(value / 100));
  };

  const keyBase = 'h-12 rounded-xl text-base font-medium transition-colors flex items-center justify-center select-none';
  const digitKey = `${keyBase} bg-white/5 hover:bg-white/10 text-white/85 border border-white/10`;
  const opKey = `${keyBase} bg-copper-600/15 text-copper-400 border border-copper-500/30 hover:bg-copper-600/25`;

  return (
    <div className="flex flex-col gap-3">
      {/* Display */}
      <div className="rounded-xl bg-ink-950/80 border border-white/10 px-4 py-3 text-right">
        <div className="h-4 text-[11px] font-mono text-white/30">
          {stored !== null && op ? `${format(stored)} ${op}` : '\u00A0'}
        </div>
        <div className="text-2xl font-mono text-white/90 truncate">{display}</div>
      </div>

      {/* Keys */}
      <div className="grid grid-cols-4 gap-2">
        <button className={opKey} onClick={clearAll}>C</button>
        <button className={opKey} onClick={backspace} aria-label="Backspace">
          <Delete className="w-4 h-4" />
        </button>
        <button className={opKey} onClick={percent}>%</button>
        <button className={opKey} onClick={() => applyOp('÷')}>÷</button>

        <button className={digitKey} onClick={() => inputDigit('7')}>7</button>
        <button className={digitKey} onClick={() => inputDigit('8')}>8</button>
        <button className={digitKey} onClick={() => inputDigit('9')}>9</button>
        <button className={opKey} onClick={() => applyOp('×')}>×</button>

        <button className={digitKey} onClick={() => inputDigit('4')}>4</button>
        <button className={digitKey} onClick={() => inputDigit('5')}>5</button>
        <button className={digitKey} onClick={() => inputDigit('6')}>6</button>
        <button className={opKey} onClick={() => applyOp('-')}>-</button>

        <button className={digitKey} onClick={() => inputDigit('1')}>1</button>
        <button className={digitKey} onClick={() => inputDigit('2')}>2</button>
        <button className={digitKey} onClick={() => inputDigit('3')}>3</button>
        <button className={opKey} onClick={() => applyOp('+')}>+</button>

        <button className={`${digitKey} col-span-2`} onClick={() => inputDigit('0')}>0</button>
        <button className={digitKey} onClick={() => inputDigit('.')}>.</button>
        <button className={opKey} onClick={equals}>=</button>
      </div>
    </div>
  );
}
