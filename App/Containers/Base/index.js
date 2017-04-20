// @flow

import React from 'react';
import { View, Text, ListView, ScrollView } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import { Actions } from 'react-native-router-flux';

import { addProfile } from '../App/actions';
import { makeSelectReads } from '../App/selectors';

import Indicator from '../../Components/Indicator';
import StoryCell from '../../Components/StoryCell';

import realm from '../../Models/RealmModel';

import feedClient from '../../Services/FeedClient';
import type { Story, TabProfile, Read } from '../../Types';
import { Scales, IconName } from '../../Themes/';

type Props = {
	profile: TabProfile,
	isHome: boolean,
	onAddProfile: Function,
	reads: Array<Read>,
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
		profile: { type: 'search', value: '' },
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
		const stories = await feedClient.getStories(
			profile.type === 'tag' ? { page, tag: profile.value } : { page, q: profile.value },
		);

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
		if (isHome || realm.existsTabProfile(profile)) {
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
						onAddProfile(profile);
						this.setState({ addDisable: true });
						const typeStr = profile.type === 'tag' ? 'タグ' : '検索';
						alert(`${typeStr}「${profile.value}」を登録しました`);
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

	render() {
		const { profile, reads, isHome } = this.props;
		const isTag = profile.type === 'tag';
		const readedIds = _.map(reads, e => e.story_id);
		return (
			<ScrollView
				style={{ marginTop: Scales.navBarHeight, marginBottom: isHome ? Scales.footerHeight : 0 }}
			>
				<SearchBar
					lightTheme
					icon={{ name: isTag ? IconName.tag : IconName.search }}
					onSubmitEditing={(e) => {
						const newProfile = {
							type: profile.type,
							value: e.nativeEvent.text,
						};
						Actions.baseScreen({
							profile: newProfile,
							title: `${isTag ? 'タグ' : '検索'}: ${newProfile.value}`,
						});
					}}
					placeholder={isTag ? 'タグ検索' : 'タイトル検索'}
				/>
				{this.renderSubscribeButton()}
				<ListView
					onLoadMoreAsync={this.loadMoreContentAsync}
					renderRow={story => <StoryCell story={story} readed={readedIds.includes(story.id)} />}
					dataSource={this.state.dataSource}
					enableEmptySections
					distanceToLoadMore={100}
					renderFooter={() => <Indicator loading={this.state.page === 0} />}
					onRefresh={() => this.init()}
					refreshDescription=""
				/>
				{this.renderNoHit()}
			</ScrollView>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	reads: makeSelectReads(),
});

const mapDispatchToProps = dispatch => ({
	onAddProfile: profile => dispatch(addProfile(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseScreen);
