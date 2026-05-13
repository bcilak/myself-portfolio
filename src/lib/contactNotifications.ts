type ContactNotification = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

function truncate(value: string, maxLength = 1200) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 3)}...`;
}

function buildPayload(message: ContactNotification) {
  const title = `New portfolio contact: ${message.name}`;
  const lines = [
    title,
    `Email: ${message.email}`,
    message.subject ? `Subject: ${message.subject}` : null,
    "",
    truncate(message.message),
  ].filter(Boolean);

  const text = lines.join("\n");
  const format = process.env.CONTACT_WEBHOOK_FORMAT || "generic";

  if (format === "discord") {
    return {
      content: text,
      allowed_mentions: { parse: [] },
    };
  }

  if (format === "slack") {
    return { text };
  }

  return {
    event: "contact.message.created",
    text,
    message: {
      name: message.name,
      email: message.email,
      subject: message.subject,
      body: message.message,
    },
  };
}

export async function notifyContactMessage(message: ContactNotification) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildPayload(message)),
  });

  if (!response.ok) {
    throw new Error(`Contact webhook failed with status ${response.status}`);
  }
}
