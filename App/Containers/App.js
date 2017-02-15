/* @flow */

import React, { Component } from 'react';
import HomeScreen from './HomeScreen';
import { Scene, Router } from 'react-native-router-flux';
import { Colors } from '../Themes'

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 100,
		backgroundColor: Colors.white
	},
	listContent: {
		marginTop: Metrics.baseMargin
	}
})


class App extends Component {
  render() {
    const text = 1;
    return (
      <Router style={styles.container} hideNavBar hideTabBar>
        <Scene key="homeScreen" container={HomeScreen} passProps />
      </Router>
    );
  }
}

export default App;
