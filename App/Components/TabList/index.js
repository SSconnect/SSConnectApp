import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { moveProfile } from '../../Containers/App/actions';

import { IconName } from '../../Themes';
import type { TabProfile } from '../../Types';

function RowComponent({ sortHandlers, data }: any) {
	return (
		<TouchableOpacity
			underlayColor={'#eee'}
			delayLongPress={200}
			style={{ padding: 5, backgroundColor: '#F8F8F8', borderBottomWidth: 1, borderColor: '#eee' }}
			onPress={() => {
				Actions.refresh({ key: 'drawer', open: false });
				setTimeout(() =>
					Actions.baseScreen({
						profile: data,
						title: `${data.type === 'tag' ? 'タグ' : '検索'}: ${data.value}`,
					}),
				);
			}}
			{...sortHandlers}
		>
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<Icon size={25} name={data.type === 'tag' ? IconName.favTag : IconName.search} />
					<Text style={{ padding: 5 }} ellipsizeMode={'middle'}>{data.value}</Text>
				</View>
				<Icon name={IconName.threeBar} />
			</View>
		</TouchableOpacity>
	);
}

type Props = {
	tabs: Array<TabProfile>,
	moveProfile: (from, to) => {},
};

class TabList extends React.PureComponent {
	props: Props;

	render() {
		return (
			<SortableListView
				data={this.props.tabs}
				onRowMoved={(e) => {
					this.props.moveProfile(e.from, e.to);
				}}
				renderRow={row => <RowComponent data={row} />}
			/>
		);
	}
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
	moveProfile: (from, to) => dispatch(moveProfile(from, to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabList);
