const SWAGGER = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14";

/** Swagger UI for the Landing Page API. The spec is the static /openapi.json (public/openapi.json). */
export function GET() {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kanaku Landing Page API</title><link rel="stylesheet" href="${SWAGGER}/swagger-ui.min.css">
<style>body{margin:0;font-family:system-ui,sans-serif}</style></head>
<body><div id="ui"></div>
<script src="${SWAGGER}/swagger-ui-bundle.min.js"></script>
<script>SwaggerUIBundle({url:'/openapi.json',dom_id:'#ui',deepLinking:true})</script></body></html>`;
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
