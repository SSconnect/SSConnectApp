// @flow

import React from 'react'
import 'react-native'
import { connect } from 'react-redux'
import { Tabs, Tab, Icon } from 'react-native-elements'
import _ from 'lodash'

import BaseScreen from '../Base'

import type { Profile } from '../../types'

import { selectProfiles } from '../../reduxs/selectors'
import { profileSerialKey, profileLabel, profileIcon } from '../../types/utils'

type Props = {
	profiles: Array<Profile>
}

type State = {
	selectedTab: string
}

class MainScreen extends React.PureComponent {
	props: Props
	state: State = { selectedTab: profileSerialKey({}) }

	componentDidMount() {}

	componentWillReceiveProps() {
		this.forceUpdate()
	}

	renderTab(profile: Profile) {
		const { selectedTab } = this.state
		const key = profileSerialKey(profile)
		const selected = selectedTab === key

		const iconProps = {
			containerStyle: {
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 0,
			},
			name: profileIcon(profile),
			size: 24,
		}
		return (
			<Tab
				key={key}
				selected={selected}
				style={{
					padding: 5,
				}}
				title={profileLabel(profile)}
				titleStyle={{
					margin: 0,
					marginBottom: 5,
				}}
				renderIcon={() => <Icon {...iconProps} />}
				renderSelectedIcon={() => <Icon color={'#6296f9'} {...iconProps} />}
				onPress={() => this.setState({ selectedTab: key })}
			>
				<BaseScreen profile={profile} />
			</Tab>
		)
	}

	render() {
		const { profiles } = this.props
		const tabs = _.map(profiles, profile => this.renderTab(profile))

		return (
			<Tabs>
				{this.renderTab({ q: '', tag: '' })}
				{tabs}
			</Tabs>
		)
	}
}

const mapStateToProps = (state, props) => ({
	profiles: selectProfiles(state, props),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
