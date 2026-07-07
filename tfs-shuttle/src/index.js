/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		return new Response(`
			<html>
				<head>
					<title>Thermopolis Fly Shop</title>
				</head>
				<body style="font-family: Arial; margin: 40px;">
					<h1>Thermopolis Fly Shop</h1>
					<h2>🚐 Shuttle Dispatch System</h2>
					<p>Version 0.1</p>

					<hr>

					<h3>System Status</h3>
					<ul>
						<li>✅ Cloudflare Worker Running</li>
						<li>⏳ Database Connection Coming Soon</li>
						<li>⏳ Shuttle Dashboard Coming Soon</li>
					</ul>

					<p>Welcome, Mike!</p>
				</body>
			</html>
		`, {
			headers: {
				"Content-Type": "text/html"
			}
		});
	},
};