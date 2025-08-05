# Discord Unleave All

A **Discord SelfBot Script** that automatically leaves all Discord servers (guilds) from your account except for the ones you whitelist.

This script is useful for cleaning up servers you're a member of. It will:
- Skip servers where you're the **owner**.
- Skip servers that are **whitelisted** by you.
- Leave all other servers with a delay to avoid rate limits.

---

## ⚙️ Features
- Fetches all joined servers.
- Skips owned servers.
- Skips whitelisted servers.
- Confirmation before starting.
- Leaves servers with 1-second delay.
- Uses direct API requests (No `discord.js`).

---

## 📝 Configuration
1. **Add your token:**
   ```js
   const _8w_t = "YOUR_DISCORD_TOKEN";
````

2. **Whitelist server IDs you want to stay in:**

   ```js
   const _8w_a = ["GUILD_ID_1", "GUILD_ID_2"];
   ```

---

## 🚀 How to Run

1. Install dependencies:

   ```bash
   npm install axios
   ```

2. Run the script:

   ```bash
   node unleave.js
   ```

3. You will be asked:

   ```
   Type 1 to leave all other servers, or 2 to cancel:
   ```

   Type `1` to proceed, or `2` to cancel.

---

## ⚠️ Disclaimer

* **Selfbots are against Discord's Terms of Service (ToS).** This script is for educational purposes only.
* Use at your own risk.
* This script sends direct API requests to Discord.

---

## 📂 Project Structure

```
discord-unleave-all/
├── README.md
└── unleave.js
```

---
