// @flow

import React from "react";
import { SearchBar } from "react-native-elements";

import { IconName } from "../../themes/";
import { Profile } from "../../types";

class StorySearchBar extends React.PureComponent {
  props: {
    profile: Profile
  };

  render() {
    const { profile, onSubmit } = this.props;
    if (profile.tag) {
      return (
        <SearchBar
          lightTheme
          icon={{ name: IconName.tag }}
          onSubmitEditing={e =>
            onSubmit(e, `${profile.tag}: ${e.nativeEvent.text}`)}
          placeholder={`"${profile.tag}"タグでタイトル検索`}
        />
      );
    }
    return (
      <SearchBar
        lightTheme
        icon={{ name: IconName.search }}
        onSubmitEditing={e => onSubmit(e, `タイトル検索: ${e.nativeEvent.text}`)}
        placeholder={"タイトル検索"}
      />
    );
  }
}

export default StorySearchBar;
