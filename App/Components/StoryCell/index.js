// @flow

import React from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import { connect } from 'react-redux';

import moment from 'moment';

import { addRead } from '../../Containers/App/actions';
import { Colors } from '../../Themes/';
import type { Story } from '../../Types';

type Props = {
	story: Story,
	onAddRead: Story => {},
};

class StoryCell extends React.PureComponent {
	props: Props;

	render() {
		const { story, onAddRead } = this.props;

		moment.updateLocale('ja');
		const timestamp = moment.utc(story.first_posted_at);
		return (
			<TouchableOpacity
				onPress={() => {
					onAddRead(story);
					const url = story.articles[0].url;
					Linking.openURL(url);
				}}
			>
				<View style={{ padding: 10 }}>
					<View
						style={{
							marginBottom: 5,
							flex: 2,
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Text style={{ color: Colors.disable }}>{story.articles[0].blog.title}</Text>
						<Text>{timestamp.fromNow()}</Text>
					</View>
					<Text style={{ fontSize: 20 }}>{story.title}</Text>
					<Text style={{ marginTop: 5 }}>{story.tag_list.join(',')}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	onAddRead: story => dispatch(addRead(story)),
});

export default connect(null, mapDispatchToProps)(StoryCell);
