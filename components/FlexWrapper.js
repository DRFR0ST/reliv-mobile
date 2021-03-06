import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

/**
 * @class
 * @description Simple Flexbox wrapper.
 * @author Mike Eling <mike.eling97@gmail.com>
 */
class FlexWrapper extends PureComponent {
  static styleProps = {
    justifyContent: PropTypes.oneOf([
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
      "space-evenly",
    ]),
    alignItems: PropTypes.oneOf([
      "strech",
      "flex-start",
      "flex-end",
      "center",
      "baseline",
    ]),
    alignContent: PropTypes.oneOf([
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
      "stretch",
    ]),
    flexDirection: PropTypes.oneOf([
      "row",
      "row-reverse",
      "column",
      "column-reverse",
    ]),
    flexWrap: PropTypes.oneOf(["nowrap", "wrap", "wrap-reverse"]),
    flexFlow: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  static propTypes = {
    ...FlexWrapper.styleProps,
  };

  static defaultProps = {
    justifyContent: "space-between",
    flexDirection: "row"
  };

  /**
   * @description Exclude props which have been already used.
   * @returns {object}
   */
  filterProps() {
    const propTypes = Object.keys(FlexWrapper.propTypes),
      props = { ...this.props };

    // Delete all props defined in PropTypes.
    for (var i = 0; i < propTypes.length; i++) delete props[propTypes[i]];

    return props;
  }

  /**
   * @description Include props which contain flex container style.
   * @returns {object}
   */
  composeStyle = () => {
    let styles = { ...this.props.style, display: "flex" }; // Initial style.

    const styleProps = Object.keys(FlexWrapper.styleProps);

    // Adds props to style.
    for (var i = 0; i < styleProps.length; i++)
      if (this.props[styleProps[i]])
        styles[styleProps[i]] = this.props[styleProps[i]];

    return styles;
  };

  render() {
    return (
      <View style={this.composeStyle()} {...this.filterProps()}>
        {this.props.children}
      </View>
    );
  }
}

export default FlexWrapper;
