import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Question from "./components/Question/Question";
import Summary from "./components/Summary/Summary";

const Stack = createStackNavigator();

export default function App() {
  const questionList = [
    {
      id: 1,
      question: "Knightro is UCF's Mascot?",
      type: "true/false",
      answers: ["True", "False"],
      correct: 0, //correct answer = "True"
    },
    {
      id: 2,
      question: "Florida is a Snowy State?",
      type: "true/false",
      answers: ["True", "False"],
      correct: 1, //Correct answer = "False"
    },
    {
      id: 3,
      question: "Which of the following is a Studio Ghibli film?",
      type: "multiple-choice",
      answers: ["Spirited Away", "Howl in Fright", "Angry Birds", "Eragon"],
      correct: 0, //Correct answer = "Spirited Away"
    },
    {
      id: 4,
      question: "Which of these is a typical dinner item?",
      type: "multiple-choice",
      answers: ["Waffle", "Steak", "Yogurt", "Orange"],
      correct: 1, //Correct asnwer = "Steak"
    },
    {
      id: 5,
      question: "Please select all that are instruments.",
      type: "multiple-answer",
      answers: ["Violin", "Table", "Plant", "Guitar"],
      correct: [0, 3], // Correct answers = "Violin" and "Guitar"
    },
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{
            questions: questionList,
            currentIndex: 0,
          }}
          options={{
            title: "A Little Quiz",
            headerStyle: { backgroundColor: "#9CBA7F" },
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
              color: "#fff",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Summary"
          component={Summary}
          options={{
            headerStyle: { backgroundColor: "#9CBA7F" },
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
              color: "#fff",
            },
            headerTitleAlign: "center",
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
