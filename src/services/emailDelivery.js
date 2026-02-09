const nodemailer = require('nodemailer');
const fs = require('fs');
const config = require('../config');
const passStore = require('./passStore');

function createTransport() {
  if (!config.smtp.host) {
    return null;
  }
  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });
}

async function sendPass(passId, recipientEmail, options = {}) {
  const transport = createTransport();
  if (!transport) {
    throw new Error('Email delivery is not configured. Set SMTP_HOST and related environment variables.');
  }

  const pass = passStore.getPass(passId);
  if (!pass) {
    throw new Error(`Pass not found: ${passId}`);
  }

  const subject = options.subject || `Your Wallet Pass: ${pass.label}`;
  const text = options.message || `Please find your wallet pass attached. Open the attachment on your device to add it to your wallet.`;
  const html = options.html || `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333;">Your Wallet Pass</h2>
      <p style="color: #555; font-size: 16px;">${text}</p>
      <p style="color: #555; font-size: 14px;">
        Or <a href="${config.baseUrl}/pass/${passId}/download">click here to download</a> directly.
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="color: #999; font-size: 12px;">Sent by Emporium Wallet Pass</p>
    </div>
  `;

  const contentType = pass.originalName.endsWith('.pkpass')
    ? 'application/vnd.apple.pkpass'
    : 'application/octet-stream';

  const result = await transport.sendMail({
    from: config.smtp.from,
    to: recipientEmail,
    subject,
    text,
    html,
    attachments: [
      {
        filename: pass.originalName,
        content: fs.createReadStream(pass.filePath),
        contentType,
      },
    ],
  });

  return { messageId: result.messageId, accepted: result.accepted };
}

function isConfigured() {
  return !!config.smtp.host;
}

module.exports = { sendPass, isConfigured };
