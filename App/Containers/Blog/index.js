/* @flow */

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Picker,
  Linking,
  ListView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {List, ListItem} from 'react-native-elements';

import feedClient from '../../Services/FeedClient';
import type {Article} from '../../Services/FeedClient';
import realm from '../../Models/RealmModel';

type Props = {

}

type State = {
  dataSource: any,
  blogID: number,
  blogs: Array<any>
}

const rowHasChanged = (r1: Article, r2: Article) => true;

class BlogScreen extends PureComponent {
	props: Props
	state: State = {
		dataSource: new ListView.DataSource({rowHasChanged}).cloneWithRows([]),
		blogID: 0,
		blogs: []
	}

	componentDidMount() {
		this.init();
	}

	async init() {
		const blogs = await feedClient.getBlogs();
		console.log('blogs', blogs);
		this.setState({blogs});
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
				<ListItem
					key={sectionID}
					title={
						<View>
							<Text style={false ? styles.readed : null} >{article.title}</Text>
						</View>
          }
					subtitle={article.blog.title}
					/>
			</TouchableOpacity>
		);
	}

	async onValueChange(blogID: number) {
		console.log(blogID);
		await this.setState({blogID});
		await this.loadArticles();
	}

	async loadArticles() {
		console.log(this.state.blogID);
		if (this.state.blogID == 0) {
			return;
		}
		const articles = await feedClient.getArticles(0, this.state.blogID);
		console.log('articles', articles);
		console.log(articles.length);
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(articles)
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
			<View style={{marginTop: 40, marginBottom: 50}}>
				<Picker
					style={styles.picker}
					onValueChange={this.onValueChange.bind(this)}
					selectedValue={this.state.blogID}
					mode="dropdown"
					>{items}</Picker>
				<List>
					<ListView
						renderRow={this.renderRow}
						dataSource={this.state.dataSource}
						enableEmptySections
						/>
				</List>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	readed: {
		color: 'gray'
	},
	picker: {
	}
});

export default BlogScreen;
