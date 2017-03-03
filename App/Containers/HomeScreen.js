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
import feedClient from '../Services/FeedClient';
import type {Article} from '../Services/FeedClient';
import {List, ListItem} from 'react-native-elements';
import realm from '../Models/RealmModel';

type Props = {

}

type State = {
  dataSource: any
}
const rowHasChanged = (r1: Article, r2: Article) => r1 == r2;

class HomeScreen extends PureComponent {
	props: Props
	state: State = {
		dataSource: new ListView.DataSource({rowHasChanged}).cloneWithRows([])
	}

	componentDidMount() {
		this.init();
	}

	async init() {
		const articles = await feedClient.getArticles();
		console.log(articles);
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(articles)
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

	render() {
		return (
			<List>
				<ListView
					renderRow={this.renderRow}
					dataSource={this.state.dataSource}
					enableEmptySections
					/>
			</List>
		);
	}
}

const styles = StyleSheet.create({
	readed: {
		color: 'gray'
	}
});

export default HomeScreen;
