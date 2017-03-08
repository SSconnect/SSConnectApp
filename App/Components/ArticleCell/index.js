// @flow

import React from 'react';
import {View, TouchableOpacity, Text, Linking} from 'react-native';
import Spinner from 'react-native-spinkit';
import moment from 'moment';

import {Colors} from '../../Themes/';

import realm from '../../Models/RealmModel';

const Styles = {
};

function ArticleCell({article}) {
	moment.updateLocale('ja');
	const timestamp = moment.utc(article.posted_at, );
	return (
		<TouchableOpacity
			onPress={() => {
				realm.write(() => {
					realm.create('Read', {
						url: article.url
					});
				});
				Linking.openURL(article.url);
				// article.read = true;
			}}
			>
			<View style={{padding: 10}}>
				<View style={{marginBottom: 5, flex: 2, flexDirection: 'row', justifyContent: 'space-between'}} >
					<Text style={{color: Colors.disable}}>{article.blog.title}</Text>
					<Text>{timestamp.fromNow()}</Text>
				</View>
				<Text style={{fontSize: 20}}>{article.title}</Text>
				<Text style={{marginTop: 5}}>{article.category_list.join(',')}</Text>
			</View>
		</TouchableOpacity>
	);
}

ArticleCell.propTypes = {
	loading: React.PropTypes.object
};

ArticleCell.defaultProps = {
	loading: {}
};

export default ArticleCell;
