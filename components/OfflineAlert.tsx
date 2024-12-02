import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OfflineAlert = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You are offline. Information may be outdated.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    backgroundColor: "red",
    padding: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});

export default OfflineAlert;
