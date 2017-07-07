import React from "react";
import { Linking } from "react-native";
import { connect } from "react-redux";
import {
  Body,
  Left,
  CheckBox,
  Content,
  ListItem,
  Text,
  Right,
  Switch,
  Container
} from "native-base";
import { Icon } from "react-native-elements";

import TabList from "./TabList";
import { selectConfig } from "../../reduxs/selectors";
import { toggleConfigIAB } from "../../reduxs/actions";

import { IconName, Scales } from "../../themes";
import { Config } from "../../types";
import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";

type Props = {
  config: Config,
  onToggleConfigIAB: Function,
  navigation: NavigationScreenProp
};

class SideMenu extends React.Component {
  props: Props;

  componentWillReceiveProps() {
    this.forceUpdate();
  }

  render() {
    const { config, onToggleConfigIAB, navigation } = this.props;
    return (
      <Container>
        <Content
          style={{
            flex: 1,
            paddingTop: Scales.statusBarHeight,
            paddingBottom: 10
          }}
        >
          <ListItem
            icon
            onPress={() => {
              this.props.navigation.navigate("Main");
            }}
          >
            <Left>
              <Icon name={IconName.home} />
            </Left>
            <Body>
              <Text>ホーム</Text>
            </Body>
          </ListItem>
          <ListItem
            icon
            onPress={() => {
              this.props.navigation.navigate("TagScreen");
            }}
          >
            <Left>
              <Icon name={IconName.list} />
            </Left>
            <Body>
              <Text>作品タグ一覧</Text>
            </Body>
          </ListItem>

          <ListItem itemDivider>
            <Text>お気に入り</Text>
          </ListItem>
          <TabList
            navigateScreen={profile => {
              navigation.navigate("BaseScreen", {
                profile,
                title: profile.label()
              });
            }}
          />

          <ListItem itemDivider>
            <Text>設定</Text>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon type="font-awesome" name="share-square-o" />
            </Left>
            <Body>
              <Text>アプリブラウザで開く</Text>
            </Body>
            <Right>
              <Switch
                onValueChange={onToggleConfigIAB}
                value={config.inappbrowse}
              />
            </Right>
          </ListItem>

          <ListItem
            icon
            onPress={() => {
              Linking.openURL("https://sites.google.com/view/ssconnect/サポート");
            }}
          >
            <Left>
              <Icon name={IconName.send} />
            </Left>
            <Body>
              <Text>開発者・リクエスト</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => ({
  config: selectConfig(state, props)
});

const mapDispatchToProps = dispatch => ({
  onToggleConfigIAB: () => dispatch(toggleConfigIAB())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
