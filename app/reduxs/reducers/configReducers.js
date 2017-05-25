// @flow

import { ActionTypes } from "../constants"
import type { ConfigState } from "../../types"

type Action = {
  type: string,
  config: ConfigState
};

const initialState = {
	inappbrowse: false,
}

export function configReducers(
  state: ConfigState = initialState,
  action: Action
) {
	switch (action.type) {
		case ActionTypes.LOAD_CONFIG_END_TYPE:
			return { ...action.config }
		case ActionTypes.TOGGLE_IAB_CONFIG_TYPE:
			return { ...state, inappbrowse: !state.inappbrowse }
		default:
			return state
	}
}
