import fetch from 'node-fetch';

// This is the API route logic inside `index.js` in the /pages folder
export default async function handler(req, res) {
  const { url } = req.query;

  // =================== Home Page (Frontend) ===================
  if (!url) {
    return res.send(`
      <!DOCTYPE html>
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
            <input id="u" placeholder="Enter site (e.g., roblox.com)">
            <button id="goButton" onclick="go()" disabled>GO</button>
          </div>

          <script>
            // Function to build the URL for proxy request
            function buildURL(raw) {
              if (!raw.startsWith('http')) raw = 'https://' + raw;
              return \`/api?url=\${encodeURIComponent(raw)}\`;
            }

            // Function to handle the "GO" button click or Enter key press
            function go() {
              const u = document.getElementById("u");
              if (!u.value.trim()) return;
              location.href = buildURL(u.value.trim());
            }

            // Enable the GO button when the user types in the input field
            document.getElementById("u").addEventListener('input', function () {
              const button = document.getElementById("goButton");
              if (this.value.trim()) {
                button.disabled = false;
              } else {
                button.disabled = true;
              }
            });

            // Allow user to press Enter key to submit the form
            document.getElementById("u").onkeydown = e => e.key === 'Enter' && go();
          </script>
        </body>
      </html>
    `);
  }

  // ================== Proxy Logic ============================
  try {
    const response = await fetch(url, { headers: { "user-agent": req.headers["user-agent"] || "" } });
    const body = await response.text();

    res.send(body);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error with proxying request");
  }
}
