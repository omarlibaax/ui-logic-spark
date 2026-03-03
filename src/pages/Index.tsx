import Header from '@/components/game/Header';
import StartScreen from '@/components/game/StartScreen';
import TeamPanel from '@/components/game/TeamPanel';
import Arena from '@/components/game/Arena';
import WinnerModal from '@/components/game/WinnerModal';
import { useGameLogic } from '@/hooks/useGameLogic';

const Index = () => {
  const game = useGameLogic(120);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {!game.isGameActive && !game.winner && (
        <StartScreen onStart={game.startGame} />
      )}

      {game.isGameActive && (
        <div className="flex-1 flex flex-col">
          {/* Arena */}
          <Arena
            ropePosition={game.ropePosition}
            team1Score={game.team1Score}
            team2Score={game.team2Score}
            answeredQuestionsTeam1={game.answeredQuestionsTeam1}
            answeredQuestionsTeam2={game.answeredQuestionsTeam2}
            timer={game.timer}
            isGameActive={game.isGameActive}
          />

          {/* Team Panels */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-6xl mx-auto w-full">
            <TeamPanel
              teamName="Team 1"
              teamColor="blue"
              currentQuestion={game.team1Question}
              onAnswerSubmit={(answer) => game.submitAnswer('team1', answer)}
              score={game.team1Score}
              disabled={!game.isGameActive}
              isActive={game.isGameActive}
            />
            <TeamPanel
              teamName="Team 2"
              teamColor="orange"
              currentQuestion={game.team2Question}
              onAnswerSubmit={(answer) => game.submitAnswer('team2', answer)}
              score={game.team2Score}
              disabled={!game.isGameActive}
              isActive={game.isGameActive}
            />
          </div>
        </div>
      )}

      {game.winner && (
        <WinnerModal
          winner={game.winner}
          onRestart={game.startGame}
          team1Score={game.team1Score}
          team2Score={game.team2Score}
        />
      )}
    </div>
  );
};

export default Index;
