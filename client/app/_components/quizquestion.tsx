import { useState } from 'react';

const QuizQuestion = ({ question }: { question: { question: string; options: string[]; correct: string } }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`You selected: ${selectedOption}. Correct answer: ${question.correct}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{question.question}</h2>
      {question.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
          />
          {option}
        </div>
      ))}
      <button type="submit">Submit Answer</button>
    </form>
  );
};

export default QuizQuestion;