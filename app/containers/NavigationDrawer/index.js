// @flow
import React from "react"

import { DrawerNavigator } from "react-navigation"
import { View } from "native-base"

import SideMenu from "./SideMenu"
import TagScreen from "../Tag"

export const NavigationDrawer = Tabs =>
	DrawerNavigator(
		{
			MainTabs: {
				screen: Tabs,
			},
			TagScreen: {
				screen: TagScreen,
			},
		},
		{
			drawerWidth: 300,
			contentComponent: SideMenu,
		}
	)
