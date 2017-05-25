// @flow
import moment from "moment"

const config = {
	productID: "com.elzup.ssconnect",
	PREMIUM: false,
	LIMITS: {
		PROFILE_MAX: {
			FREE: 3,
			PRO: 10,
		},
	},
}

moment.locale("ja", {
	weekdays: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
	weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
	relativeTime: {
		future: "%s",
		past: "%s前",
		s: "%d秒",
		m: "1分",
		mm: "%d分",
		h: "1時間",
		hh: "%d時間",
		d: "1日",
		dd: "%d日",
	},
})

export default config
