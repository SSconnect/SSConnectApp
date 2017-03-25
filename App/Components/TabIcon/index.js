// @flow

import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '../../Themes';

const styles = StyleSheet.create({
    tabText: {
        color: 'black'
    },
    tabTextActive: {
        color: 'gray'
    }
});

type Props = {
    iconName: string,
    selected: boolean,
    tabTitle: string
}

const TabIcon = ({iconName, selected, tabTitle}: Props) => (
    <View>
        <Icon
            containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5
            }}
            color={selected ? Colors.black : Colors.passive}
            name={iconName}
            size={25}
        />
        <Text style={{color: selected ? Colors.black : Colors.passive}}>{tabTitle}</Text>
    </View>
);

export default TabIcon;
