import "react-native-gesture-handler";
import React from "react";
import QuestionScreen from "./Screens/QuestionScreen";
import StartPage from "./Screens/StartPage";
import Swiper from "react-native-swiper/src";
import { View, StyleSheet } from "react-native";

export default function App() {
  return (
    <Swiper loop={false} showsPagination={false}>
      <View style={styles.pageOne}>
        <StartPage />
      </View>
      <View style={styles.pageTwo}>
        <QuestionScreen />
      </View>
    </Swiper>
  );
}

var styles = StyleSheet.create({
  pageOne: {
    flex: 1,
  },
  pageTwo: {
    flex: 1,
  },
});
