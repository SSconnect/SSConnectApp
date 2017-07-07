// @flow
import React from "react";
import _ from "lodash";

import { TabNavigator } from "react-navigation";

import BaseScreen from "../Base";

function MappedBaseScreen(allProps) {
  const { navigation, ...otherProps } = allProps;
  const { state: { params } } = navigation;
  return <BaseScreen {...params} navigation={navigation} {...otherProps} />;
}

export const makeHomeTabs = ({ profiles }) => {
  const tabs = _.zipObject(
    _.map(profiles, p => p.label()),
    _.map(profiles, p => ({
      screen: props => <BaseScreen profile={p} {...props} />,
      navigationOptions: BaseScreen.navigationOptions
    }))
  );
  console.log("check");
  console.log(profiles);
  console.log(tabs);
  return TabNavigator(tabs);
};
