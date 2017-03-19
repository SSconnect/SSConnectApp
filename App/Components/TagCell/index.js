// @flow

import React from 'react';
import {View, TouchableOpacity, Text, Linking} from 'react-native';
import Spinner from 'react-native-spinkit';
import moment from 'moment';
import {Actions, ActionConst} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';

import {Colors} from '../../Themes/';

import realm from '../../Models/RealmModel';

import type {Tag} from '../../Types';

const Styles = {
};

type Props = {
	tag: Tag
}

function TagCell({tag}: Props) {
	moment.updateLocale('ja');
	return (
		<TouchableOpacity
			onPress={() => {
				Actions.homeScreen({
					q: tag.name,
					isTag: true
				});
			}}
			>
			<View style={{padding: 10, paddingVertical: 20, flex: 2, flexDirection: 'row'}}>
				<Icon
					containerStyle={{
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 5
					}}
					color={Colors.black}
					name="local-offer"
					size={20}
					/>
				<Text style={{fontSize: 24, paddingLeft: 5}}>{`${tag.name}(${tag.count})`}</Text>
			</View>
		</TouchableOpacity>
	);
}

export default TagCell;
