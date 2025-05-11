const Results = ({ score, total }: { score: number; total: number }) => {
  return (
    <div>
      <h1>Your Results</h1>
      <p>
        You scored {score} out of {total}.
      </p>
      {/* Display correct answers here */}
    </div>
  );
};

export default Results;