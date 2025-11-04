import express from "express";
import path from "path";
import { Telegraf } from "telegraf";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://ton2-2.onrender.com';
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname)); // <-- позволяет отдавать index.html

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply("👋 Привет! Нажми кнопку ниже, чтобы открыть приложение TON Miner.", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🚀 Открыть приложение", web_app: { url: WEB_APP_URL } }]
      ]
    }
  })
);

import express from "express";
import { Telegraf } from "telegraf";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL || "https://ton2-2.onrender.com";
const PORT = process.env.PORT || 3000;

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("👋 Привет! Нажми кнопку ниже, чтобы открыть приложение TON Miner.", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🚀 Открыть приложение", web_app: { url: WEB_APP_URL } }],
      ],
    },
  });
});

// подключаем webhook
app.use(await bot.createWebhook({ domain: WEB_APP_URL }));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
