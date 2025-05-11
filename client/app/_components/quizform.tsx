import { useState } from 'react';

const QuizForm = () => {
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correct: '' }]);

  const handleQuestionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index: number, optionIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[index].correct = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correct: '' }]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const existingQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    existingQuizzes.push(questions);
    localStorage.setItem('quizzes', JSON.stringify(existingQuizzes));
    console.log('Quizzes saved:', existingQuizzes);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((q, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, e)}
            required
          />
          {q.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              placeholder={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, optionIndex, e)}
              required
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={q.correct}
            onChange={(e) => handleCorrectChange(index, e)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="submit">Submit Quiz</button>
    </form>
  );
};

export default QuizForm;