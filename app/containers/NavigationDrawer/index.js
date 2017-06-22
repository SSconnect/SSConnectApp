// @flow
import React from "react"

import SideMenu from "./SideMenu"

import { DrawerNavigator } from "react-navigation"

export const NavigationDrawer = DrawerNavigator({
	contentComponent: {
		screen: SideMenu,
	},
})
