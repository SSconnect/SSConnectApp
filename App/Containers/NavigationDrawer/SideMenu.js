import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import { Icon } from 'react-native-elements';
import { Scales, IconName } from '../../Themes';

const Types = { search: 0, tag: 1, blog: 2 };
const columns = [
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

const order = columns;

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

class SideMenu extends React.PureComponent {
	render() {
		return (
  <SortableListView
    style={{ flex: 1, paddingTop: Scales.statusBarHeight }}
    data={columns}
    onRowMoved={(e) => {
	order.splice(e.to, 0, order.splice(e.from, 1)[0]);
	this.forceUpdate();
}}
    renderRow={row => <RowComponent data={row} />}
  />
		);
	}
}

export default SideMenu;
