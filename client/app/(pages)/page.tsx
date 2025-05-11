import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Quiz App!</h1>
      <nav>
        <Link href="/create">Create a Quiz</Link>
        <Link href="/quizzes">Take a Quiz</Link>
        <Link href="/login">Login</Link>
      </nav>
    </div>
  );
};

export default Home;