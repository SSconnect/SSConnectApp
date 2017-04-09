import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import { Icon } from 'react-native-elements';
import { Scales, IconName } from '../../Themes';

const Types = { search: 0, tag: 1, blog: 2 };

function RowComponent({ sortHandlers, data }: Props) {
	return (
  <TouchableHighlight
    underlayColor={'#eee'}
    delayLongPress={200}
    style={{ padding: 5, backgroundColor: '#F8F8F8', borderBottomWidth: 1, borderColor: '#eee' }}
    {...sortHandlers}
  >
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Icon size={25} name={data.type === Types.tag ? IconName.favTag : IconName.search} />
        <Text style={{ padding: 5 }} ellipsizeMode={'middle'}>{data.value}</Text>
      </View>
      <Icon name={IconName.threeBar} />
    </View>
  </TouchableHighlight>
	);
}

type Props = {
  tabs: Array<object>,
};

class TabList extends React.PureComponent {
	Props: props;
	render() {
		console.log(this.props);
		return (
  <SortableListView
    data={this.props.tabs}
    onRowMoved={(e) => {
	this.props.tabs.splice(e.to, 0, this.props.tabs.splice(e.from, 1)[0]);
	this.forceUpdate();
}}
    renderRow={row => <RowComponent data={row} />}
  />
		);
	}
}

class SideMenu extends React.PureComponent {
	render() {
		const tabs = [
			{
				value: 'モバP',
				type: Types.search,
			},
			{
				value: '幼馴染',
				type: Types.tag,
			},
			{
				value: '杏',
				type: Types.search,
			},
			{
				value: 'ヴィーネ',
				type: Types.tag,
			},
		];

		return (
  <View style={{ flex: 1, paddingTop: Scales.statusBarHeight }}>
    <TabList tabs={tabs} />
  </View>
		);
	}
}
export default SideMenu;
