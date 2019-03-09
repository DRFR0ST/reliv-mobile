import React from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  FlatList,
  ScrollView,
} from "react-native";

import { FlexWrapper } from "../../components";
import Sentiment from "./Sentiment";

export default class MoodView extends React.Component {
  state = {
    activeMood: -1,
    list: [],
  };

  componentDidMount() {
    AsyncStorage.getItem("mood", (err, result) => {
      if (err) return console.error(err);

      this.setState({ activeMood: parseInt(result) || 2 });
    });

    // AsyncStorage.setItem("moodList", "{}"); reset

    this.fetchList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeMood !== this.state.activeMood) {
      AsyncStorage.setItem("mood", this.state.activeMood.toString());
    }
  }

  fetchList = () => {
    AsyncStorage.getItem("moodList", (err, result) => {
      if (err) return console.error(err);

      this.setState({ list: JSON.parse(result || []) });
    });
  };

  logMood = entry => {
    if (!entry) return;

    AsyncStorage.getItem("moodList", (err, result) => {
      if (err) return console.error(err);

      let moodList = JSON.parse(result) || [];

      entry.date = this.formatDate(new Date());

      moodList.push(entry);

      AsyncStorage.setItem("moodList", JSON.stringify(moodList), () =>
        this.fetchList(),
      );
    });
  };

  formatDate = date => {
    return `${this.addZero(date.getDay())}.${this.addZero(date.getMonth())}.${date.getFullYear()} / ${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`
  }

  addZero = time => {
    if(time <= 9) return `0${time}`;
    return time;
  }

  handleClick = id => {
    this.setState({ activeMood: id });
    if (this.sentiments[id]) this.logMood(this.sentiments[id]);
  };

  sentiments = [
    {
      mood: "very-satisfied",
      id: 0,
      onClick: this.handleClick.bind(this),
    },
    {
      mood: "satisfied",
      id: 1,
      onClick: this.handleClick.bind(this),
    },
    {
      mood: "neutral",
      id: 2,
      onClick: this.handleClick.bind(this),
    },
    {
      mood: "dissatisfied",
      id: 3,
      onClick: this.handleClick.bind(this),
    },
    {
      mood: "very-dissatisfied",
      id: 4,
      onClick: this.handleClick.bind(this),
    },
  ];

  _keyExtractor = (item, index) => `sentiment_list_item_${item.mood}_${index}`;
  
  renderList = () => {
    let list = this.state.list;

    if(!list || list.length <= 0 || !list instanceof Array) {
      AsyncStorage.setItem("moodList", JSON.stringify([]));
      return <View><Text>Nothing to show!</Text></View>;
    }

    return (
      <FlatList
        data={list.reverse()}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => {

          return (
            <Text>
              {item.id} = {item.mood} ~ [ {item.date} ] 
            </Text>
          );
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.moods}>
          <FlexWrapper justifyContent="space-around" alignItems="center">
            {this.sentiments.map((e, i) => (
              <Sentiment
                key={`sentiment_${i}`}
                active={this.state.activeMood === e.id}
                {...e}
              />
            ))}
          </FlexWrapper>
        </View>
        <ScrollView style={styles.list}>{this.renderList()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  moods: {
    flex: 1,
    borderBottomColor: "rgba(21, 21, 21, .1)",
    borderBottomWidth: 1,
  },
  list: {
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 150,
  },
});
