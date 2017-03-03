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
import type {Feed} from '../Services/FeedClient';
import {List, ListItem} from 'react-native-elements';
import realm from '../Models/RealmModel';

type Props = {

}

type State = {
  dataSource: any
}
const rowHasChanged = (r1: Feed, r2: Feed) => r1.title + r1.blogname !== r2.title + r2.blogname;

class HomeScreen extends PureComponent {
	props: Props
	state: State = {
		dataSource: new ListView.DataSource({rowHasChanged}).cloneWithRows([])
	}

	componentDidMount() {
		this.init();
	}

	async init() {
		const feeds = await feedClient.fetchFeed();
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(feeds)
		});
	}

	renderRow(feed: Feed, sectionID: number) {
		return (
			<TouchableOpacity
				onPress={() => {
					realm.write(() => {
						realm.create('Read', {
							url: feed.link
						});
					});
					Linking.openURL(feed.link);
					feed.read = true;
				}}
				>
				<ListItem
					key={sectionID}
					title={
						<View>
							<Text style={feed.readed ? styles.readed : null} >{feed.title}</Text>
						</View>
          }
					subtitle={feed.blogname}
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
