// ======================================================
// Reference Data Service
// ======================================================


// ======================================================
// Get active routes
// ======================================================
export async function getRoutes(env) {
	const result = await env.DB.prepare(
		"SELECT * FROM routes WHERE active = 'Yes' ORDER BY id"
	).all();

	return result.results;
}
// ======================================================
// Get active drivers
// ======================================================
export async function getDrivers(env) {
	const result = await env.DB.prepare(
		"SELECT * FROM drivers WHERE active = 'Yes' ORDER BY name"
	).all();

	return result.results;
}