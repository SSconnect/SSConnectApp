// @flow

import { combineReducers } from "redux"
import { appReducers } from "./appReducers"
import { configReducers } from "./configReducers"

export default combineReducers({
	app: appReducers,
	config: configReducers,
})
