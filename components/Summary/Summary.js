import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Summary = ({ route }) => {
  const { questions } = route.params || {};
  if (!questions) return <Text>Error: No questions answered.</Text>;

  let score = 0;

  questions.forEach((q) => {
    if (q.type === "multiple-answer") {
      if (
        Array.isArray(q.selected) &&
        JSON.stringify(q.selected.sort()) === JSON.stringify(q.correct.sort())
      ) {
        score++;
      }
    } else if (q.selected === q.correct) {
      score++;
    }
  });

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.scoreText} testID="total">
        Correct answers: {score} out of {questions.length}
      </Text>

      <View style={styles.reviewContainer}>
        {questions.map((q, index) => {
          const isCorrect =
            q.type === "multiple-answer"
              ? Array.isArray(q.selected) &&
                JSON.stringify(q.selected.sort()) ===
                  JSON.stringify(q.correct.sort())
              : q.selected === q.correct;

          return (
            <View key={index} style={styles.questionReview}>
              <Text style={styles.questionText}>{q.question}</Text>
              {q.answers.map((answer, answerIndex) => {
                const isSelected = Array.isArray(q.selected)
                  ? q.selected.includes(answerIndex)
                  : q.selected === answerIndex;

                let style = styles.answerText;
                if (isSelected) {
                  style = isCorrect
                    ? [style, styles.correctAnswer]
                    : [style, styles.incorrectAnswer];
                }

                return (
                  <Text key={answerIndex} style={style}>
                    {answer}
                  </Text>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  reviewContainer: {
    marginTop: 20,
  },
  questionReview: {
    marginBottom: 15,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
    marginTop: 5,
  },
  correctAnswer: {
    fontWeight: "bold",
    color: "green",
  },
  incorrectAnswer: {
    textDecorationLine: "line-through",
    color: "red",
  },
});

export default Summary;
