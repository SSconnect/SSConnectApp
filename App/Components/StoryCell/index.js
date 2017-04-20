// @flow

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import moment from 'moment';

import { Colors } from '../../Themes/';
import type { Story } from '../../Types';

type Props = {
	story: Story,
	onPress: Function,
};

function StoryCell({ story, onPress }: Props) {
	moment.updateLocale('ja');
	const timestamp = moment.utc(story.first_posted_at);
	return (
		<TouchableOpacity onPress={onPress}>
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

export default StoryCell;
