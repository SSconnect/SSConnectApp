// @flow

import React from 'react';
import { View, StyleSheet, WebView } from 'react-native';
import { connect } from 'react-redux';

// Styles
const styles = StyleSheet.create({});

type Props = {
	uri: string
};

class WebScreen extends React.Component {
	props: Props;

	componentDidMount() {}

	componentWillReceiveProps() {
		this.forceUpdate();
	}

	render() {
		const { uri } = this.props;
		return (
			<View style={styles.applicationView}>
				<WebView source={{ uri }} />
			</View>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WebScreen);
