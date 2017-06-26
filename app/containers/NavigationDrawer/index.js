// @flow
import React from "react"

import SideMenu from "./SideMenu"

import { DrawerNavigator } from "react-navigation"
import { View } from "native-base"

export const NavigationDrawer = Tabs =>
	DrawerNavigator(
		{
			MainTabs: {
				screen: Tabs,
			},
		},
		{
			drawerWidth: 300,
			contentComponent: SideMenu,
		}
	)
