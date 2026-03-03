import { useState } from 'react';
import { motion } from 'framer-motion';

interface NumberPadProps {
  onSubmit?: (answer: number) => void;
  disabled?: boolean;
  teamColor: 'blue' | 'orange';
}

export default function NumberPad({ onSubmit, disabled, teamColor }: NumberPadProps) {
  const [input, setInput] = useState('');

  const handleNumberClick = (num: number) => {
    if (disabled) return;
    setInput(prev => prev + num.toString());
  };

  const handleClear = () => {
    if (disabled) return;
    setInput('');
  };

  const handleSubmit = () => {
    if (disabled || !input) return;
    onSubmit?.(parseInt(input));
    setInput('');
  };

  const handleBackspace = () => {
    if (disabled) return;
    setInput(prev => prev.slice(0, -1));
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const submitBg = teamColor === 'blue' ? 'bg-team-blue-solid' : 'bg-team-orange-solid';
  const submitHover = teamColor === 'blue' ? 'hover:brightness-110' : 'hover:brightness-110';

  return (
    <div className="w-full">
      {/* Display */}
      <motion.div
        className="mb-3 p-3 bg-card rounded-xl shadow-inner text-center border border-border"
        animate={{ scale: input ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-3xl md:text-4xl font-bold text-foreground min-h-[48px] flex items-center justify-center font-mono">
          {input || '0'}
        </div>
      </motion.div>

      {/* Number Grid */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {numbers.map(num => (
          <motion.button
            key={num}
            onClick={() => handleNumberClick(num)}
            disabled={disabled}
            className="aspect-square bg-card hover:bg-muted active:bg-accent rounded-xl shadow-md text-2xl md:text-3xl font-bold text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-border"
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
          >
            {num}
          </motion.button>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-2">
        <motion.button
          onClick={handleBackspace}
          disabled={disabled || !input}
          className="px-3 py-3 bg-muted hover:bg-muted/80 rounded-xl shadow-md text-lg font-semibold text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: disabled || !input ? 1 : 1.05 }}
          whileTap={{ scale: disabled || !input ? 1 : 0.95 }}
        >
          ⌫
        </motion.button>
        <motion.button
          onClick={() => handleNumberClick(0)}
          disabled={disabled}
          className="px-3 py-3 bg-card hover:bg-muted rounded-xl shadow-md text-2xl md:text-3xl font-bold text-foreground disabled:opacity-50 disabled:cursor-not-allowed border border-border"
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
          0
        </motion.button>
        <motion.button
          onClick={handleClear}
          disabled={disabled || !input}
          className="px-3 py-3 bg-destructive/10 hover:bg-destructive/20 rounded-xl shadow-md text-lg font-semibold text-destructive disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: disabled || !input ? 1 : 1.05 }}
          whileTap={{ scale: disabled || !input ? 1 : 0.95 }}
        >
          Clear
        </motion.button>
      </div>

      {/* Submit Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={disabled || !input}
        className={`w-full mt-3 py-3 ${submitBg} ${submitHover} text-primary-foreground rounded-xl shadow-lg text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
        whileHover={{ scale: disabled || !input ? 1 : 1.03 }}
        whileTap={{ scale: disabled || !input ? 1 : 0.97 }}
      >
        Submit ✓
      </motion.button>
    </div>
  );
}
