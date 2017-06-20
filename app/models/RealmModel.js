// @flow

import _ from "lodash"
import store from "react-native-simple-store"

import type { Story, Profile } from "../types"

const StoreKeys = {
	profiles: "profiles",
	reads: "reads",
	config: "config",
}

const ConfigSchema = {
	name: "Config",
	properties: {
		inappbrowse: { type: "bool", default: false },
	},
}

const ReadSchema = {
	name: "Read",
	properties: {
		story_id: "int",
	},
}

const TabProfileSchema = {
	name: "TabProfile",
	properties: {
		value: "string",
		type: "string",
	},
}

const ProfileSchema = {
	name: "Profile",
	properties: {
		blog_id: { type: "int", optional: true },
		q: { type: "string", optional: true },
		tag: { type: "string", optional: true },
	},
}

class RealmManager {
	async getProfiles() {
		return (await store.get(StoreKeys.profiles)) || []
	}

	async getReads() {
		return (await store.get(StoreKeys.reads)) || []
	}

	async addRead(story: Story) {
		const reads = await this.getReads()
		if (reads.includes(story.id)) {
			return
		}
		store.push(StoreKeys.reads, story.id)
	}

	async addProfile(profile: Profile) {
		const profiles = await this.getProfiles()
		if (profiles.includes(profile)) {
			throw new Error("Duplicate Insert")
		}
		await store.push(StoreKeys.profiles, profile)
	}

	async deleteProfile(profile: Profile) {
		const profiles = await this.getProfiles()
		const newProfiles = _.remove(profiles, profile)
		await store.save(StoreKeys.profiles, newProfiles)
		return newProfiles
	}

	async selectConfig() {
		const config = await store.get(StoreKeys.config)
		if (config) {
			return config
		}
		const initConfig = { inappbrowse: false }
		await store.save(StoreKeys.config, initConfig)
		return initConfig
	}

	async toggleConfigInAppBrowse() {
		const config = await store.get(StoreKeys.config)
		await store.update(StoreKeys.config, { inappbrowse: !config.inappbrowse })
	}

	async moveProfile(from: number, to: number) {
		const profiles = []
		const oldProfiles = this.getProfiles()
		_.each(oldProfiles, v => profiles.push({ ...v }))
		profiles.splice(to, 0, profiles.splice(from, 1)[0])
		await store.save(StoreKeys.profiles, profiles)
		return profiles
	}
}

export default new RealmManager()
