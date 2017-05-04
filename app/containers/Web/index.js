// @flow

import React from 'react';
import { View, StyleSheet, WebView, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { Scales } from '../../themes';

// Styles
const styles = StyleSheet.create({
	applicationView: {
		flex: 1,
		marginTop: Scales.navBarHeight,
	},
});

type Props = {
	uri: string
};

type State = {
	height: number
};

class WebScreen extends React.Component {
	props: Props;
	state: State = {
		height: 40,
	};

	componentDidMount() {}

	componentWillReceiveProps() {
		this.forceUpdate();
	}

	render() {
		const { uri } = this.props;
		const { height } = this.state;
		return (
			<View style={styles.applicationView}>
				<WebView source={{ uri }} style={{ marginBottom: 40 }} />
				<View
					style={{
						flexDirection: 'row',
						backgroundColor: '#ddd',
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height,
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
						icon={{ type: 'font-awesome', name: Platform.OS === 'ios' ? 'safari' : 'chrome' }}
						onPress={() => {
							Actions.pop();
							Linking.openURL(uri);
						}}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WebScreen);