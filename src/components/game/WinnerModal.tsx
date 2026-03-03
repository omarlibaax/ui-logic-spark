import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WinnerModalProps {
  winner: 'team1' | 'team2';
  onRestart: () => void;
  team1Score: number;
  team2Score: number;
}

export default function WinnerModal({ winner, onRestart, team1Score, team2Score }: WinnerModalProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const winnerName = winner === 'team1' ? 'Team 1' : 'Team 2';
  const isBlue = winner === 'team1';
  const winnerScore = isBlue ? team1Score : team2Score;
  const textColor = isBlue ? 'text-team-blue' : 'text-team-orange';
  const borderColor = isBlue ? 'border-team-blue-solid' : 'border-team-orange-solid';
  const btnBg = isBlue ? 'bg-team-blue-solid' : 'bg-team-orange-solid';

  const confettiColors = [
    'bg-team-blue-solid', 'bg-team-orange-solid', 'bg-accent', 'bg-destructive', 'bg-primary',
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`relative bg-card rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center border-4 ${borderColor}`}
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Confetti */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2.5 h-2.5 ${confettiColors[i % confettiColors.length]} rounded-sm`}
                  initial={{ y: -20, x: `${Math.random() * 100}%`, rotate: 0, opacity: 1 }}
                  animate={{ y: 500, rotate: 360, opacity: [1, 1, 0] }}
                  transition={{ duration: 2.5, delay: i * 0.05, ease: 'easeOut' }}
                />
              ))}
            </div>
          )}

          {/* Trophy */}
          <motion.div
            className="mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="text-7xl">🏆</div>
          </motion.div>

          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-3 ${textColor}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {winnerName} Wins!
          </motion.h2>

          <motion.p
            className="text-xl text-foreground mb-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Final Score: {winnerScore}
          </motion.p>

          <motion.p
            className="text-sm text-muted-foreground mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Team 1: {team1Score} | Team 2: {team2Score}
          </motion.p>

          <motion.button
            onClick={onRestart}
            className={`w-full py-3 ${btnBg} text-primary-foreground rounded-xl shadow-lg text-xl font-bold transition-all`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Play Again
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
