import React, { useState, Component } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal } from "react-native";
import Answer from "./Answer";
import QuesAns from "../QandA/QuestionsAnswers.json";
import AsyncStorage from "@react-native-community/async-storage";

const QuizContainer = (props) => {
  const [questionJson, setQuestionJson] = useState({
    question: "question",
    answerList: ["Answer0", "Answer1", "Answer2", "Answer3"],
    answer: "Answer0",
  });
  const [answered, setAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [finalAnswerList, setFinalAnswerList] = useState(["0", "1", "2", "3"]);
  const [dateOffset, setDateOffset] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const answeredHandler = () => {
    setAnswered(true);
    const dateString = getDateString();
    if (dateOffset === 0) {
      saveIsAnswered("answer" + dateString, answered);
    }
  };

  const setDateOffsetHandler = (increment) => {
    let temp = dateOffset;
    if (increment) {
      if (temp + 1 <= 0) {
        setDateOffset(temp + 1);
      }
    } else {
      if (totalQuestions + temp - 1 > 0) setDateOffset(temp - 1);
    }
  };

  const setTotalQuestionsHandler = (date) => {
    setTotalQuestions(date);
  };

  const setCorrectAnswerHandler = () => {
    setCorrectAnswer(finalAnswerList.indexOf(questionJson.answer));
    setTotalQuestionsHandler(3);
  };

  const saveIsAnswered = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      getAllData();
    } catch (e) {
      console.log(e);
    }
  };

  const clearAllData = () => {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() => alert("success"));
  };

  const getAllData = () => {
    AsyncStorage.getAllKeys().then((keys) => {
      return AsyncStorage.multiGet(keys)
        .then((result) => {})
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const getData = async () => {
    if (
      dateOffset !== 0 ||
      (!correctAnswer && correctAnswer !== 0) ||
      correctAnswer < 0
    ) {
      return;
    }
    try {
      const dateString = "answer" + getDateString();
      const value = await AsyncStorage.getItem(dateString);
      const newValue = JSON.parse(value);
      if (newValue !== null) {
        setAnswered(newValue);
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  const getDateString = () => {
    var today = new Date();
    today.setDate(today.getDate() + dateOffset);
    return (
      parseInt(today.getMonth() + 1) +
      "" +
      today.getDate() +
      "" +
      today.getFullYear()
    );
  };

  const setQuestionJsonHandler = () => {
    var questionDateTemp = getDateString();
    var quesJson = QuesAns[questionDateTemp];
    setQuestionJson(quesJson);
  };

  const isAnswerRight = (id) => {
    return correctAnswer === id;
  };

  React.useEffect(() => {
    setQuestionJsonHandler(), [];
  });

  React.useEffect(() => {
    scrambleAnswerList();
  }, [questionJson]);

  React.useEffect(() => {
    setCorrectAnswerHandler(), [finalAnswerList];
  });

  React.useEffect(() => {
    getData();
  }, [correctAnswer]);

  const scrambleAnswerList = () => {
    let tempAns = questionJson.answerList;
    for (let i = tempAns.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = tempAns[i];
      tempAns[i] = tempAns[j];
      tempAns[j] = temp;
    }
    setFinalAnswerListHandler(tempAns);
  };

  const setFinalAnswerListHandler = (answerList) => {
    setFinalAnswerList(answerList);
  };

  const getPrevNextButtons = () => {
    if (answered) {
      return (
        <View>
          {getPrevButton()}
          {getNextButton()}
        </View>
      );
    }
  };

  const getPrevButton = () => {
    if (!(totalQuestions - 1 + dateOffset === 0)) {
      return (
        <View>
          <Button
            title="Prev"
            onPress={() => setDateOffsetHandler(false)}
          ></Button>
        </View>
      );
    }
  };

  const getNextButton = () => {
    if (dateOffset !== 0) {
      return (
        <View>
          <Button
            title="Next"
            onPress={() => setDateOffsetHandler(true)}
          ></Button>
        </View>
      );
    }
  };

  return (
    <View style={styles.quizContainer}>
      <View style={styles.question}>
        <Text style={styles.text}>{questionJson.question}</Text>
      </View>
      <View style={styles.answerButtons}>
        {finalAnswerList.map((answer, index) => {
          return (
            <Answer
              id={index}
              key={index}
              answer={answer}
              isAnswered={answered}
              isRight={isAnswerRight(index)}
              answeredHandler={answeredHandler}
            />
          );
        })}
      </View>
      {getPrevNextButtons()}
      <View>
        <Button title="Clear" onPress={() => clearAllData()}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
  },
  question: {
    paddingTop: "20%",
    paddingBottom: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  answerButtons: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
  },
});

export default QuizContainer;
