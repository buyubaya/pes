export default class EnvironmentUtils {

	static set(key, value) {
		window.PES[key] = value || {};
	}

	static get(key) {
		return window.PES[key];
	}
}
