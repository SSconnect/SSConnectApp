import React from "react"
import { Linking } from "react-native"
import { connect } from "react-redux"
import {
	Body,
	Left,
	CheckBox,
	Container,
	Content,
	ListItem,
	Text,
	Right,
	Switch,
} from "native-base"
import { Icon } from "react-native-elements"
import { Actions } from "react-native-router-flux"

import TabList from "./TabList"
import { selectConfig } from "../../reduxs/selectors"
import { toggleConfigIAB } from "../../reduxs/actions"

import { IconName, Scales } from "../../themes"
import { Config } from "../../types"

type Props = {
	config: Config,
	onToggleConfigIAB: Function
}

class SideMenu extends React.Component {
	props: Props

	componentWillReceiveProps() {
		this.forceUpdate()
	}

	render() {
		const { config, onToggleConfigIAB } = this.props
		return (
			<Container>
				<Content
					style={{
						flex: 1,
						paddingTop: Scales.statusBarHeight,
						paddingBottom: 10,
					}}
				>
					<ListItem itemDivider>
						<Text>お気に入り</Text>
					</ListItem>
					<TabList />

					<ListItem itemDivider>
						<Text>設定</Text>
					</ListItem>
					<ListItem icon>
						<Left>
							<Icon type="font-awesome" name="share-square-o" />
						</Left>
						<Body>
							<Text>アプリブラウザで開く</Text>
						</Body>
						<Right>
							<Switch
								onValueChange={onToggleConfigIAB}
								value={config.inappbrowse}
							/>
						</Right>
					</ListItem>

					<ListItem
						icon
						onPress={() => {
							Actions.refresh({ key: "drawer", open: false })
							setTimeout(() => Actions.tagsScreen())
						}}
					>
						<Left>
							<Icon name={IconName.tag} />
						</Left>
						<Body>
							<Text>作品タグ一覧</Text>
						</Body>
						<Right>
							<Icon name="arrow-forward" />
						</Right>
					</ListItem>

					<ListItem
						icon
						onPress={() => {
							Linking.openURL("https://sites.google.com/view/ssconnect/サポート")
						}}
					>
						<Left>
							<Icon name={IconName.send} />
						</Left>
						<Body>
							<Text>開発者・リクエスト</Text>
						</Body>
					</ListItem>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = (state, props) => ({
	config: selectConfig(state, props),
})

const mapDispatchToProps = dispatch => ({
	onToggleConfigIAB: () => dispatch(toggleConfigIAB()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
