// @flow

import React from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import moment from 'moment';

import { Colors } from '../../Themes/';

import realm from '../../Models/RealmModel';

import type { Story } from '../../Types';

type Props = {
  story: Story,
};

function StoryCell({ story }: Props) {
	moment.updateLocale('ja');
	const timestamp = moment.utc(story.first_posted_at);
	return (
  <TouchableOpacity
    onPress={() => {
	const url = story.articles[0].url;
	realm.write(() => {
		realm.create('Read', { url });
	});
	Linking.openURL(url);
        // story.read = true;
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

export default StoryCell;
