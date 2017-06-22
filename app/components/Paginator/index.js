// @flow

import React from "react"
import { Slider } from "react-native-elements"
import {
	Content,
	Row,
	Left,
	Right,
	Body,
	Button,
	Icon,
	Text,
} from "native-base"

import type { PageInfo } from "../../types"

type Props = {
	pageInfo: PageInfo,
	onComplete: Function,
	onPressNext: Function,
	onPressPrev: Function
}

type State = {
	previewPage: number
}

class Paginator extends React.PureComponent {
	props: Props
	state: State = {
		previewPage: this.props.pageInfo.page,
	}

	render() {
		const { pageInfo, onComplete, onPressNext, onPressPrev } = this.props
		return (
			<Content style={{ margin: 10 }}>
				<Row>
					<Left>
						<Button iconLeft light onPress={onPressPrev}>
							<Icon name="arrow-back" />
							<Text>Back</Text>
						</Button>
					</Left>
					<Body>
						<Text
							style={{
								flex: 1,
								textAlign: "center",
								paddingTop: 12,
							}}
						>
							{this.state.previewPage}/{pageInfo.total}
						</Text>
					</Body>
					<Right>
						<Button iconRight light onPress={onPressNext}>
							<Text>Next</Text>
							<Icon name="arrow-forward" />
						</Button>
					</Right>
				</Row>
				<Row>
					<Slider
						value={pageInfo.page}
						style={{ flex: 1 }}
						step={1}
						thumbTintColor="#333"
						maximumValue={pageInfo.total}
						minimumValue={1}
						onSlidingComplete={onComplete}
						onValueChange={value => {
							this.setState({ previewPage: value })
						}}
					/>
				</Row>
			</Content>
		)
	}
}

export default Paginator
