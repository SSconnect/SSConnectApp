import React from 'react'
import { View, Linking } from 'react-native'
import { connect } from 'react-redux'
import { List, ListItem, CheckBox } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import TabList from './TabList'
import { selectConfig } from '../../reduxs/selectors'
import { toggleConfigIAB } from '../../reduxs/actions'

import { Scales, IconName } from '../../themes'
import { Config } from '../../types'

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
			<View style={{ flex: 1, paddingTop: Scales.statusBarHeight, paddingBottom: 10 }}>
				<TabList />
				<CheckBox center title="アプリで開く" checked={config.inappbrowse} onPress={onToggleConfigIAB} />
				<List>
					<ListItem
						title="タグ一覧"
						leftIcon={{ name: IconName.tag }}
						onPress={() => {
							Actions.refresh({ key: 'drawer', open: false })
							setTimeout(() => Actions.tagsScreen())
						}}
					/>
					<ListItem
						title="開発者・リクエスト"
						leftIcon={{ name: IconName.send }}
						onPress={() => {
							Linking.openURL('https://sites.google.com/view/ssconnect/サポート')
						}}
					/>
				</List>
			</View>
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
