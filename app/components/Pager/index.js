// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Slider } from 'react-native-elements';

import { IconName } from '../../themes/';
import PagingButton from '../../components/PagingButton';

type Props = {
	page: number,
	onChange: Function,
	onComplete: Function,
};

class Pager extends React.PureComponent {
	props: Props;
	static defaultProps: Props = {
		page: 1,
		onChange: () => {},
		onComplete: () => {},
	};

	render() {
		const { page, onChange, onComplete } = this.props;
		return (
			<View style={{ flexDirection: 'row' }}>
				<PagingButton
					icon={{ name: IconName.prev }}
					onPress={() => {
						Actions.refresh({ page: page - 1 });
					}}
				/>
				<Text
					style={{
						flex: 1,
						textAlign: 'center',
						paddingTop: 12,
					}}
				>
					{page}
				</Text>
				<Slider
					value={page}
					style={{ flex: 4 }}
					step={1}
					thumbTintColor="#333"
					maximumValue={100}
					minimumValue={1}
					onValueChange={onChange}
					onSlidingComplete={onComplete}
				/>
				<PagingButton
					icon={{ name: IconName.next }}
					onPress={() => {
						Actions.refresh({ page: page + 1 });
					}}
				/>
			</View>
		);
	}
}

export default Pager;
