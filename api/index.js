export default function Home() {
  return (
    <div>
      <h1>WGs+ Basic Proxy</h1>
      <input id="u" placeholder="Enter site (roblox.com)" />
      <button id="goButton" onclick="go()" disabled>GO</button>

      <script>
        // Function to build the URL for proxy request
        function buildURL(raw) {
          if (!raw.startsWith('http')) raw = 'https://' + raw;
          return `/api/proxy?url=${encodeURIComponent(raw)}`;
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
    </div>
  );
}
