import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import { Icon } from 'react-native-elements';

import { Scales, IconName } from '../../Themes';
import realm from '../../Models/RealmModel';
import type { TabProfile } from '../../Types';

function RowComponent({ sortHandlers, data }: any) {
	return (
		<TouchableHighlight
			underlayColor={'#eee'}
			delayLongPress={200}
			style={{ padding: 5, backgroundColor: '#F8F8F8', borderBottomWidth: 1, borderColor: '#eee' }}
			{...sortHandlers}
		>
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<Icon size={25} name={data.type === 'tag' ? IconName.favTag : IconName.search} />
					<Text style={{ padding: 5 }} ellipsizeMode={'middle'}>{data.value}</Text>
				</View>
				<Icon name={IconName.threeBar} />
			</View>
		</TouchableHighlight>
	);
}

type Props = {
	tabs: Array<TabProfile>,
};

class TabList extends React.PureComponent {
	props: Props;
	render() {
		return (
			<SortableListView
				data={this.props.tabs}
				onRowMoved={(e) => {
					console.log('e', e);
					this.props.tabs.splice(e.to, 0, this.props.tabs.splice(e.from, 1)[0]);
					this.forceUpdate();
				}}
				renderRow={row => <RowComponent data={row} />}
			/>
		);
	}
}

function SideMenu() {
	const tabProfiles = realm.getTabProfiles();

	return (
		<View style={{ flex: 1, paddingTop: Scales.statusBarHeight }}>
			<TabList tabs={tabProfiles} />
		</View>
	);
}
export default SideMenu;
