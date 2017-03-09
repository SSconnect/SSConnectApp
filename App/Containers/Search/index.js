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
import {SearchBar} from 'react-native-elements';

import Indicator from '../../Components/Indicator';
import ArticleCell from '../../Components/ArticleCell';

import feedClient from '../../Services/FeedClient';
import type {Article} from '../../Types';
import {Colors, Scales} from '../../Themes/';

type Props = {

}

type State = {
  dataSource: any,
  q: string,
  page: number,
  loading: boolean,
  blogs: Array<any>
}

const rowHasChanged = (r1: Article, r2: Article) => true;

class SearchScreen extends PureComponent {
	props: Props
	state: State = {
		dataSource: new ListView.DataSource({rowHasChanged}).cloneWithRows([]),
		loading: true,
		q: '',
		page: 0,
		blogs: []
	}
	_articles: Array<Article>

	componentDidMount() {
		this.init();
	}

	async init() {
		const blogs = await feedClient.getBlogs();
		console.log('blogs', blogs);
		this.setState({
			blogs,
			loading: false,
			page: 1
		});
	}

	renderRow(article: Article) {
		return (
			<ArticleCell
				article={article}
				/>
		);
	}

	async onValueChange(q: string) {
		console.log(q);
		await this.setState({q});
		await this.loadMore(true);
	}

	async loadMore(reset: boolean = false) {
		if (this.state.q == '') {
			return;
		}
		if (reset) {
			this._articles = [];
			this.setState({
				page: 0,
				dataSource: this.state.dataSource.cloneWithRows([])
			});
		}
		const page = this.state.page + 1;
		this.setState({loading: true});
		let articles = [];
		let q = '';
    // q が非同期で更新されていないか常にチェック
		while (q != this.state.q) {
			q = this.state.q;
			articles = await feedClient.getArticles({page, q});
		}

		this._articles = this._articles.concat(articles);
		await new Promise(resolve => setTimeout(resolve, 2000));
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this._articles),
			loading: false,
			page
		});
	}

	render() {
		return (
			<View style={{marginTop: Scales.navBarHeight, marginBottom: 50}}>
				<SearchBar
					lightTheme
					onChangeText={this.onValueChange.bind(this)}
					placeholder="作品名、キャラ名など..."
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
		console.log('more?');
		if (this.state.loading) {
			return;
		}
		console.log('more');
		this.loadMore();
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

export default SearchScreen;
