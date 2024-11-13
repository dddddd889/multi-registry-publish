exports.singleInstance = (fn) => {
	let v = null
	return (...args) => {
		if (!v) {
			v = fn?.(...args)
		}
		return v
	}
}