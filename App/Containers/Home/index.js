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
	_articles: Array<Article>

	constructor(props: Props) {
		super(props);
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

	async init() {
		this.resetList();
		await this.loadArticles();
	}

	renderRow(article: Article) {
		return (
			<ArticleCell
				article={article}
				/>
		);
	}

	async resetList() {
		this._articles = [];
		this.setState({
			page: 0,
			dataSource: this.state.dataSource.cloneWithRows([])
		});
	}

	async loadArticles() {
		const page = this.state.page + 1;
		this.setState({loading: true});
		let articles = [];
		let q = null;
    // q が非同期で更新されていないか常にチェック
		while (q != this.state.q) {
			q = this.state.q;
			articles = await feedClient.getArticles({page, q});
			console.log('articles', articles);
		}

		this._articles = this._articles.concat(articles);
		// await new Promise(resolve => setTimeout(resolve, 1000));
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

	async onValueChange(q: string) {
		console.log(q);
		await this.setState({q});
		if (this.state.loading) {
			return;
		}
		this.resetList();
		await this.loadArticles();
	}

	async loadMoreContentAsync() {
		console.log('more?');
		if (this.state.loading) {
			return;
		}
		console.log('more');
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
