// @flow
import React from "react";
import _ from "lodash";

import { TabNavigator } from "react-navigation";

import BaseScreen from "../Base";

export const makeHomeTabs = ({ profiles }) => {
  const tabs = _.zipObject(
    _.map(profiles, p => p.label()),
    _.map(profiles, p => ({
      screen: props => <BaseScreen profile={p} {...props} />
    }))
  );
  console.log("check");
  console.log(profiles);
  console.log(tabs);
  return TabNavigator(tabs);
};
