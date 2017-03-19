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
import TagCell from '../../Components/TagCell';

import feedClient from '../../Services/FeedClient';
import type {Article, Story, Tag} from '../../Types';
import {Colors, Scales} from '../../Themes/';

type Props = {
  q: string
}

type State = {
  dataSource: any,
  q: string,
  loading: boolean,
}

const rowHasChanged = (r1: Article, r2: Article) => r1 !== r2;

class TagScreen extends PureComponent {
	props: Props
	state: State

	constructor(props: Props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({rowHasChanged}).cloneWithRows([]),
			loading: true,
			q: props.q || ''
		};
	}

	componentDidMount() {
		this.init();
	}

	async init() {
		await this.loadTags();
	}

	renderRow(tag: Tag) {
		return (
			<TagCell
				tag={tag}
				/>
		);
	}

	async loadTags() {
		this.setState({loading: true});
		const tags = await feedClient.getTags();

		// await new Promise(resolve => setTimeout(resolve, 1000));
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(tags),
			loading: false
		});
	}

	render() {
		return (
			<View style={{marginTop: Scales.navBarHeight, marginBottom: 50}}>
				<SearchBar
					lightTheme
					icon={{name: 'videogame-asset'}}
					onSubmitEditing={e => {
						Actions.homeScreen({
							q: e.nativeEvent.text,
							isTag: true
						});
					}}
					placeholder="タグ検索"
					/>
				<ListView
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

	renderFooter() {
		return (<Indicator loading={this.state.dataSource.rowCount == 0}/>);
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

export default TagScreen;
