import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NumberPad from './NumberPad';
import type { Question } from '@/hooks/useGameLogic';

interface TeamPanelProps {
  teamName: string;
  teamColor: 'blue' | 'orange';
  currentQuestion: Question | null;
  onAnswerSubmit: (answer: number) => boolean;
  score: number;
  disabled: boolean;
  isActive: boolean;
}

export default function TeamPanel({
  teamName,
  teamColor,
  currentQuestion,
  onAnswerSubmit,
  score,
  disabled,
  isActive,
}: TeamPanelProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsGlowing(true);
      const timer = setTimeout(() => setIsGlowing(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const handleSubmit = (answer: number) => {
    if (!currentQuestion) return;
    const isCorrect = onAnswerSubmit(answer);
    if (isCorrect) {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 600);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const isBlue = teamColor === 'blue';
  const bg = isBlue ? 'bg-team-blue-light' : 'bg-team-orange-light';
  const borderColor = isBlue ? 'border-team-blue-border' : 'border-team-orange-border';
  const textColor = isBlue ? 'text-team-blue' : 'text-team-orange';
  const solidBg = isBlue ? 'bg-team-blue-solid' : 'bg-team-orange-solid';
  const darkBg = isBlue ? 'bg-team-blue-dark' : 'bg-team-orange-dark';
  const ringColor = isBlue ? 'ring-team-blue/50' : 'ring-team-orange/50';

  return (
    <motion.div
      className={`w-full h-full p-4 md:p-6 ${bg} rounded-2xl shadow-xl border-2 ${borderColor} transition-all duration-300 ${
        isGlowing ? `ring-4 ${ringColor}` : ''
      }`}
      animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {/* Team Header */}
      <div className="mb-4 text-center">
        <h2 className={`text-2xl md:text-3xl font-bold ${textColor} mb-2`}>
          {teamName}
        </h2>
        <div className={`inline-block px-4 py-1.5 ${solidBg} text-primary-foreground rounded-full text-lg font-bold shadow-md`}>
          Score: {score}
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={currentQuestion.question}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`mb-4 p-4 ${darkBg} rounded-xl shadow-lg`}
          >
            <div className="text-center mb-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Solve This:
              </span>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-center text-foreground py-2">
              {currentQuestion.question} = ?
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Number Pad */}
      <NumberPad
        onSubmit={handleSubmit}
        disabled={disabled || !currentQuestion}
        teamColor={teamColor}
      />
    </motion.div>
  );
}
