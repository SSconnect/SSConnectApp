import 'react-native'
import React from 'react'

import renderer from 'react-test-renderer'

import SSConnect from '../index.ios'

it('renders correctly', () => {
	renderer.create(<SSConnect />)
	const tree = renderer.create({}).toJSON()
	expect(tree).toMatchSnapshot()
})
