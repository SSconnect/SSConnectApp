// @flow

import React from 'react';
import { View, Text, ListView, ScrollView, Alert } from 'react-native';
import { Button, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import config from '../../configs';

import { addProfile } from '../../reduxs/actions';
import { makeSelectReads, makeSelectProfilesCount } from '../../reduxs/selectors';

import Indicator from '../../components/Indicator';
import StoryCell from '../../components/StoryCell';

import realm from '../../models/RealmModel';

import feedClient from '../../services/FeedClient';
import type { Story, Profile, Read } from '../../types';
import { Scales, IconName } from '../../themes/';
import SearchBar from '../../components/StorySearchBar';

type Props = {
	profile: Profile,
	isHome: boolean,
	onAddProfile: Function,
	reads: Array<Read>,
	profilesCount: number,
};

type State = {
	dataSource: any,
	page: number,
	loading: boolean,
	addDisable: boolean,
};

class BaseScreen extends React.PureComponent {
	props: Props;
	state: State = {
		dataSource: new ListView.DataSource({ rowHasChanged: this.rowHasChanged }).cloneWithRows([]),
		loading: true,
		page: 0,
		addDisable: false,
	};
	loadMoreContentAsync: Function;

	static defaultProps = {
		profile: {},
		isHome: false,
		onAddProfile: (tab) => {
			console.log(tab);
		},
	};

	rowHasChanged(r1: Story, r2: Story) {
		const readedIds = _.map(this.props.reads, e => e.story_id);
		return r1.id !== r2.id && readedIds.includes(r1.id) !== readedIds.includes(r2.id);
	}

	constructor(props: Props) {
		super(props);
		this.loadMoreContentAsync = this.loadMoreContentAsync.bind(this);
	}

	componentDidMount() {
		this.init();
	}

	componentWillReceiveProps() {
		this.forceUpdate();
	}

	stories: Array<Story>;

	async init() {
		this.resetList();
		await this.loadArticles();
	}

	async resetList() {
		this.stories = [];
		this.setState({
			page: 0,
			dataSource: this.state.dataSource.cloneWithRows([]),
		});
	}

	async loadArticles() {
		const page = this.state.page + 1;
		this.setState({ loading: true });
		const { profile } = this.props;
		const stories = await feedClient.getStories({ page, ...profile });

		this.stories = this.stories.concat(stories);
		// await new Promise(resolve => setTimeout(resolve, 1000));
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.stories),
			loading: false,
			page,
		});
	}

	async loadMoreContentAsync() {
		if (this.state.loading) {
			return;
		}
		this.loadArticles();
	}

	renderSubscribeButton() {
		const { profile, isHome, onAddProfile } = this.props;
		if (isHome || realm.existsProfile(profile)) {
			return null;
		}
		return (
			<View style={{ margin: 5 }}>
				<Button
					raised
					backgroundColor="black"
					title="ブックマーク"
					icon={{ name: IconName.add }}
					disabled={this.state.addDisable}
					onPress={() => {
						if (this.props.profilesCount >= config.LIMITS.PROFILE_MAX.FREE) {
							Alert.alert('失敗', 'タグは 3つまでしか登録できません。(Free プラン)');
							return;
						}
						onAddProfile(profile);
						this.setState({ addDisable: true });
						if (profile.q && profile.tag) {
							Alert.alert('完了', `「${profile.tag}|${profile.q}」を登録しました`);
						} else if (profile.tag) {
							Alert.alert('完了', `タグ「${profile.tag || ''}」を登録しました`);
						} else {
							Alert.alert('完了', `「${profile.q}」を登録しました`);
						}
					}}
				/>
			</View>
		);
	}

	renderNoHit() {
		if (this.state.loading || this.state.dataSource.getRowCount() > 0) {
			return null;
		}
		return <Text style={{ padding: 10 }}>作品は見つかりませんでした</Text>;
	}

	renderPager() {
		if (this.state.loading) {
			return null;
		}
		return (
			<View style={{ flexDirection: 'row' }}>
				<Button
					style={{ flex: 1 }}
					buttonStyle={{
						padding: 8,
						borderRadius: 3,
						marginLeft: 3,
						marginRight: 3,
						marginTop: 3,
					}}
					icon={{ name: IconName.prev }}
					onPress={() => {
						console.log('prev');
					}}
				/>
				<Text
					style={{
						flex: 1,
						textAlign: 'center',
						paddingTop: 12,
					}}
				>
					{this.state.page}
				</Text>
				<Slider
					value={this.state.page}
					style={{ flex: 4 }}
					step={1}
					thumbTintColor="#333"
					maximumValue={100}
					minimumValue={1}
					onValueChange={(value) => {
						this.setState({ page: value });
					}}
					onSlidingComplete={(value) => {
						console.log(value);
					}}
				/>
				<Button
					style={{ flex: 1 }}
					buttonStyle={{
						padding: 8,
						borderRadius: 3,
						marginLeft: 3,
						marginRight: 3,
						marginTop: 3,
					}}
					icon={{ name: IconName.next }}
					onPress={() => {
						console.log('prev');
					}}
				/>
			</View>
		);
	}

	render() {
		const { profile, reads, isHome } = this.props;
		const readedIds = _.map(reads, e => e.story_id);
		return (
			<ScrollView
				style={{ marginTop: Scales.navBarHeight, marginBottom: isHome ? Scales.footerHeight : 0 }}
			>
				<SearchBar profile={profile} />
				{this.renderPager()}
				{this.renderSubscribeButton()}
				<ListView
					onLoadMoreAsync={this.loadMoreContentAsync}
					renderRow={story => <StoryCell story={story} readed={readedIds.includes(story.id)} />}
					dataSource={this.state.dataSource}
					enableEmptySections
					distanceToLoadMore={100}
					onRefresh={() => this.init()}
					refreshDescription=""
				/>
				{this.renderPager()}
				<Indicator loading={this.state.loading} />
				{this.renderNoHit()}
			</ScrollView>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	reads: makeSelectReads(),
	profilesCount: makeSelectProfilesCount(),
});

const mapDispatchToProps = dispatch => ({
	onAddProfile: profile => dispatch(addProfile(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseScreen);
