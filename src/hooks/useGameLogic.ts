import { useState, useCallback, useEffect, useRef } from 'react';

export interface Question {
  question: string;
  answer: number;
}

type Operator = '+' | '-' | '×';

function generateQuestion(difficulty: number): Question {
  const operators: Operator[] = ['+', '-', '×'];
  const op = operators[Math.floor(Math.random() * operators.length)];

  let a: number, b: number, answer: number;

  const maxNum = Math.min(10 + difficulty * 3, 50);

  switch (op) {
    case '+':
      a = Math.floor(Math.random() * maxNum) + 1;
      b = Math.floor(Math.random() * maxNum) + 1;
      answer = a + b;
      break;
    case '-':
      a = Math.floor(Math.random() * maxNum) + 1;
      b = Math.floor(Math.random() * a) + 1;
      answer = a - b;
      break;
    case '×':
      a = Math.floor(Math.random() * Math.min(maxNum, 12)) + 1;
      b = Math.floor(Math.random() * 12) + 1;
      answer = a * b;
      break;
    default:
      a = 1; b = 1; answer = 2;
  }

  return { question: `${a} ${op} ${b}`, answer };
}

export interface GameState {
  team1Score: number;
  team2Score: number;
  team1Question: Question | null;
  team2Question: Question | null;
  ropePosition: number;
  timer: number;
  isGameActive: boolean;
  winner: 'team1' | 'team2' | null;
  answeredQuestionsTeam1: string[];
  answeredQuestionsTeam2: string[];
  difficulty: number;
}

export function useGameLogic(gameDuration = 120) {
  const [state, setState] = useState<GameState>({
    team1Score: 0,
    team2Score: 0,
    team1Question: null,
    team2Question: null,
    ropePosition: 0,
    timer: gameDuration,
    isGameActive: false,
    winner: null,
    answeredQuestionsTeam1: [],
    answeredQuestionsTeam2: [],
    difficulty: 1,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const generateNewQuestion = useCallback((team: 'team1' | 'team2') => {
    const q = generateQuestion(state.difficulty);
    setState(prev => ({
      ...prev,
      [team === 'team1' ? 'team1Question' : 'team2Question']: q,
    }));
  }, [state.difficulty]);

  const startGame = useCallback(() => {
    const q1 = generateQuestion(1);
    const q2 = generateQuestion(1);
    setState({
      team1Score: 0,
      team2Score: 0,
      team1Question: q1,
      team2Question: q2,
      ropePosition: 0,
      timer: gameDuration,
      isGameActive: true,
      winner: null,
      answeredQuestionsTeam1: [],
      answeredQuestionsTeam2: [],
      difficulty: 1,
    });
  }, [gameDuration]);

  const submitAnswer = useCallback((team: 'team1' | 'team2', answer: number): boolean => {
    const question = team === 'team1' ? state.team1Question : state.team2Question;
    if (!question || !state.isGameActive) return false;

    const isCorrect = answer === question.answer;

    if (isCorrect) {
      setState(prev => {
        const newScore = team === 'team1' ? prev.team1Score + 1 : prev.team2Score + 1;
        const newRope = team === 'team1' ? prev.ropePosition - 1 : prev.ropePosition + 1;
        const newDifficulty = Math.floor((prev.team1Score + prev.team2Score + 1) / 5) + 1;
        const answeredKey = team === 'team1' ? 'answeredQuestionsTeam1' : 'answeredQuestionsTeam2';
        const questionKey = team === 'team1' ? 'team1Question' : 'team2Question';

        let winner: 'team1' | 'team2' | null = null;
        if (newRope <= -5) winner = 'team1';
        if (newRope >= 5) winner = 'team2';

        return {
          ...prev,
          [team === 'team1' ? 'team1Score' : 'team2Score']: newScore,
          ropePosition: Math.max(-5, Math.min(5, newRope)),
          difficulty: newDifficulty,
          [answeredKey]: [...prev[answeredKey], `${question.question} = ${question.answer}`],
          [questionKey]: generateQuestion(newDifficulty),
          winner,
          isGameActive: winner ? false : prev.isGameActive,
        };
      });
    }

    return isCorrect;
  }, [state.team1Question, state.team2Question, state.isGameActive]);

  // Timer
  useEffect(() => {
    if (state.isGameActive && state.timer > 0) {
      timerRef.current = setInterval(() => {
        setState(prev => {
          if (prev.timer <= 1) {
            // Time's up - determine winner
            let winner: 'team1' | 'team2' | null = null;
            if (prev.team1Score > prev.team2Score) winner = 'team1';
            else if (prev.team2Score > prev.team1Score) winner = 'team2';
            else winner = prev.ropePosition <= 0 ? 'team1' : 'team2'; // tiebreaker

            return { ...prev, timer: 0, isGameActive: false, winner };
          }
          return { ...prev, timer: prev.timer - 1 };
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.isGameActive, state.timer]);

  return { ...state, startGame, submitAnswer, generateNewQuestion };
}
