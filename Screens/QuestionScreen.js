import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import QuizContainer from "../components/QuizContainer";

const QuestionScreen = (props) => {
  return (
    <View style={styles.container}>
      <Header />
      <QuizContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default QuestionScreen;
