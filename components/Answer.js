import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

const Answer = (props) => {
  const [color, setColor] = useState("blue");
  const [answered, setAnswered] = useState(0);

  const colorHandler = (isRight) => {
    if (isRight) {
      setColor("green");
    } else {
      setColor("red");
    }
    props.answeredHandler();
  };

  const answeredHandler = () => {
    setAnswered(1);
  };

  if (props.isAnswered && answered === 0) {
    colorHandler(props.isRight);
    answeredHandler();
  }

  React.useEffect(() => {
    setAnswered(0);
  }, [props.answer]);

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={{ ...styles.answer, ...{ backgroundColor: color } }}
        onPress={() => colorHandler(props.isRight)}
      >
        <View style={styles.textContainer}>
          <Text style={styles.Text}>{props.answer}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: 7,
  },
  answer: {
    marginTop: 10,
    paddingVertical: 10,
    minWidth: "60%",
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#00BCD4",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  text: {
    textAlign: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Answer;
