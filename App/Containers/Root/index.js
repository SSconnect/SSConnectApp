// @flow

import React, { Component } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { loadProfiles } from '../App/actions';

import NavigationRouter from '../../Navigation/NavigationRouter';

// Styles
const styles = StyleSheet.create({
	applicationView: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		// fontFamily: Fonts.type.base,
		// margin: Metrics.baseMargin,
	},
	myImage: {
		width: 200,
		height: 200,
		alignSelf: 'center',
	},
});

class RootContainer extends Component {
	componentDidMount() {
		// if redux persist is not active fire startup action
		// if (!ReduxPersist.active) {
		this.props.startup();
		// }
	}

	render() {
		return (
			<View style={styles.applicationView}>
				<StatusBar barStyle="light-content" />
				<NavigationRouter />
			</View>
		);
	}
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
	startup: () => dispatch(loadProfiles()),
});

export default connect(null, mapDispatchToProps)(RootContainer);
