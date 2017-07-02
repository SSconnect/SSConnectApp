// @flow

import React from "react"
import { View, ListView } from "react-native"
import { SearchBar } from "react-native-elements"

import Indicator from "../../components/Indicator"
import TagCell from "../../components/TagCell"

import feedClient from "../../services/FeedClient"
import type { Article, Tag } from "../../types"
import { Scales } from "../../themes/"

type Props = {
	q: string
}

type State = {
	dataSource: any,
	loading: boolean
}

const rowHasChanged = (r1: Article, r2: Article) => r1 !== r2

class TagScreen extends React.PureComponent {
	props: Props
	state: State

	renderFooter: Function
	renderRow: Function

	constructor(props: Props) {
		super((props: Props))
		this.state = {
			dataSource: new ListView.DataSource({ rowHasChanged }).cloneWithRows([]),
			loading: true,
			q: props.q || "",
		}
		this.renderRow = this.renderRow.bind(this)
	}

	componentDidMount() {
		this.init()
	}

	async init() {
		await this.loadTags()
	}

	async loadTags() {
		this.setState({ loading: true })
		const tags = await feedClient.getTags()

		// await new Promise(resolve => setTimeout(resolve, 1000));
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(tags),
			loading: false,
		})
	}

	render() {
		return (
			<View style={{ marginTop: Scales.navBarHeight }}>
				<SearchBar
					lightTheme
					icon={{ name: "videogame-asset" }}
					onSubmitEditing={() => {
						// TODO e.nativeEvent.text
					}}
					placeholder="タグ検索"
				/>
				<ListView
					renderRow={this.renderRow}
					dataSource={this.state.dataSource}
					canLoadMore
					enableEmptySections
					renderFooter={() => <Indicator loading={true} />}
					distanceToLoadMore={100}
				/>
			</View>
		)
	}

	/* eslint class-methods-use-this:0 */
	renderRow(tag: Tag) {
		return <TagCell tag={tag} onClick={() => {}} />
	}
}

export default TagScreen
