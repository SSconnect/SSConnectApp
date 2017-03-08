/* @flow */

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Linking,
  ListView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import Indicator from '../../Components/Indicator';

import feedClient from '../../Services/FeedClient';
import type {Article} from '../../Services/FeedClient';
import realm from '../../Models/RealmModel';
import {Colors, Scales} from '../../Themes/';

type Props = {
}

type State = {
  dataSource: any,
  loading: boolean,
  page: number,
}

const rowHasChanged = (r1: Article, r2: Article) => r1 == r2;

class HomeScreen extends PureComponent {
	props: Props
	state: State = {
		dataSource: new ListView.DataSource({rowHasChanged}).cloneWithRows([]),
		loading: true,
		page: 0
	}

	componentDidMount() {
		this.init();
	}

	async init() {
		const articles = await feedClient.getArticles();
		this._articles = articles;
		console.log(articles);
		await new Promise(resolve => setTimeout(resolve, 2000));
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(articles),
			loading: false,
			page: this.state.page + 1
		});
	}

	async loadMore() {
		const nextPage = this.state.page + 1;
		const articles = await feedClient.getArticles(nextPage);
		console.log(nextPage, articles);
		this._articles = this._articles.concat(articles);
		await new Promise(resolve => setTimeout(resolve, 2000));
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this._articles),
			loading: false,
			page: nextPage
		});
	}

	renderRow(article: Article, sectionID: number) {
		return (
			<TouchableOpacity
				onPress={() => {
					realm.write(() => {
						realm.create('Read', {
							url: article.url
						});
					});
					Linking.openURL(article.url);
					// article.read = true;
				}}
				>
				<View style={{padding: 10}}>
					<Text>{article.blog.title}</Text>
					<Text style={{fontSize: 20}}>{article.title}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={{marginTop: Scales.navBarHeight, marginBottom: 50}}>
				<ListView
					renderScrollComponent={props => <InfiniteScrollView {...props}/>}
					onLoadMoreAsync={this.loadMoreContentAsync.bind(this)}
					renderRow={this.renderRow}
					dataSource={this.state.dataSource}
					canLoadMore
					enableEmptySections
					distanceToLoadMore={0}
					renderFooter={this.renderFooter.bind(this)}
					/>
			</View>
		);
	}

	async loadMoreContentAsync() {
		if (this.state.loading) {
			return;
		}
		console.log('more');
		this.setState({loading: true});
		await this.loadMore();
		this.setState({loading: false});
	}

	renderFooter() {
		return (<Indicator loading={this.state.loading}/>);
	}
}

const styles = StyleSheet.create({
	readed: {
		color: 'gray'
	}
});

export default HomeScreen;
