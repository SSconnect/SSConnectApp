/* @flow */

import React from 'react';
import { View, ListView } from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import { SearchBar } from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

import Indicator from '../../Components/Indicator';
import StoryCell from '../../Components/StoryCell';

import feedClient from '../../Services/FeedClient';
import type { Article, Story } from '../../Types';
import { Scales, IconName } from '../../Themes/';

type Props = {
  isTag: boolean,
  q: string,
};

type State = {
  dataSource: any,
  page: number,
  loading: boolean,
};

const rowHasChanged = (r1: Article, r2: Article) => r1 !== r2;

class BaseScreen extends React.PureComponent {
	static defaultProps = {
		isTag: false,
		q: '',
	};

	constructor(props: Props) {
		super(props);
		this.loadMoreContentAsync = this.loadMoreContentAsync.bind(this);
		this.renderFooter = this.renderFooter.bind(this);
	}

	state: State = {
		dataSource: new ListView.DataSource({ rowHasChanged }).cloneWithRows([]),
		loading: true,
		page: 0,
	};

	componentDidMount() {
		this.init();
	}

	componentWillReceiveProps() {
		this.init();
	}

	props: Props;

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
		const { isTag, q } = this.props;
		const stories = await feedClient.getStories(isTag ? { page, tag: q } : { page, q });

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

	renderFooter() {
		return <Indicator loading={this.state.page === 0} />;
	}

	render() {
		const { isTag } = this.props;
		return (
  <View style={{ marginTop: Scales.navBarHeight, marginBottom: 50 }}>
    <SearchBar
      lightTheme
      icon={{ name: isTag ? IconName.tag : IconName.search }}
      onSubmitEditing={(e) => {
	Actions.baseScreen({
		q: e.nativeEvent.text,
		isTag,
	});
}}
      placeholder={isTag ? 'タグ検索' : '作品名、キャラ名など...'}
    />
    <ListView
      renderScrollComponent={props => <InfiniteScrollView {...props} />}
      onLoadMoreAsync={this.loadMoreContentAsync}
      renderRow={story => <StoryCell story={story} />}
      dataSource={this.state.dataSource}
      canLoadMore
      enableEmptySections
      distanceToLoadMore={100}
      renderFooter={this.renderFooter}
    />
  </View>
		);
	}
}

export default BaseScreen;
