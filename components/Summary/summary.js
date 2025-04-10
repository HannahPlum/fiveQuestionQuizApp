// /components/Summary.js
import React from "react";
import { Text } from "react-native";

function SummaryScreen({ route }) {
  const { questions, answers } = route.params;

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      const correctAnswers = Array.isArray(question.correct)
        ? question.correct
        : [question.correct];
      if (correctAnswers.includes(answers[index])) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  return (
    <>
      <Text testID="total">
        Total Score: {calculateScore()} / {questions.length}
      </Text>
      {questions.map((question, index) => (
        <React.Fragment key={index}>
          <Text>{question.prompt}</Text>
          {question.choices.map((choice, idx) => {
            const isCorrect = question.correct.includes(idx);
            const isSelected = answers[index] === idx;
            return (
              <Text
                key={idx}
                style={{
                  textDecorationLine:
                    isSelected && !isCorrect ? "line-through" : "none",
                  fontWeight: isSelected && isCorrect ? "bold" : "normal",
                }}
              >
                {choice}
              </Text>
            );
          })}
        </React.Fragment>
      ))}
    </>
  );
}

export default SummaryScreen;
