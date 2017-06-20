// @flow

import React from "react"
import { Linking, Text, TouchableOpacity, View } from "react-native"
import { connect } from "react-redux"
import { Actions } from "react-native-router-flux"

import moment from "moment"

import { makeSelectReaded, selectConfig } from "../../reduxs/selectors"
import { addRead } from "../../reduxs/actions"
import { Colors } from "../../themes/"
import type { Config, Story } from "../../types"

class StoryCell extends React.PureComponent {
	props: {
		story: Story,
		onAddRead: Function,
		readed: boolean,
		config: Config
	}

	render() {
		const { story, onAddRead, readed } = this.props
		moment.updateLocale("ja")
		const timestamp = moment.utc(story.first_posted_at)
		const color = readed ? Colors.disable : Colors.black
		return (
			<TouchableOpacity
				onPress={() => {
					onAddRead(story)
					const uri = story.articles[0].url
					if (this.props.config.inappbrowse) {
						Actions.webScreen({
							title: story.title,
							uri,
							direction: "vertical",
						})
					} else {
						Linking.openURL(uri)
					}
				}}
			>
				<View style={{ padding: 10 }}>
					<View
						style={{
							marginBottom: 5,
							flex: 2,
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text style={{ color: Colors.disable }}>
							{story.articles[0].blog.title}
						</Text>
						<Text style={{ color }}>{timestamp.fromNow()}</Text>
					</View>
					<Text style={{ fontSize: 20, color }}>{story.title}</Text>
					<Text style={{ marginTop: 5, color }}>
						{story.tag_list.join(",")}
					</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

const makeMapStateToProps = () => {
	const selectReaded = makeSelectReaded()
	return (state, props) => ({
		config: selectConfig(state, props),
		readed: selectReaded(state, props),
	})
}

const mapDispatchToProps = dispatch => ({
	onAddRead: story => dispatch(addRead(story)),
})

export default connect(makeMapStateToProps, mapDispatchToProps)(StoryCell)
