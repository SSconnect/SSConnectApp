// @flow

import React from "react";
import { Alert, Linking, ListView, ScrollView, Text, View } from "react-native";

import { connect } from "react-redux";
import _ from "lodash";
import {
  Button,
  Container,
  Content,
  Header,
  Left,
  Right,
  Title
} from "native-base";
import FAIcon from "react-native-vector-icons/FontAwesome";
import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";

import config from "../../configs";

import { addProfile, addRead, loadStories } from "../../reduxs/actions";
import {
  makeSelectPageInfo,
  makeSelectStories,
  selectConfig,
  selectLoading,
  selectProfiles
} from "../../reduxs/selectors";

import Indicator from "../../components/Indicator";
import StoryCell from "../../components/StoryCell";
import Paginator from "../../components/Paginator";

import type { Config, PageInfo, Profile, Read, Story } from "../../types";
import { IconName } from "../../themes/";
import SearchBar from "../../components/StorySearchBar";

type State = {
  dataSource: any
};

type Props = {
  profile: Profile,
  onAddProfile: Function,
  onLoadStories: Function,
  reads: Array<Read>,
  onAddRead: Function,
  profiles: Array<Profile>,
  loading: boolean,
  pageInfo: PageInfo,
  stories: Array<Story>,
  config: Config,
  navigation: NavigationScreenProp
};

class BaseScreen extends React.PureComponent {
  props: Props;
  state: State = {
    dataSource: new ListView.DataSource({
      rowHasChanged: BaseScreen.rowHasChanged
    }).cloneWithRows(this.props.stories)
  };

  static defaultProps = {
    profile: { q: "", tag: "" },
    pageInfo: { page: 1 },
    loading: true,
    reads: [],
    stories: []
  };

  static navigationOptions = ({ navigation }) => {
    if (!navigation.state.params.props) {
      return null;
    }
    const { profile, profiles, onAddProfile } = navigation.state.params.props;
    return {
      title: profile.label(),
      headerRight: BaseScreen.renderSubscribeButton({
        profile,
        active: _.find(profiles, profile),
        profileFull: profiles.length >= config.LIMITS.PROFILE_MAX.FREE,
        onAddProfile
      })
    };
  };

  static renderSubscribeButton({ profile, active, profileFull, onAddProfile }) {
    if (profile.isHome()) {
      return null;
    }
    return (
      <View style={{ paddingRight: 20 }}>
        <FAIcon
          name={IconName.heart}
          color={active ? "black" : "#CCC"}
          size={20}
          onPress={() => {
            if (profileFull) {
              Alert.alert("失敗", "タグは 3つまでしか登録できません。(Free プラン)");
              return;
            }
            onAddProfile(profile);
            if (profile.q && profile.tag) {
              Alert.alert("完了", `「${profile.tag}|${profile.q}」を登録しました`);
            } else if (profile.tag) {
              Alert.alert("完了", `タグ「${profile.tag || ""}」を登録しました`);
            } else {
              Alert.alert("完了", `「${profile.q}」を登録しました`);
            }
          }}
        />
      </View>
    );
  }

  static rowHasChanged(r1: Story, r2: Story) {
    return r1.id !== r2.id;
  }

  componentWillMount() {
    this.props.onLoadStories(this.props.profile, this.props.pageInfo.page);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      props: this.props
    });
  }

  componentWillReceiveProps(newProps: Props) {
    this.forceUpdate();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.stories)
    });
  }

  render() {
    const { profile, navigation } = this.props;
    return (
      <Container>
        <Content>
          <ScrollView>
            <SearchBar
              profile={profile}
              onSubmit={(e, title) => {
                navigation.navigate("BaseScreen", {
                  profile: new Profile({ ...profile, q: e.nativeEvent.text }),
                  title
                });
              }}
            />
            {this.renderMain()}
            <Indicator loading={this.props.loading} />
            {this.renderNoHit()}
          </ScrollView>
        </Content>
      </Container>
    );
  }

  renderMain() {
    if (this.props.loading || this.state.dataSource.getRowCount() === 0) {
      return null;
    }
    return (
      <View>
        {this.renderPager()}
        {this.renderListView()}
        {this.renderPager()}
      </View>
    );
  }

  renderPager() {
    return (
      <Paginator
        pageInfo={this.props.pageInfo}
        onPressPrev={() => {
          this.handlePageChange(this.props.pageInfo.page - 1);
        }}
        onPressNext={() => {
          this.handlePageChange(this.props.pageInfo.page + 1);
        }}
        onComplete={this.handlePageChange.bind(this)}
      />
    );
  }

  handlePageChange(page) {
    this.props.onLoadStories(this.props.profile, page);
  }

  renderListView() {
    const { onAddRead, config, navigation } = this.props;
    return (
      <ListView
        renderRow={story =>
          <StoryCell
            story={story}
            onPress={() => {
              onAddRead(story);
              const uri = story.articles[0].url;
              if (config.inappbrowse) {
                navigation.navigate("WebScreen", {
                  title: story.title,
                  uri,
                  direction: "vertical"
                });
              } else {
                Linking.openURL(uri);
              }
            }}
          />}
        dataSource={this.state.dataSource}
        enableEmptySections
        distanceToLoadMore={100}
        // onRefresh={() => this.init()}
        refreshDescription=""
      />
    );
  }

  renderNoHit() {
    if (this.props.loading || this.state.dataSource.getRowCount() > 0) {
      return null;
    }
    return <Text style={{ padding: 10 }}>作品は見つかりませんでした</Text>;
  }
}

const makeMapStateToProps = () => {
  const selectStories = makeSelectStories();
  const selectPageInfo = makeSelectPageInfo();
  return (state, props) => ({
    stories: selectStories(state, props),
    pageInfo: selectPageInfo(state, props),
    profiles: selectProfiles(state, props),
    loading: selectLoading(state, props),
    config: selectConfig(state, props)
  });
};

const mapDispatchToProps = dispatch => ({
  onAddProfile: (profile: Profile) => dispatch(addProfile(profile)),
  onAddRead: story => dispatch(addRead(story)),
  onLoadStories: (profile: Profile, page: number) =>
    dispatch(loadStories(profile, page))
});

export default connect(makeMapStateToProps, mapDispatchToProps)(BaseScreen);
