import fetch from 'node-fetch';

const BASIC = "/api/proxy?url=";

export default async function handler(req, res) {
  const { url } = req.query;

  // ================= HOME =================
  if (!url) {
    return res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <title>WGs+ Basic Proxy</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          margin: 0;
          background: black;
          color: #00ff9c;
          font-family: monospace;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
        }

        input, button {
          padding: 14px 20px;
          border-radius: 25px;
          border: 1px solid #00ff9c;
          background: #050505;
          color: #00ff9c;
          font-size: 15px;
          margin: 10px;
        }

        input {
          width: 460px;
        }

        button {
          background: #00ff9c;
          color: #000;
          cursor: pointer;
        }

        button:disabled {
          background: grey;
          cursor: not-allowed;
        }
      </style>
    </head>
    <body>
      <div>
        <h1>WGs+ Basic Proxy</h1>
        <input id="u" placeholder="Enter site (roblox.com)">
        <button id="goButton" onclick="go()" disabled>GO</button>
      </div>

      <script>
        function buildURL(raw){
          if (!raw.startsWith('http')) raw = 'https://' + raw;
          return \`\${BASIC}\${encodeURIComponent(raw)}\`;
        }

        function go(){
          const u = document.getElementById("u");
          if (!u.value.trim()) return;
          location.href = buildURL(u.value.trim());
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
    </body>
    </html>`);
  }

  // ================= BASIC PROXY =================
  try {
    const r = await fetch(url, {
      headers: { "user-agent": req.headers["user-agent"] || "" }
    });
    let b = await r.text();
    b = b.replace("<head>", `<head><base href="${url}">`);
    b = b.replace(/(href|src)="https?:\/\/([^"]+)"/g, 
      (match, p1, p2) => `${p1}="${BASIC}https://${p2}"`);
    res.send(b);
  } catch (error) {
    console.error(error);
    res.status(500).send("Proxy error");
  }
}
