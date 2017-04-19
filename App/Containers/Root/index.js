// @flow

import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadProfiles } from '../App/actions';
import { makeSelectTabProfiles } from '../App/selectors';

import NavigationRouter from '../../Navigation/NavigationRouter';

import type { TabProfile } from '../../Types';

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

type Props = {
	profiles: Array<TabProfile>,
	startup: Function,
};

class RootContainer extends React.Component {
	props: Props;

	componentDidMount() {
		// if redux persist is not active fire startup action
		// if (!ReduxPersist.active) {
		this.props.startup();
		// }
	}

	componentWillReceiveProps() {
		this.forceUpdate();
	}

	render() {
		return (
			<View style={styles.applicationView}>
				<StatusBar barStyle="default" />
				<NavigationRouter profiles={this.props.profiles} />
			</View>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	profiles: makeSelectTabProfiles(),
});

const mapDispatchToProps = dispatch => ({
	startup: () => dispatch(loadProfiles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
