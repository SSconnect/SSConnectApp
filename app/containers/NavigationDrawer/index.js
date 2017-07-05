// @flow
import React from "react";

import { DrawerNavigator, StackNavigator } from "react-navigation";

import SideMenu from "./SideMenu";
import TagScreen from "../Tag";
import WebScreen from "../Web";
import BaseScreen from "../Base";
import Icon from "react-native-vector-icons/FontAwesome";

function MappedBaseScreen(allProps) {
  const { navigation, ...otherProps } = allProps;
  const { state: { params } } = navigation;
  return <BaseScreen {...params} navigation={navigation} {...otherProps} />;
}

export const NavigationDrawer = Tabs =>
  DrawerNavigator(
    {
      Main: {
        screen: StackNavigator({
          MainTabs: {
            screen: Tabs,
            navigationOptions: ({ navigation }) => ({
              title: "ホーム",
              headerLeft: (
                <Icon
                  name="bars"
                  onPress={() => navigation.navigate("DrawerOpen")}
                />
              )
            })
          },
          WebScreen: {
            screen: WebScreen
          }
        })
      },
      Tag: {
        screen: StackNavigator({
          TagScreen: {
            screen: TagScreen
          },
          BaseScreen: {
            screen: MappedBaseScreen
          }
        })
      }
    },
    {
      drawerWidth: 300,
      contentComponent: SideMenu
    }
  );
