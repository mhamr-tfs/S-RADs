export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.pathname === "/api/status") {
			return Response.json({
				shop: "Thermopolis Fly Shop",
				app: "Shuttle Dispatch System",
				version: "0.1",
				status: "Online",
				database: env.DB ? "Connected" : "Not connected"
			});
		}

		if (url.pathname === "/api/reservations") {
			const result = await env.DB.prepare(
				"SELECT * FROM reservations ORDER BY shuttle_date, shuttle_time"
			).all();

			return Response.json(result.results);
		}

		return new Response("Not Found", { status: 404 });
	},
};