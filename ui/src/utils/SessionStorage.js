export function set(key, value) {
	window.sessionStorage.setItem(key, value || {});
}

export function get(key) {
	return window.sessionStorage.getItem(key);
}

export function remove(key) {
	return window.sessionStorage.removeItem(key);
}

export default {set, get, remove};
