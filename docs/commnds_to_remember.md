at start of session
----------------------
git pull
npx wrangler d1 migrations apply tfs_shuttles_database --local
npm run dev

at end of session
-----------------------
git add .
git commit -m "insert comment here"
git push

Check database tables
---------------------
npx wrangler d1 execute tfs_shuttles_database --command "SELECT name FROM sqlite_master WHERE type='table';"

Check reservation schema
------------------------
npx wrangler d1 execute tfs_shuttles_database --command "PRAGMA table_info(reservations);"

Start a tunnel
---------------
cloudflared tunnel --url http://localhost:8787                       