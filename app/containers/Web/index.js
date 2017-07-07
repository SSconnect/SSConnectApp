// @flow

import React from "react";
import { Linking, Platform, StyleSheet, View, WebView } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";

import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";

// Styles
const styles = StyleSheet.create({
  applicationView: {
    flex: 1
  }
});

type State = {
  height: number
};

class WebScreen extends React.Component {
  props: {
    navigation: NavigationScreenProp
  };
  state: State = {
    height: 40
  };

  componentDidMount() {}

  componentWillReceiveProps() {
    this.forceUpdate();
  }

  render() {
    const { uri } = this.props.navigation.state.params;
    const { height } = this.state;
    return (
      <View style={styles.applicationView}>
        <WebView source={{ uri }} style={{ marginBottom: -100 }} />
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#ddd",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height
          }}
        >
          <Button
            style={{ flex: 1 }}
            backgroundColor="#ddd"
            onPress={() => {
              this.setState({ height: height + 10 });
            }}
          />
          <Button
            style={{ flex: 1 }}
            backgroundColor="#ddd"
            onPress={() => {
              this.setState({ height: Math.max(height - 10, 40) });
            }}
          />
          <View style={{ flex: 2 }} />
          <Button
            style={{ flex: 2 }}
            title="開く"
            icon={{
              type: "font-awesome",
              name: Platform.OS === "ios" ? "safari" : "chrome"
            }}
            onPress={() => {
              Linking.openURL(uri);
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WebScreen);
