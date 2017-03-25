/* @flow */

import React from 'react';
import {
  View,
  Text,
  Picker,
  Linking,
  ScrollView,
  ListView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import {Icon, Grid, Col, Row, SearchBar} from 'react-native-elements';

import {Actions, ActionConst} from 'react-native-router-flux';

import Indicator from '../../Components/Indicator';
import StoryCell from '../../Components/StoryCell';

import feedClient from '../../Services/FeedClient';
import type {Article, Story} from '../../Types';
import {Colors, Scales, IconName} from '../../Themes/';

type Props = {
  isTag: boolean,
  q: string
}

type State = {
  dataSource: any,
  page: number,
  loading: boolean
}

const rowHasChanged = (r1: Article, r2: Article) => r1 !== r2;

class BaseScreen extends React.Component {
	props: Props

	state: State = {
		dataSource: new ListView.DataSource({rowHasChanged}).cloneWithRows([]),
		loading: true,
		page: 0
	}

    _stories: Array<Story>

    static defaultProps = {
        isTag: false,
        q: ''
    };

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		console.log('d', this.props);
		this.init();
	}

	componentWillReceiveProps(props: Props) {
		console.log('w', props);
		this.init();
	}

	async init() {
		this.resetList();
		await this.loadArticles();
	}

	renderRow(story: Story) {
		return (
			<StoryCell
				story={story}
				/>
		);
	}

	async resetList() {
		this._stories = [];
		this.setState({
			page: 0,
			dataSource: this.state.dataSource.cloneWithRows([])
		});
	}

	async loadArticles() {
		const page = this.state.page + 1;
		this.setState({loading: true});
		const {isTag, q} = this.props;
		const stories = await feedClient.getStories(isTag ? {page, tag: q} : {page, q});

		this._stories = this._stories.concat(stories);
		// await new Promise(resolve => setTimeout(resolve, 1000));
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this._stories),
			loading: false,
			page
		});
	}

	render() {
		const {isTag} = this.props;
		return (
			<View style={{marginTop: Scales.navBarHeight, marginBottom: 50}}>
				<SearchBar
					lightTheme
					icon={{name: isTag ? IconName.tag : IconName.search}}
					onSubmitEditing={e => {
						Actions.baseScreen({
							q: e.nativeEvent.text,
							isTag
						});
					}}
					placeholder={isTag ? 'タグ検索' : '作品名、キャラ名など...'}
					/>
				<ListView
					renderScrollComponent={props => <InfiniteScrollView {...props}/>}
					onLoadMoreAsync={this.loadMoreContentAsync.bind(this)}
					renderRow={this.renderRow}
					dataSource={this.state.dataSource}
					canLoadMore
					enableEmptySections
					distanceToLoadMore={100}
					renderFooter={this.renderFooter.bind(this)}
					/>
			</View>
		);
	}

	async loadMoreContentAsync() {
		if (this.state.loading) {
			return;
		}
		this.loadArticles();
	}

	renderFooter() {
		return (<Indicator loading={this.state.page == 0}/>);
	}

}

const styles = StyleSheet.create({
	readed: {
		color: 'gray'
	},
	picker: {
	},
	pickerBox: {
		height: 100,
		overflow: 'hidden',
		justifyContent: 'space-around'
	}
});

export default BaseScreen;
