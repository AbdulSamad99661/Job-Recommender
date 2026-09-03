import nodemailer from 'nodemailer';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isSendGridConfigured() {
  const key = process.env.SENDGRID_API_KEY;
  return Boolean(key && key !== 'your_sendgrid_api_key_here');
}

function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.SMTP_USER !== 'your_email@gmail.com'
  );
}

export function isEmailConfigured() {
  return isSendGridConfigured() || isSmtpConfigured();
}

function getFromIdentity() {
  return {
    fromName: process.env.EMAIL_FROM_NAME || process.env.SMTP_FROM_NAME || 'JobMatch',
    fromEmail: process.env.EMAIL_FROM || process.env.SMTP_FROM || process.env.SMTP_USER,
  };
}

function getTransporter() {
  if (!isSmtpConfigured()) return null;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendViaSendGrid({ to, fromEmail, fromName, subject, html, text }) {
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: fromEmail, name: fromName },
      subject,
      content: [
        { type: 'text/plain', value: text },
        { type: 'text/html', value: html },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`SendGrid error (${res.status}): ${errText}`);
  }
}

export function buildSavedJobEmail({ recipientName, job, status = 'Saved' }) {
  const title = job.title || 'Job opportunity';
  const company = job.company || 'Company';
  const location = job.location || job.city || 'Location not listed';
  const matchScore = job.matchScore ?? job.match_score;
  const applyLink = job.applyLink || job.apply_link || '';
  const skills = (job.matchedSkills || job.matched_skills || []).slice(0, 8);
  const platform = job.source_platform || job.source || 'Live listing';
  const savedAt = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const subject = `Saved: ${title} at ${company} — JobMatch`;

  const skillsHtml = skills.length
    ? skills.map((s) => `<span style="display:inline-block;background:#EEF2FF;color:#4338CA;padding:4px 10px;border-radius:999px;font-size:12px;margin:0 6px 6px 0;">${escapeHtml(s)}</span>`).join('')
    : '<span style="color:#64748B;font-size:14px;">Skills will appear after your next CV match.</span>';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0F172A;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F1F5F9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#4F46E5 0%,#06B6D4 100%);padding:28px 32px;">
              <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.85);">JobMatch</div>
              <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;color:#FFFFFF;">Job saved to your workspace</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#334155;">
                Hi ${escapeHtml(recipientName || 'there')},<br />
                You saved a job to your account. Here are the details:
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:14px;margin-bottom:24px;">
                <tr>
                  <td style="padding:24px;">
                    <div style="font-size:12px;font-weight:700;color:#6366F1;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">${escapeHtml(status)}</div>
                    <h2 style="margin:0 0 8px;font-size:24px;line-height:1.3;color:#0F172A;">${escapeHtml(title)}</h2>
                    <p style="margin:0 0 6px;font-size:16px;font-weight:600;color:#1E293B;">${escapeHtml(company)}</p>
                    <p style="margin:0 0 14px;font-size:14px;color:#64748B;">${escapeHtml(location)} · ${escapeHtml(platform)}</p>
                    ${matchScore != null ? `<p style="margin:0 0 14px;font-size:14px;color:#059669;font-weight:700;">${escapeHtml(String(matchScore))}% profile match</p>` : ''}
                    <p style="margin:0;font-size:13px;color:#94A3B8;">Saved on ${escapeHtml(savedAt)}</p>
                  </td>
                </tr>
              </table>

              <div style="margin-bottom:24px;">
                <div style="font-size:13px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:10px;">Matched skills</div>
                <div>${skillsHtml}</div>
              </div>

              ${applyLink ? `
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
                <tr>
                  <td style="border-radius:10px;background:#4F46E5;">
                    <a href="${escapeHtml(applyLink)}" style="display:inline-block;padding:14px 24px;font-size:15px;font-weight:700;color:#FFFFFF;text-decoration:none;">Apply now</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 24px;font-size:13px;color:#64748B;word-break:break-all;">Direct link: <a href="${escapeHtml(applyLink)}" style="color:#4F46E5;">${escapeHtml(applyLink)}</a></p>
              ` : ''}

              <p style="margin:0;font-size:14px;line-height:1.6;color:#64748B;">
                Track this application in JobMatch under <strong>Saved Jobs</strong>. Update the status to Applied, Interview, Offer, or Rejected as you progress.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#F8FAFC;border-top:1px solid #E2E8F0;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#94A3B8;text-align:center;">
                JobMatch AI Career Assistant · This email was sent because you saved a job while signed in.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Hi ${recipientName || 'there'},`,
    '',
    `You saved a job on JobMatch:`,
    `${title} at ${company}`,
    location,
    matchScore != null ? `${matchScore}% match` : '',
    applyLink ? `Apply: ${applyLink}` : '',
    '',
    'View and track it in Saved Jobs in your dashboard.',
  ].filter(Boolean).join('\n');

  return { subject, html, text };
}

export async function sendSavedJobEmail({ to, recipientName, job, status = 'Saved' }) {
  const { subject, html, text } = buildSavedJobEmail({ recipientName, job, status });
  const { fromName, fromEmail } = getFromIdentity();

  if (isSendGridConfigured()) {
    if (!fromEmail) {
      return { sent: false, reason: 'EMAIL_FROM is required for SendGrid' };
    }
    await sendViaSendGrid({ to, fromEmail, fromName, subject, html, text });
    return { sent: true, provider: 'sendgrid' };
  }

  const transporter = getTransporter();
  if (!transporter) {
    return { sent: false, reason: 'Email service not configured' };
  }

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    html,
    text,
  });

  return { sent: true, provider: 'smtp' };
}

export { isEmailConfigured, isSendGridConfigured, isSmtpConfigured };
