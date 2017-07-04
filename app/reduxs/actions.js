import { ActionTypes } from "./constants";

export function loadProfiles() {
  return {
    type: ActionTypes.LOAD_PROFILES_TYPE
  };
}

export function loadProfilesEnd(profiles) {
  return {
    type: ActionTypes.LOAD_PROFILES_END_TYPE,
    profiles
  };
}

export function addProfile(profile) {
  return {
    type: ActionTypes.ADD_PROFILE_TYPE,
    profile
  };
}

export function deleteProfile(profile) {
  return {
    type: ActionTypes.DELETE_PROFILE_TYPE,
    profile
  };
}

export function deleteProfileEnd(profiles) {
  return {
    type: ActionTypes.DELETE_PROFILE_END_TYPE,
    profiles
  };
}

export function moveProfile(from, to) {
  return {
    type: ActionTypes.MOVE_PROFILE_TYPE,
    from,
    to
  };
}

export function moveProfileEnd(profiles) {
  return {
    type: ActionTypes.MOVE_PROFILE_END_TYPE,
    profiles
  };
}

export function loadReads() {
  return {
    type: ActionTypes.LOAD_READS_TYPE
  };
}

export function loadReadsEnd(reads) {
  return {
    type: ActionTypes.LOAD_READS_END_TYPE,
    reads
  };
}

export function addRead(story) {
  return {
    type: ActionTypes.ADD_READ_TYPE,
    story
  };
}

export function loadStories(profile, page) {
  return {
    type: ActionTypes.LOAD_STORIES_TYPE,
    profile,
    page
  };
}

export function loadStoriesEnd(profile, pageInfo, stories) {
  return {
    type: ActionTypes.LOAD_STORIES_END_TYPE,
    profile,
    pageInfo,
    stories
  };
}

export function updatePage(profile, page) {
  return {
    type: ActionTypes.UPDATE_PAGE_TYPE,
    profile,
    page
  };
}

export const loadConfig = () => ({ type: ActionTypes.LOAD_CONFIG_TYPE });
export const loadConfigEnd = config => ({
  type: ActionTypes.LOAD_CONFIG_END_TYPE,
  config
});
export const toggleConfigIAB = () => ({
  type: ActionTypes.TOGGLE_IAB_CONFIG_TYPE
});
