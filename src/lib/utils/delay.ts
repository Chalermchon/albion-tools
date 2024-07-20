export async function delay(ms: number) {
	if (typeof ms !== 'number' || isNaN(ms)) {
		return Promise.reject(new TypeError('delay time must be a valid number'));
	}
	return new Promise((resolve) => setTimeout(resolve, ms));
}
