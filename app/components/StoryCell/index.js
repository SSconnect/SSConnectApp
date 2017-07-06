// @flow

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import moment from "../../configs/moment";

import { makeSelectReaded } from "../../reduxs/selectors";
import { Colors } from "../../themes/";
import type { Story } from "../../types";

class StoryCell extends React.PureComponent {
  props: {
    story: Story,
    onPress: Function,
    readed: boolean
  };

  render() {
    const { story, readed, onPress } = this.props;
    moment.updateLocale("ja");
    const timestamp = moment.utc(story.first_posted_at);
    const color = readed ? Colors.disable : Colors.black;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ padding: 10 }}>
          <View
            style={{
              marginBottom: 5,
              flex: 2,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ color: Colors.disable }}>
              {story.articles[0].blog.title}
            </Text>
            <Text style={{ color }}>{timestamp.fromNow()}</Text>
          </View>
          <Text style={{ fontSize: 20, color }}>{story.title}</Text>
          <Text style={{ marginTop: 5, color }}>
            {story.tag_list.join(",")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const makeMapStateToProps = () => {
  const selectReaded = makeSelectReaded();
  return (state, props) => ({
    readed: selectReaded(state, props)
  });
};

const mapDispatchToProps = dispatch => ({});

export default connect(makeMapStateToProps, mapDispatchToProps)(StoryCell);
