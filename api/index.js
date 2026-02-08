export default function Home() {
  return (
    <div>
      <h1>WGs+ Basic Proxy</h1>
      <input id="u" placeholder="Enter site (roblox.com)" />
      <button id="goButton" onclick="go()" disabled>GO</button>

      <script>
        function buildURL(raw) {
          if (!raw.startsWith('http')) raw = 'https://' + raw;
          return `/api/proxy?url=${encodeURIComponent(raw)}`;
        }

        function go() {
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
    </div>
  );
}
