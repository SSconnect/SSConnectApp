// @flow

import { Profile } from "."
import { IconName } from "../themes"

export const profileSerialKey = (profile: Profile | {}): string => {
	if (!profile || profile === {}) {
		return "HOME"
	}
	return [profile.blog_id || "", profile.tag || "", profile.q || ""].join("AAA") // TODO: fix
}
