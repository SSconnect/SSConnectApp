// @flow

import React from "react"
import { View, StatusBar, StyleSheet } from "react-native"
import { connect } from "react-redux"
import { makeHomeTabs } from "../HomeTabs"

import { loadProfiles, loadConfig, loadReads } from "../../reduxs/actions"
import { selectProfiles } from "../../reduxs/selectors"

import store from "../../models/StoreManager"
import NavigationRouter from "../../routers/NavigationRouter"
import { NavigationDrawer } from "../NavigationDrawer"

import { Profile } from "../../types"

// Styles
const styles = StyleSheet.create({
	applicationView: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: "center",
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		// fontFamily: Fonts.type.base,
		// margin: Metrics.baseMargin,
	},
	myImage: {
		width: 200,
		height: 200,
		alignSelf: "center",
	},
})

type Props = {
	profiles: Array<Profile>,
	loadProfiles: Function,
	loadReads: Function,
	loadConfig: Function
}

class RootContainer extends React.Component {
	props: Props

	componentDidMount() {
		store.getReads()
		// if redux persist is not active fire startup action
		// if (!ReduxPersist.active) {
		this.props.loadProfiles()
		this.props.loadReads()
		this.props.loadConfig()
		// }
	}

	componentWillReceiveProps() {
		this.forceUpdate()
	}

	render() {
		const { profiles } = this.props
		const tabProfiles = [
			new Profile({ q: "", tag: "" }), // Home
			...profiles,
		]
		// const Tabs = makeHomeTabs({ profiles: tabProfiles })
		return (
			<View style={styles.applicationView}>
				<StatusBar barStyle="default" />
				<NavigationDrawer />
			</View>
		)
	}
}

const mapStateToProps = (state, props) => ({
	profiles: selectProfiles(state, props),
})

const mapDispatchToProps = dispatch => ({
	loadProfiles: () => dispatch(loadProfiles()),
	loadConfig: () => dispatch(loadConfig()),
	loadReads: () => dispatch(loadReads()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
