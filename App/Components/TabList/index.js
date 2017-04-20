import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { moveProfile, deleteProfile } from '../../Containers/App/actions';

import { Colors, IconName } from '../../Themes';
import type { TabProfile } from '../../Types';

function RowComponent({ sortHandlers, data, isEdit, onDelete }: any) {
	const moveIcon = () => {
		if (!isEdit) {
			return null;
		}
		return <Icon name={IconName.threeBar} />;
	};
	const deleteIcon = () => {
		if (!isEdit) {
			return null;
		}
		return <Icon name={IconName.delete} onPress={onDelete} color={Colors.red} />;
	};
	return (
		<TouchableOpacity
			underlayColor={'#eee'}
			delayLongPress={200}
			style={{ padding: 10, backgroundColor: '#F8F8F8', borderBottomWidth: 1, borderColor: '#eee' }}
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
				{moveIcon()}
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<Icon size={25} name={data.type === 'tag' ? IconName.favTag : IconName.search} />
					<Text style={{ padding: 5 }} ellipsizeMode={'middle'}>{data.value}</Text>
				</View>
				{deleteIcon()}
			</View>
		</TouchableOpacity>
	);
}

type Props = {
	tabs: Array<TabProfile>,
	onMoveProfile: (from, to) => {},
	onDeleteProfile: Function,
	isEdit: boolean,
};

class TabList extends React.PureComponent {
	props: Props;

	render() {
		const { tabs, isEdit, onMoveProfile, onDeleteProfile } = this.props;
		return (
			<SortableListView
				data={tabs}
				onRowMoved={(e) => {
					onMoveProfile(e.from, e.to);
				}}
				disableSorting={!isEdit}
				renderRow={row => (
					<RowComponent
						data={row}
						isEdit={isEdit}
						onDelete={() => {
							onDeleteProfile(row);
						}}
					/>
				)}
			/>
		);
	}
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
	onMoveProfile: (from, to) => dispatch(moveProfile(from, to)),
	onDeleteProfile: profile => dispatch(deleteProfile(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabList);
