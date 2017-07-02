// @flow
import React from "react"
import BaseScreen from "../Base"
import { TabNavigator } from "react-navigation"

export const makeHomeTabs = ({ profiles }) => {
	const tabs = _.zipObject(
		_.map(profiles, p => p.label()),
		_.map(profiles, p => ({
			screen: props => <BaseScreen profile={p} {...props} />,
		}))
	)
	console.log("check")
	console.log(profiles)
	console.log(tabs)
	return TabNavigator(tabs)
}
