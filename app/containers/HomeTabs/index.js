// @flow
import MainScreen from "../Main"
import { TabNavigator } from "react-navigation"

const HomeTabs = TabNavigator(
	{
		home: {
			screen: MainScreen,
			path: "",
		},
	},
	{}
)

export default HomeTabs
