// @flow
import React from "react"

import { DrawerNavigator, StackNavigator } from "react-navigation"
import { View } from "native-base"

import SideMenu from "./SideMenu"
import TagScreen from "../Tag"
import WebScreen from "../Web"

export const NavigationDrawer = Tabs =>
	DrawerNavigator(
		{
			Main: {
				screen: StackNavigator({
					MainTabs: {
						screen: Tabs,
					},

					WebScreen: {
						screen: WebScreen,
					},
				}),
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
