import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-8xl mb-6"
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          🪢
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Math Tug-of-War
        </h2>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Two teams compete by solving math questions. Each correct answer pulls the rope toward your side. First to pull the rope 5 steps — or the team ahead when time runs out — wins!
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-team-blue-light border border-team-blue-border rounded-xl p-4">
            <div className="text-2xl mb-1">🔵</div>
            <div className="font-bold text-team-blue">Team 1</div>
            <div className="text-xs text-muted-foreground">Left side</div>
          </div>
          <div className="bg-team-orange-light border border-team-orange-border rounded-xl p-4">
            <div className="text-2xl mb-1">🟠</div>
            <div className="font-bold text-team-orange">Team 2</div>
            <div className="text-xs text-muted-foreground">Right side</div>
          </div>
        </div>

        <motion.button
          onClick={onStart}
          className="w-full py-4 bg-accent text-accent-foreground rounded-2xl shadow-lg text-2xl font-bold transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🚀 Start Game
        </motion.button>
      </motion.div>
    </div>
  );
}
