/* @flow */

import React, {PureComponent} from 'react';
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
  q: string,
  page: number,
  loading: boolean,
}

const rowHasChanged = (r1: Article, r2: Article) => r1 !== r2;

class HomeScreen extends PureComponent {
	props: Props
	state: State
	_stories: Array<Story>

	constructor(props: Props) {
		super({isTag: false, ...props});
		this.state = {
			dataSource: new ListView.DataSource({rowHasChanged}).cloneWithRows([]),
			loading: true,
			q: props.q || '',
			page: 0
		};
	}

	componentDidMount() {
		this.init();
	}

	componentWillReceiveProps(props: Props) {
		console.log(props);
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
		const stories = await feedClient.getStories(this.props.isTag ? {page, tag: this.state.q} : {page, q: this.state.q});

		this._stories = this._stories.concat(stories);
		// await new Promise(resolve => setTimeout(resolve, 1000));
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this._stories),
			loading: false,
			page
		});
	}

	render() {
		return (
			<View style={{marginTop: Scales.navBarHeight, marginBottom: 50}}>
				<SearchBar
					lightTheme
					icon={{name: this.props.isTag ? IconName.tag : IconName.search}}
					onSubmitEditing={e => {
						Actions.homeScreen({
							q: e.nativeEvent.text,
							isTag: this.props.isTag
						});
					}}
					placeholder={this.props.isTag ? 'タグ検索' : '作品名、キャラ名など...'}
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

	async onValueChange(q: string) {
		await this.setState({q});
		if (this.state.loading) {
			return;
		}
		this.resetList();
		await this.loadArticles();
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

export default HomeScreen;
