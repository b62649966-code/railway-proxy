// /pages/api/index.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  // ================= HOME =================
  if (!url) {
    return res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>WGs+ Basic Proxy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <h1>WGs+ Basic Proxy</h1>
        <input id="u" placeholder="Enter site (roblox.com)">
        <button id="goButton" onclick="go()" disabled>GO</button>
      </body>
      <script>
        function go() {
          const u = document.getElementById("u");
          if (!u.value.trim()) return;
          location.href = \`/api/proxy?url=\${encodeURIComponent(u.value.trim())}\`;
        }

        document.getElementById("u").addEventListener('input', function () {
          const button = document.getElementById("goButton");
          if (this.value.trim()) {
            button.disabled = false;
          } else {
            button.disabled = true;
          }
        });

        document.getElementById("u").onkeydown = e => e.key === 'Enter' && go();
      </script>
    </html>`);
  }

  // ================= PROXY =================
  try {
    const response = await fetch(url, { headers: { "user-agent": req.headers["user-agent"] || "" } });
    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error with proxying request");
  }
}
