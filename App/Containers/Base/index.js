// @flow

import React from 'react';
import { View, ListView } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Actions } from 'react-native-router-flux';

import { addProfile } from '../App/actions';

import Indicator from '../../Components/Indicator';
import StoryCell from '../../Components/StoryCell';

import realm from '../../Models/RealmModel';

import feedClient from '../../Services/FeedClient';
import type { Article, Story, TabProfile } from '../../Types';
import { Scales, IconName } from '../../Themes/';

type Props = {
	profile: TabProfile,
	isHome: boolean,
	onAddProfile: Function,
};

type State = {
	dataSource: any,
	page: number,
	loading: boolean,
};

const rowHasChanged = (r1: Article, r2: Article) => r1 !== r2;

class BaseScreen extends React.PureComponent {
	props: Props;
	state: State = {
		dataSource: new ListView.DataSource({ rowHasChanged }).cloneWithRows([]),
		loading: true,
		page: 0,
	};
	loadMoreContentAsync: Function;

	static defaultProps = {
		profile: { type: 'search', value: '' },
		isHome: false,
		onAddProfile: (tab) => {
			console.log(tab);
		},
	};

	constructor(props: Props) {
		super(props);
		this.loadMoreContentAsync = this.loadMoreContentAsync.bind(this);
	}

	componentDidMount() {
		this.init();
	}

	componentWillReceiveProps() {
		this.forceUpdate();
		this.init();
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
			<Icon
				name="add"
				onPress={() => {
					onAddProfile(profile);
					const typeStr = profile.type === 'tag' ? 'タグ' : '検索';
					alert(`${typeStr}「${profile.value}」を登録しました`);
				}}
			/>
		);
	}

	render() {
		const { profile } = this.props;
		const isTag = profile.type === 'tag';
		return (
			<View style={{ marginTop: Scales.navBarHeight, marginBottom: 50 }}>
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
					renderRow={story => <StoryCell story={story} />}
					dataSource={this.state.dataSource}
					canLoadMore
					enableEmptySections
					distanceToLoadMore={100}
					renderFooter={() => <Indicator loading={this.state.page === 0} />}
				/>
			</View>
		);
	}
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			onAddProfile: profile => addProfile(profile),
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(BaseScreen);
