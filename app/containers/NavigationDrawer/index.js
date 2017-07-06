// @flow
import { Alert } from "react-native";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";

import { IconName } from "../../themes";
import BaseScreen from "../Base";
import SideMenu from "./SideMenu";
import TagScreen from "../Tag";
import WebScreen from "../Web";
import config from "../../configs";

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
                  style={{ marginLeft: 20 }}
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
            screen: TagScreen,
            navigationOptions: ({ navigation }) => ({
              title: "作品リスト",
              headerLeft: (
                <Icon
                  style={{ marginLeft: 20 }}
                  name="bars"
                  onPress={() => navigation.navigate("DrawerOpen")}
                />
              )
            })
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
