import React from "react"
import { Text } from "react-native"
import { Icon } from "react-native-elements"
import { Actions } from "react-native-router-flux"

import { connect } from "react-redux"

import { deleteProfile, moveProfile } from "../../reduxs/actions"
import { profileIcon, profileLabel } from "../../types/utils"

import { selectProfiles } from "../../reduxs/selectors"

import { Colors, IconName } from "../../themes/index"
import type { Profile } from "../../types/index"
import { Body, Content, Left, ListItem, Right } from "native-base"

type Props = {
	profiles: Array<Profile>,
	onMoveProfile: (from, to) => {},
	onDeleteProfile: Function
}

class TabList extends React.PureComponent {
	props: Props

	componentWillReceiveProps() {
		this.forceUpdate()
	}

	renderListItem(profile: Profile) {
		const { onDeleteProfile } = this.props
		return (
			<ListItem
				icon
				key={profile.q + profile.tag + profile.blog_id}
				onPress={() => {
					Actions.refresh({ key: "drawer", open: false })
					setTimeout(() => {
						Actions.baseScreen({
							profile,
							title: profileLabel(profile),
						})
					})
				}}
			>
				<Left>
					<Icon
						size={25}
						style={{ marginLeft: 5, marginRight: 5 }}
						name={profileIcon(profile)}
					/>
				</Left>
				<Body>
					<Text style={{ padding: 5 }} ellipsizeMode={"middle"}>
						{profile.q || profile.tag}
					</Text>
				</Body>
				<Right>
					<Icon
						name={IconName.delete}
						onPress={onDeleteProfile}
						color={Colors.red}
					/>
				</Right>
			</ListItem>
		)
	}

	render() {
		const { profiles } = this.props
		if (profiles.length === 0) {
			return (
				<Text style={{ padding: 10 }}>
					検索キーワードや作品タグをブックマークしましょう！
				</Text>
			)
		}
		return (
			<Content>
				{_.map(profiles, this.renderListItem.bind(this))}
			</Content>
		)
	}
}

const mapStateToProps = (state, props) => ({
	profiles: selectProfiles(state, props),
})

const mapDispatchToProps = dispatch => ({
	onMoveProfile: (from, to) => dispatch(moveProfile(from, to)),
	onDeleteProfile: profile => dispatch(deleteProfile(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TabList)
