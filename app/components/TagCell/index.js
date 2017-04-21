// @flow

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

import { Colors } from '../../themes/';
import type { Tag } from '../../types';

type Props = {
	tag: Tag,
};

function TagCell({ tag }: Props) {
	moment.updateLocale('ja');
	return (
		<TouchableOpacity
			onPress={() => {
				Actions.baseScreen({
					profile: { type: 'tag', value: tag.name },
					title: `タグ: ${tag.name}`,
				});
			}}
		>
			<View style={{ padding: 10, paddingVertical: 20, flex: 2, flexDirection: 'row' }}>
				<Icon
					containerStyle={{
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 5,
					}}
					color={Colors.black}
					name="local-offer"
					size={20}
				/>
				<Text style={{ fontSize: 24, paddingLeft: 5 }}>{`${tag.name}(${tag.count})`}</Text>
			</View>
		</TouchableOpacity>
	);
}

export default TagCell;
