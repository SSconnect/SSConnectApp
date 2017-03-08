import React from 'react';
import {View, TouchableOpacity, Text, Linking} from 'react-native';
import Spinner from 'react-native-spinkit';

import {Colors} from '../../Themes/';

import realm from '../../Models/RealmModel';

const Styles = {
};

function ArticleCell({article}) {
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
				<Text>{article.blog.title}</Text>
				<Text style={{fontSize: 20}}>{article.title}</Text>
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
