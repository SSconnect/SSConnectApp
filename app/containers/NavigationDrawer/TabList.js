import React from "react";
import { Text } from "react-native";
import { Icon } from "react-native-elements";

import _ from "lodash";

import { connect } from "react-redux";

import { deleteProfile, moveProfile } from "../../reduxs/actions";

import { selectProfiles } from "../../reduxs/selectors";

import { Colors, IconName } from "../../themes/index";
import type { Profile } from "../../types/index";
import { Body, Content, Left, ListItem, Right } from "native-base";

type Props = {
  profiles: Array<Profile>,
  navigateScreen: Function,
  onMoveProfile: (from: number, to: number) => {},
  onDeleteProfile: Function
};

class TabList extends React.PureComponent {
  props: Props;

  componentWillReceiveProps() {
    this.forceUpdate();
  }

  renderListItem(profile: Profile, i) {
    const { onDeleteProfile, onMoveProfile, navigateScreen } = this.props;
    return (
      <ListItem
        icon
        key={profile.q + profile.tag + profile.blog_id}
        onPress={() => navigateScreen(profile)}
      >
        <Left>
          <Icon
            size={25}
            style={{ marginLeft: 5, marginRight: 5 }}
            name={profile.icon()}
          />
        </Left>
        <Body>
          <Text style={{ padding: 5 }} ellipsizeMode={"middle"}>
            {profile.q || profile.tag}
          </Text>
        </Body>
        <Right>
          <Icon
            name={IconName.up}
            onPress={() => onMoveProfile(i, i - 1)}
            color={i === 0 ? "#eee" : "gray"}
          />
          <Icon
            name={IconName.delete}
            onPress={() => onDeleteProfile(profile)}
            color={Colors.red}
          />
        </Right>
      </ListItem>
    );
  }

  render() {
    const { profiles } = this.props;
    if (profiles.length === 0) {
      return (
        <Text style={{ padding: 10 }}>
          検索キーワードや作品タグをブックマークしましょう！
        </Text>
      );
    }
    return (
      <Content>
        {_.map(profiles, this.renderListItem.bind(this))}
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => ({
  profiles: selectProfiles(state, props)
});

const mapDispatchToProps = dispatch => ({
  onMoveProfile: (from, to) => dispatch(moveProfile(from, to)),
  onDeleteProfile: profile => dispatch(deleteProfile(profile))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabList);
