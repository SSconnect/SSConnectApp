/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Linking,
  ListView,
  TouchableOpacity
} from 'react-native';
import feedClient from '../Services/FeedClient';
import type { Feed } from '../Services/FeedClient';
import { List, ListItem } from 'react-native-elements'

class HomeScreen extends Component {

  state: {
    dataSource: Object
  }

  constructor(props: Object) {
    super(props);
    const rowHasChanged = (r1: Feed, r2: Feed) => r1.title + r1.blogname !== r2.title + r2.blogname
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount() {
    feedClient.fetchFeed().then((feeds: Array<Feed>) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(feeds)
      });
    }).done();
  }

  renderRow (feed: Feed, sectionID: number) {
    return (
      <TouchableOpacity onPress={() => {
        Linking.openURL(feed.link);
      }}>
        <ListItem
          key={sectionID}
          title={feed.title}
          subtitle={feed.blogname}
        />
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <List>
        <ListView
          renderRow={this.renderRow}
          dataSource={this.state.dataSource}
          enableEmptySections
        />
      </List>
    )
  }

}
export default HomeScreen;
