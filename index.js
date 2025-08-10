import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

const BOT_TOKEN = process.env.BOT_TOKEN;
const N8N_WEBHOOK = process.env.N8N_WEBHOOK; // e.g. https://your-n8n/webhook/uuid

client.on('guildMemberAdd', async (member) => {
  await fetch(N8N_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // no secret header
    body: JSON.stringify({
      id: member.user.id,
      username: member.user.username,
      joinedAt: member.joinedAt,
      avatar: member.user.displayAvatarURL(),
      guildId: member.guild.id
    })
  });
});

client.once('ready', () => console.log(`Logged in as ${client.user.tag}`));
client.login(BOT_TOKEN);
