# Emporium Wallet Pass

A delivery service for Apple Wallet (.pkpass) and Google Wallet passes. Upload your wallet passes and distribute them via download links, QR codes, or email.

## Quick Start

```bash
npm install
npm start
```

The server starts at `http://localhost:3000`.

## Usage

### Upload a pass

```bash
curl -F passFile=@mypass.pkpass http://localhost:3000/pass/upload
```

Response includes the pass ID and delivery URLs:

```json
{
  "id": "uuid-here",
  "downloadUrl": "http://localhost:3000/pass/uuid-here/download",
  "qrUrl": "http://localhost:3000/pass/uuid-here/qr",
  "pageUrl": "http://localhost:3000/pass/uuid-here"
}
```

### Deliver a pass

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Download link** | `GET /pass/:id/download` | Direct .pkpass file download |
| **Web page** | `GET /pass/:id` | Shareable page with QR code + download button |
| **QR code** | `GET /pass/:id/qr` | PNG QR code image pointing to download |
| **Email** | `POST /pass/:id/send` | Send pass as email attachment |

### Send via email

```bash
curl -X POST http://localhost:3000/pass/UUID/send \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

### List all passes

```bash
curl http://localhost:3000/passes
```

Or visit `http://localhost:3000/passes` in a browser for the web UI.

## Configuration

Copy `.env.example` to `.env` and configure:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `BASE_URL` | http://localhost:3000 | Public URL for links/QR codes |
| `PASS_STORAGE_PATH` | ./passes | Where pass files are stored |
| `SMTP_HOST` | (none) | SMTP server for email delivery |
| `SMTP_PORT` | 587 | SMTP port |
| `SMTP_USER` | (none) | SMTP username |
| `SMTP_PASS` | (none) | SMTP password |
| `SMTP_FROM` | noreply@emporium-wallet.com | Sender address |

## API Reference

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/pass/upload` | Upload a .pkpass file (multipart, field: `passFile`) |
| `GET` | `/pass/:id` | Web download page with QR code |
| `GET` | `/pass/:id/download` | Download the pass file |
| `GET` | `/pass/:id/qr` | QR code image (PNG) |
| `GET` | `/pass/:id/qr.json` | QR code as data URL |
| `GET` | `/pass/:id/info` | Pass metadata (JSON) |
| `POST` | `/pass/:id/send` | Email the pass (body: `{email, subject?, message?}`) |
| `GET` | `/passes` | List all passes (JSON or HTML) |
| `DELETE` | `/pass/:id` | Delete a pass |

## Testing

```bash
npm test
```
