import Link from 'next/link';

interface Quiz {
  title: string;
  questions: { question: string; options: string[]; correct: string }[];
}

const QuizList = () => {
  const quizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');

  return (
    <ul>
      {quizzes.map((quiz: Quiz, index: number) => (
        <li key={index}>
          <Link href={`/take?id=${index}`}>Quiz {index + 1}</Link>
        </li>
      ))}
    </ul>
  );
};

export default QuizList;