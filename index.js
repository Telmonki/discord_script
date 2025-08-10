import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

const BOT_TOKEN = process.env.BOT_TOKEN;
const N8N_WEBHOOK = process.env.N8N_WEBHOOK;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "super-secret-key";

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', async member => {
  console.log(`New member: ${member.user.tag}`);

  await fetch(N8N_WEBHOOK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Secret': WEBHOOK_SECRET
    },
    body: JSON.stringify({
      username: member.user.username,
      id: member.user.id,
      joinedAt: member.joinedAt,
      avatar: member.user.displayAvatarURL()
    })
  });
});

client.login(BOT_TOKEN);
