// @flow

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import moment from "moment";
import { Icon } from "react-native-elements";

import { Colors } from "../../themes/";
import type { Tag } from "../../types";

function TagCell({ tag, onPress }: { tag: Tag, onPress: Function }) {
  moment.updateLocale("ja");
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          padding: 10,
          paddingVertical: 20,
          flex: 2,
          flexDirection: "row"
        }}
      >
        <Icon
          containerStyle={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5
          }}
          color={Colors.black}
          name="local-offer"
          size={20}
        />
        <Text
          style={{ fontSize: 24, paddingLeft: 5 }}
        >{`${tag.name}(${tag.taggings_count})`}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default TagCell;
