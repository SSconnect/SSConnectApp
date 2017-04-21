import React from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

import { IconName } from '../../themes';

import SideMenu from './SideMenu';

type Props = {
	navigationState: any,
	onNavigate: any,
};

class NavigationDrawer extends React.Component {
	props: Props;

	render() {
		const state = this.props.navigationState;
		const children = state.children;
		return (
			<Drawer
				ref="navigation"
				content={<SideMenu />}
				type="displace"
				open={state.open}
				openDrawerOffset={0.2}
				onOpen={() => Actions.refresh({ key: state.key, open: true })}
				onClose={() => Actions.refresh({ key: state.key, open: false })}
				tweenHandler={ratio => ({
					main: { opacity: Math.max(0.54, 1 - ratio) },
				})}
				captureGestures="open"
				panOpenMask={0.20}
				negotiatePan
				acceptPan
				tapToClose
			>
				<DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
			</Drawer>
		);
	}
}

export default NavigationDrawer;
