// @flow

import React from 'react';
import { View, Text, ListView, ScrollView, Alert } from 'react-native';
import { Button, Slider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import _ from 'lodash';

import config from '../../configs';

import { addProfile, loadStories } from '../../reduxs/actions';
import {
	makeSelectReads,
	makeSelectProfilesCount,
	makeSelectLoading,
	makeSelectStories,
} from '../../reduxs/selectors';

import Indicator from '../../components/Indicator';
import StoryCell from '../../components/StoryCell';

import realm from '../../models/RealmModel';

import type { Story, Profile, Read } from '../../types';
import { Scales, IconName } from '../../themes/';
import SearchBar from '../../components/StorySearchBar';

type Props = {
	profile: Profile,
	isHome: boolean,
	onAddProfile: Function,
	onLoadStories: Function,
	reads: Array<Read>,
	profilesCount: number,
	loading: boolean,
	page: number,
	stories: Array<Story>,
};

type State = {
	dataSource: any,
	prevPage: number,
	addDisable: boolean,
};

class BaseScreen extends React.PureComponent {
	props: Props;
	state: State = {
		dataSource: new ListView.DataSource({ rowHasChanged: this.rowHasChanged }).cloneWithRows([]),
		addDisable: false,
		prevPage: this.props.page,
	};

	static defaultProps = {
		profile: {},
		page: 1,
		loading: true,
		isHome: false,
		onAddProfile: (tab) => {
			console.log(tab);
		},
	};

	rowHasChanged(r1: Story, r2: Story) {
		return r1.id !== r2.id;
	}

	componentWillMount() {
		this.props.onLoadStories(this.props.profile, this.props.page);
	}

	componentWillReceiveProps(newProps: Props) {
		this.forceUpdate();
		if (this.props.page !== newProps.page) {
			this.props.onLoadStories(newProps.profile, newProps.page);
		}
		this.setState({
			prevPage: newProps.page,
			dataSource: this.state.dataSource.cloneWithRows(newProps.stories),
		});
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
		if (this.props.loading || this.state.dataSource.getRowCount() > 0) {
			return null;
		}
		return <Text style={{ padding: 10 }}>作品は見つかりませんでした</Text>;
	}

	renderPager() {
		if (this.props.loading) {
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
					{this.state.prevPage}
				</Text>
				<Slider
					value={this.state.prevPage}
					style={{ flex: 4 }}
					step={1}
					thumbTintColor="#333"
					maximumValue={100}
					minimumValue={1}
					onValueChange={(value) => {
						this.setState({ prevPage: value });
					}}
					onSlidingComplete={(value) => {
						Actions.refresh({ page: value });
						// this.props.onLoadStories(this.props.profile, this.props.page);
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
					renderRow={story => <StoryCell story={story} readed={readedIds.includes(story.id)} />}
					dataSource={this.state.dataSource}
					enableEmptySections
					distanceToLoadMore={100}
					// onRefresh={() => this.init()}
					refreshDescription=""
				/>
				{this.renderPager()}
				<Indicator loading={this.props.loading} />
				{this.renderNoHit()}
			</ScrollView>
		);
	}
}

const mapStateToProps = (state, props) => ({
	reads: makeSelectReads(state, props),
	stories: makeSelectStories(state, props),
	profilesCount: makeSelectProfilesCount(state, props),
	loading: makeSelectLoading(state, props),
});

const mapDispatchToProps = dispatch => ({
	onAddProfile: profile => dispatch(addProfile(profile)),
	onLoadStories: (profile, page) => dispatch(loadStories(profile, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseScreen);
