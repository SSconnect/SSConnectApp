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

import Indicator from '../../Components/Indicator';
import ArticleCell from '../../Components/ArticleCell';

import feedClient from '../../Services/FeedClient';
import type {Article} from '../../Services/FeedClient';
import {Colors, Scales} from '../../Themes/';

type Props = {

}

type State = {
  dataSource: any,
  blogID: number,
  page: number,
  loading: boolean,
  blogs: Array<any>
}

const rowHasChanged = (r1: Article, r2: Article) => true;

class BlogScreen extends PureComponent {
	props: Props
	state: State = {
		dataSource: new ListView.DataSource({rowHasChanged}).cloneWithRows([]),
		loading: true,
		blogID: 0,
		page: 0,
		blogs: []
	}

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

	async onValueChange(blogID: number) {
		console.log(blogID);
		await this.setState({blogID});
		await this.loadMore(true);
	}

	async loadMore(reset = false) {
		console.log(this.state.blogID);
		if (this.state.blogID == 0) {
			return;
		}
		if (reset) {
			this._articles = [];
			this.setState({
				page: 0,
				dataSource: this.state.dataSource.cloneWithRows([])
			});
		}
		this.setState({loading: true});
		const page = this.state.page + 1;
		const articles = await feedClient.getArticles(page, this.state.blogID);

		this._articles = this._articles.concat(articles);
		await new Promise(resolve => setTimeout(resolve, 2000));
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this._articles),
			loading: false,
			page
		});
	}

	render() {
		const items = [(<Picker.Item key={0} label="---" value={0}/>)];
		this.state.blogs.forEach(e => {
			items.push((
				<Picker.Item key={e.id} label={e.title} value={e.id}/>
      ));
		});
		return (
			<View style={{marginTop: Scales.navBarHeight, marginBottom: 50}}>
				<View style={styles.pickerBox} >
					<Picker
						onValueChange={this.onValueChange.bind(this)}
						selectedValue={this.state.blogID}
						mode="dropdown"
						>{items}</Picker>
				</View>
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

export default BlogScreen;
