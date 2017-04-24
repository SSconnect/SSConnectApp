// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { Slider } from 'react-native-elements';

import { IconName } from '../../themes/';
import PagingButton from '../../components/PagingButton';
import type { PageInfo } from '../../types';

type Props = {
	pageInfo: PageInfo,
	onComplete: Function,
	onPressNext: Function,
	onPressPrev: Function,
};

type State = {
	previewPage: number,
};

class Paginator extends React.PureComponent {
	props: Props;
	state: State = {
		previewPage: this.props.pageInfo.page,
	};

	render() {
		const { pageInfo, onComplete, onPressNext, onPressPrev } = this.props;
		return (
			<View style={{ flexDirection: 'row' }}>
				<PagingButton
					icon={{ name: IconName.prev }}
					onPress={onPressPrev}
					disabled={!pageInfo.prev}
				/>
				<Text
					style={{
						flex: 1,
						textAlign: 'center',
						paddingTop: 12,
					}}
				>
					{this.state.previewPage}/{pageInfo.total}
				</Text>
				<Slider
					value={pageInfo.page}
					style={{ flex: 4 }}
					step={1}
					thumbTintColor="#333"
					maximumValue={pageInfo.total}
					minimumValue={1}
					onSlidingComplete={onComplete}
					onValueChange={(value) => {
						this.setState({ previewPage: value });
					}}
				/>
				<PagingButton
					icon={{ name: IconName.next }}
					onPress={onPressNext}
					disabled={!pageInfo.next}
				/>
			</View>
		);
	}
}

export default Paginator;
