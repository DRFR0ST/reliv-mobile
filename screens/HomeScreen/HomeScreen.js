import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { MoodView } from "../../views";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <MoodView />
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "rgba(21, 21, 21, .6)",
              marginTop: 5,
            }}>
            Hi, User, how are you today?
          </Text>
          <ScrollView>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingTop: 30,
  },
});
