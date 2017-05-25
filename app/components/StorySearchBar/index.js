// @flow

import React from 'react'
import { Actions } from 'react-native-router-flux'
import { SearchBar } from 'react-native-elements'

import { IconName } from '../../themes/'
import type { Profile } from '../../types'

type Props = {
	profile: Profile
}

class StorySearchBar extends React.PureComponent {
	props: Props

	render() {
		const { profile } = this.props
		if (profile.tag) {
			return (
				<SearchBar
					lightTheme
					icon={{ name: IconName.tag }}
					onSubmitEditing={(e) => {
						const text = e.nativeEvent.text
						Actions.baseScreen({
							profile: { ...profile, q: text },
							title: `${profile.tag}: ${text}`,
						})
					}}
					placeholder={`"${profile.tag}"タグでタイトル検索`}
				/>
			)
		}
		return (
			<SearchBar
				lightTheme
				icon={{ name: IconName.search }}
				onSubmitEditing={(e) => {
					const text = e.nativeEvent.text
					Actions.baseScreen({
						profile: { ...profile, q: text },
						title: `タイトル検索: ${text}`,
					})
				}}
				placeholder={'タイトル検索'}
			/>
		)
	}
}

export default StorySearchBar
