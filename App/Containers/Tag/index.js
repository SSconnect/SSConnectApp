// @flow

import React, { PureComponent } from 'react';
import { View, ListView } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

import Indicator from '../../Components/Indicator';
import TagCell from '../../Components/TagCell';

import feedClient from '../../Services/FeedClient';
import type { Article, Tag } from '../../Types';
import { Scales } from '../../Themes/';
import realm from '../../Models/RealmModel';

type Props = {
	q: string,
};

type State = {
	dataSource: any,
	loading: boolean,
};

const rowHasChanged = (r1: Article, r2: Article) => r1 !== r2;

class TagScreen extends PureComponent {
	props: Props;
	state: State;

	renderFooter: Function;
	renderRow: Function;

	constructor(props: Props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({ rowHasChanged }).cloneWithRows([]),
			loading: true,
			q: props.q || '',
		};
		this.renderFooter = this.renderFooter.bind(this);
		this.renderRow = this.renderRow.bind(this);
	}

	componentDidMount() {
		this.init();
	}

	async init() {
		await this.loadTags();
	}

	async loadTags() {
		this.setState({ loading: true });
		const tags = await feedClient.getTags();

		// await new Promise(resolve => setTimeout(resolve, 1000));
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(tags),
			loading: false,
		});
	}

	render() {
		return (
			<View style={{ marginTop: Scales.navBarHeight, marginBottom: 50 }}>
				<SearchBar
					lightTheme
					icon={{ name: 'videogame-asset' }}
					onSubmitEditing={(e) => {
						Actions.baseScreen({
							profile: { type: 'tag', value: e.nativeEvent.text },
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
					renderFooter={this.renderFooter}
				/>
			</View>
		);
	}

	renderFooter() {
		return <Indicator loading={this.state.dataSource.rowCount === 0} />;
	}

	/* eslint class-methods-use-this:0 */
	renderRow(tag: Tag) {
		return <TagCell tag={tag} />;
	}
}

export default TagScreen;
