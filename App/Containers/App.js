/* @flow */

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import { Scene, Router } from 'react-native-router-flux';
import { Colors } from '../Themes';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: Colors.white,
  },
  listContent: {
    marginTop: 100,
  },
});


class App extends Component {
  render() {
    const text = 1;
    return (
      <Router style={Styles.container} hideNavBar hideTabBar>
        <Scene key="root" passProps >
          <Scene initial key="homeScreen" component={HomeScreen} />
        </Scene>
      </Router>
    );
  }
}

export default App;
