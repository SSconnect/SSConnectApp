// @flow

import React from 'react';
import { View, StyleSheet, WebView, Linking } from 'react-native';
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
				<View
					style={{
						flexDirection: 'row',
						backgroundColor: '#ccc',
					}}
				>
					<View style={{ flex: 2 }} />
					<Button
						style={{ flex: 1 }}
						title="Safari"
						icon={{
							type: 'font-awesome',
							name: 'safari',
						}}
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
