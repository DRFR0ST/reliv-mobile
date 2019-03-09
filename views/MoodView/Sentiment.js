import React, { Component } from "react";
import { Icon } from "expo";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Colors from "../../constants/Colors";
import { FlexWrapper } from "../../components";

export default class Sentiment extends Component {
  state = {
    pressed: false,
  };

  renderIcon = () => {
    const { mood, active } = this.props;

    let icon = {
      name: `sentiment-${mood}`,
      color: active ? Colors.sentiment.active : Colors.sentiment.default,
      size: 32,
    };

    return <Icon.MaterialIcons {...icon} />;
  };

  handlePress = e => {
    this.setState({ pressed: e });

    if (this.props.onClick && e === true) this.props.onClick(this.props.id);
  };

  render() {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="transparent"
        onPressIn={() => this.handlePress(true)}
        onPressOut={() => this.handlePress(false)}>
        <View
          style={{
            ...styles.container,
            backgroundColor: this.state.pressed
              ? "rgba(21, 21, 21, .2)"
              : "transparent",
          }}>
          <FlexWrapper
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            width={50}
            height={50}>
            {this.renderIcon()}
          </FlexWrapper>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    lineHeight: 50,
    borderRadius: 50,
    marginBottom: 10,
  },
});
