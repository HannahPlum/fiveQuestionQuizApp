import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
} from "react-native";
import { ButtonGroup } from "react-native-elements";

const Question = ({ route, navigation }) => {
  const { questions, currentIndex } = route.params;
  const currentQuestion = questions[currentIndex];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    setSelectedIndex(null);
    setSelectedAnswers([]);
  }, [currentIndex]);

  const handleNext = () => {
    if (
      currentQuestion.type === "multiple-answer" &&
      selectedAnswers.length === 0
    ) {
      alert("Please select at least one answer!");
      return;
    }

    if (selectedIndex !== null || selectedAnswers.length > 0) {
      const updatedQuestions = [...questions];
      updatedQuestions[currentIndex] = {
        ...currentQuestion,
        selected:
          currentQuestion.type === "multiple-answer"
            ? selectedAnswers
            : selectedIndex,
      };

      if (currentIndex < questions.length - 1) {
        navigation.navigate("Question", {
          questions: updatedQuestions,
          currentIndex: currentIndex + 1,
        });
      } else {
        navigation.navigate("Summary", { questions: updatedQuestions });
      }
    } else {
      alert("Please select an answer!");
    }
  };

  const handleMultipleAnswerSelection = (index) => {
    setSelectedAnswers((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      {/* True/False and Multiple Choice Questions */}
      {(currentQuestion.type === "true/false" ||
        currentQuestion.type === "multiple-choice") && (
        <ButtonGroup
          buttons={currentQuestion.answers}
          selectedIndex={selectedIndex}
          onPress={(index) => setSelectedIndex(index)}
          vertical
          testID="choices"
          containerStyle={styles.buttonGroupContainer}
          buttonStyle={styles.buttonGroupButton}
          selectedButtonStyle={styles.selectedButton}
          textStyle={styles.buttonText}
          innerBorderStyle={{ width: 0 }}
        />
      )}

      {/* Multiple selection Questions */}
      {currentQuestion.type === "multiple-answer" && (
        <View testID="choices">
          {currentQuestion.answers.map((answer, index) => (
            <View key={index} style={styles.checkboxContainer}>
              <CheckBox
                value={selectedAnswers.includes(index)}
                onValueChange={() => handleMultipleAnswerSelection(index)}
              />
              <Text style={styles.checkboxText}>{answer}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
        testID="next-question"
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9", // Tan-ish background
    flex: 1,
    justifyContent: "center",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#808080",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonGroupContainer: {
    borderWidth: 0,
    backgroundColor: "transparent",
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonGroupButton: {
    paddingVertical: 15,
    marginVertical: 6,
    backgroundColor: "#E0E0E0", // Light grey
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "#9CBA7F", // Green when selected
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#9CBA7F",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Question;
