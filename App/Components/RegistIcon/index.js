// @flow

import React from 'react';

import { Icon } from 'react-native-elements';
import type { TabProfile } from '../../Types';
import realm from '../../Models/RealmModel';

type Props = {
  profile: TabProfile,
};

function RegistIcon({ profile }: Props) {
	return (
  <Icon
    name="add"
    onPress={() => {
	realm.write(() => {
		realm.create('TabProfile', profile);
	});
}}
  />
	);
}

export default RegistIcon;
