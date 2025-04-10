// /components/Question.js
import React, { useState } from "react";
import { Text, Button } from "react-native";
import { ButtonGroup } from "react-native-elements";

function QuestionScreen({ route, navigation }) {
  const { questions, index, answers } = route.params;
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
  };

  const currentQuestion = questions[index];

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      navigation.navigate("Question", {
        questions,
        index: index + 1,
        answers: [...answers, selectedAnswer],
      });
    } else {
      navigation.navigate("Summary", {
        questions,
        answers: [...answers, selectedAnswer],
      });
    }
  };

  return (
    <>
      <Text>{currentQuestion.prompt}</Text>
      <ButtonGroup
        buttons={currentQuestion.choices}
        selectedIndex={selectedAnswer}
        onPress={handleAnswerSelect}
        testID="choices"
      />
      <Button
        title="Next Question"
        onPress={nextQuestion}
        testID="next-question"
      />
    </>
  );
}

export default QuestionScreen;
