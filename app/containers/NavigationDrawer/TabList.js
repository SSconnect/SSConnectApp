import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { moveProfile, deleteProfile } from '../../reduxs/actions';

import { Colors, IconName } from '../../themes/index';
import type { Profile } from '../../types/index';

function RowComponent({ sortHandlers, data, onDelete }: any) {
	let iconName = IconName.threeBar;
	if (data.tag && data.q) {
		iconName = IconName.favTag;
	} else {
		iconName = data.tag ? IconName.tag : IconName.search;
	}

	return (
		<TouchableOpacity
			underlayColor={'#eee'}
			delayLongPress={200}
			style={{ padding: 10, backgroundColor: '#F8F8F8', borderBottomWidth: 1, borderColor: '#eee' }}
			onPress={() => {
				Actions.refresh({ key: 'drawer', open: false });
				setTimeout(() => {
					let title = '';
					if (data.tag && data.q) {
						title = `${data.tag}|${data.q}`;
					} else {
						title = data.tag || data.q;
					}
					Actions.baseScreen({
						profile: data,
						title,
					});
				});
			}}
			{...sortHandlers}
		>
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
				<Icon name={IconName.threeBar} />
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<Icon size={25} name={iconName} />
					<Text style={{ padding: 5 }} ellipsizeMode={'middle'}>{data.q || data.tag}</Text>
				</View>
				<Icon name={IconName.delete} onPress={onDelete} color={Colors.red} />
			</View>
		</TouchableOpacity>
	);
}

type Props = {
	profiles: Array<Profile>,
	onMoveProfile: (from, to) => {},
	onDeleteProfile: Function,
};

class TabList extends React.PureComponent {
	props: Props;

	componentWillReceiveProps() {
		this.forceUpdate();
	}

	render() {
		const { profiles, onMoveProfile, onDeleteProfile } = this.props;
		return (
			<SortableListView
				data={profiles}
				onRowMoved={(e) => {
					onMoveProfile(e.from, e.to);
				}}
				renderRow={row => (
					<RowComponent
						data={row}
						onDelete={() => {
							onDeleteProfile(row);
						}}
					/>
				)}
			/>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
	onMoveProfile: (from, to) => dispatch(moveProfile(from, to)),
	onDeleteProfile: profile => dispatch(deleteProfile(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabList);
