# Gami-Pack Landing Page

Live Preview: [www.gamipack.netlify.app](https://gamipack.netlify.app/)

## How to deploy

### Requirements

- [Node.js](https://nodejs.org/) **20.9 or newer** (LTS recommended)

### Steps

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set the contact form endpoint (see [Contact form](#contact-form)) in a `.env` file:

   ```bash
   NEXT_PUBLIC_FORM_ENDPOINT=https://example.com/your-form-endpoint
   ```

3. Build the site:

   ```bash
   npm run build
   ```

   This builds a static export with Next.js and then optimizes all images (responsive WebP variants).

4. Deploy the contents of the **`out/`** folder.

   It is a fully static site (HTML, CSS, JS and assets), so no Node.js server is needed.

> [!NOTE]
> This is a single-page site, so the generated 404 page (`404.html`, `404/`, `_not-found/`) should be omitted. Configure the hosting to redirect all unknown routes to `/` instead.

## Contact form

The site has no backend, so the contact form sends its data to an external endpoint set in `NEXT_PUBLIC_FORM_ENDPOINT` (e.g. a form service or a serverless function).

- **Set at build time.** Next.js inlines `NEXT_PUBLIC_*` variables into the JavaScript during `npm run build`. Set it before building, in a `.env` file or in your hosting's build settings. Changing it later requires a rebuild.
- **Public value.** The URL ends up in the browser code, so don't put secrets or API keys in it.
- **Request.** On submit, the form sends a `POST` request with a JSON body:

  ```json
  {
    "name": "Jan Kowalski",
    "email": "jan@firma.pl",
    "phone": "+48 123 456 789",
    "message": "Treść wiadomości..."
  }
  ```

  No `Content-Type` header is set, so the browser sends it as `text/plain` and skips the CORS preflight. The endpoint should parse the body as JSON regardless of the content type.

- **Response.** Any `2xx` status shows the success message. Any other status, a network error or a missing CORS header (`Access-Control-Allow-Origin`) shows the error message.
- **Spam protection.** The form has a hidden honeypot field. If a bot fills it in, the form shows success but sends nothing.
- **Required.** Without the variable the endpoint is an empty string, so the form posts to the page itself and messages don't reach anyone.
