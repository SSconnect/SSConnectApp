// @flow
import MainScreen from "../Main"
import { TabNavigator } from "react-navigation"
import { Profile } from "../../types/index"

export const makeHomeTabs = ({ profiles }) => {
	const tabs = _.zipObject(
		_.map(profiles, p => p.label()),
		_.map(profiles, p => ({
			screen: MainScreen,
		}))
	)
	console.log("check")
	console.log(profiles)
	console.log(tabs)
	return TabNavigator(tabs)
}
