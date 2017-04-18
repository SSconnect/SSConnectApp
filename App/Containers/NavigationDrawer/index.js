import React from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';

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
				type="displace"
				open={state.open}
				onOpen={() => Actions.refresh({ key: state.key, open: true })}
				onClose={() => Actions.refresh({ key: state.key, open: false })}
				content={<SideMenu />}
				tapToClose
				openDrawerOffset={0.2}
				panCloseMask={0.2}
				negotiatePan
				tweenHandler={ratio => ({
					main: { opacity: Math.max(0.54, 1 - ratio) },
				})}
			>
				<DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
			</Drawer>
		);
	}
}

export default NavigationDrawer;
