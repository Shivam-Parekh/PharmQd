import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";

const StartPage = (props) => {
  return (
    <View style={styles.logo}>
      <Text>PHARMqd</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartPage;
