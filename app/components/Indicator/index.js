// @flow

import React from "react"
import { Text, View } from "react-native"
import Spinner from "native-base"

import { Colors } from "../../themes/"

class Indicator extends React.PureComponent {
	props: {
		loading: boolean
	}

	static defaultProps: Props = {
		loading: true,
	}

	render() {
		if (!this.props.loading) {
			return null
		}
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					padding: 20,
				}}
			>
				<Spinner color={Colors.black} />
				<Text>Loading...</Text>
			</View>
		)
	}
}

export default Indicator
