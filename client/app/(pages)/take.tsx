import { useRouter } from 'next/router';
import QuizQuestion from '../_components/quizquestion';

interface Question {
  question: string;
  options: string[];
  correct: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

const mockQuizData: Record<string, Quiz> = {
  1: {
    title: 'General Knowledge Quiz',
    questions: [
      {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correct: 'Paris',
      },
      {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correct: '4',
      },
    ],
  },
  // Add more quizzes as needed
};

const TakeQuiz = () => {
  const router = useRouter();
  const { id } = router.query;
  const quiz = mockQuizData[id as string];

  if (!quiz) {
    return <div>Quiz not found!</div>;
  }

  return (
    <div>
      <h1>{quiz.title}</h1>
      {quiz.questions.map((q: Question, index: number) => (
        <QuizQuestion key={index} question={q} />
      ))}
    </div>
  );
};

export default TakeQuiz;