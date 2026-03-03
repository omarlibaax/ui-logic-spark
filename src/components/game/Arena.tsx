import { motion } from 'framer-motion';

interface ArenaProps {
  ropePosition: number;
  team1Score: number;
  team2Score: number;
  answeredQuestionsTeam1: string[];
  answeredQuestionsTeam2: string[];
  timer: number;
  isGameActive: boolean;
}

export default function Arena({
  ropePosition,
  team1Score,
  team2Score,
  answeredQuestionsTeam1,
  answeredQuestionsTeam2,
  timer,
  isGameActive,
}: ArenaProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const team1Progress = ropePosition < 0 ? (Math.abs(ropePosition) / 5) * 50 : 0;
  const team2Progress = ropePosition > 0 ? (ropePosition / 5) * 50 : 0;

  const isDanger = timer <= 30 && isGameActive;

  return (
    <div className="w-full flex flex-col items-center p-4">
      {/* Timer */}
      <div className="mb-4">
        <motion.div
          className={`px-6 py-2 rounded-xl shadow-lg font-mono text-2xl font-bold ${
            isGameActive
              ? isDanger
                ? 'bg-timer-danger-bg text-timer-danger'
                : 'bg-timer-safe-bg text-timer-safe'
              : 'bg-muted text-muted-foreground'
          }`}
          animate={isDanger ? { scale: [1, 1.08, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          ⏱ {formatTime(timer)}
        </motion.div>
      </div>

      {/* Score Summary */}
      <div className="w-full max-w-xl mb-3">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <div className="text-lg font-bold text-team-blue">Team 1</div>
            <div className="text-sm text-muted-foreground">Answered: {team1Score}</div>
          </div>
          <div className="text-2xl font-bold text-muted-foreground">⚔️</div>
          <div className="text-center flex-1">
            <div className="text-lg font-bold text-team-orange">Team 2</div>
            <div className="text-sm text-muted-foreground">Answered: {team2Score}</div>
          </div>
        </div>
      </div>

      {/* Tug of War Progress Bar */}
      <div className="w-full max-w-xl">
        <div className="relative h-10 bg-progress-bar rounded-full overflow-hidden shadow-inner border-2 border-border">
          {/* Center Line */}
          <div className="absolute top-0 left-1/2 h-full w-0.5 bg-muted-foreground/40 z-10 -translate-x-1/2" />

          {/* Team 1 Progress */}
          {team1Progress > 0 && (
            <motion.div
              className="absolute top-0 h-full bg-team-blue/60 rounded-l-full"
              style={{ right: '50%' }}
              initial={{ width: 0 }}
              animate={{ width: `${team1Progress}%` }}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            />
          )}

          {/* Team 2 Progress */}
          {team2Progress > 0 && (
            <motion.div
              className="absolute top-0 left-1/2 h-full bg-team-orange/60 rounded-r-full"
              initial={{ width: 0 }}
              animate={{ width: `${team2Progress}%` }}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            />
          )}

          {/* Rope Knot */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-foreground rounded-full z-20 border-2 border-card shadow-lg"
            animate={{ left: `${50 + (ropePosition / 5) * 50}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            style={{ marginLeft: '-12px' }}
          />
        </div>

        <div className="flex justify-between mt-1 text-xs font-semibold text-muted-foreground">
          <span>← Team 1 wins</span>
          <span>Team 2 wins →</span>
        </div>
      </div>

      {/* Recent Answers */}
      <div className="w-full max-w-xl mt-3 grid grid-cols-2 gap-4">
        <div className="space-y-0.5 max-h-16 overflow-y-auto">
          {answeredQuestionsTeam1.slice(-3).map((q, i) => (
            <div key={i} className="text-xs text-muted-foreground text-center bg-team-blue-light/50 rounded px-1 py-0.5">
              ✓ {q}
            </div>
          ))}
        </div>
        <div className="space-y-0.5 max-h-16 overflow-y-auto">
          {answeredQuestionsTeam2.slice(-3).map((q, i) => (
            <div key={i} className="text-xs text-muted-foreground text-center bg-team-orange-light/50 rounded px-1 py-0.5">
              ✓ {q}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
