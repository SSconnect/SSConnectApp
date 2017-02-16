/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import feedClient from '../Services/FeedClient';
import type { Feed } from '../Services/FeedClient';

class HomeScreen extends Component {
  componentDidMount() {
    feedClient.fetchFeed().then((feeds: Array<Feed>) => {
    }).done();
  }

  render() {
    return (
      <View>
        <Text>
          Hello
        </Text>
      </View>
    );
  }
}
export default HomeScreen;
