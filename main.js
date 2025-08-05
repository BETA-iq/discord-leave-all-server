const axios = require('axios');
const readline = require('readline');

const _8w_t = "YOUR_DISCORD_TOKEN"; // add you'r token here
const _8w_a = ["GUILD_ID_1", "GUILD_ID_2"]; // List of Server IDs (Guild IDs) you want to keep (Whitelist)


const _8w_h = {
  Authorization: _8w_t,
  'Content-Type': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36',
};

if (!_8w_t || _8w_t.length < 20) {
  console.error('no_token');
  process.exit(1);
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    const _8w_r = await axios.get('https://discord.com/api/v10/users/@me/guilds', {
      headers: _8w_h,
    });

    const _8w_gs = _8w_r.data;

    if (!Array.isArray(_8w_gs) || _8w_gs.length === 0) return console.log('no_guilds');

    const stayGuilds = _8w_gs.filter(g => !g.owner && _8w_a.includes(g.id));
    console.log(`Whitelisted guilds (will stay):`);
    stayGuilds.forEach(g => console.log(`- ${g.name} (${g.id})`));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('\nType 1 to leave all other servers, or 2 to cancel: ', async (answer) => {
      rl.close();

      if (answer !== '1') {
        console.log('Cancelled.');
        return;
      }

      let leftCount = 0;

      for (const _8w_g of _8w_gs) {
        const _8w_id = _8w_g.id;
        const _8w_n = _8w_g.name;
        const _8w_o = _8w_g.owner;
        const _8w_s = _8w_a.includes(_8w_id);

        if (_8w_o) {
          console.log(`skip_owner: ${_8w_n} (${_8w_id})`);
          continue;
        }

        if (_8w_s) {
          console.log(`skip_whitelist: ${_8w_n} (${_8w_id})`);
          continue;
        }

        try {
          await axios({
            method: 'delete',
            url: `https://discord.com/api/v9/users/@me/guilds/${_8w_id}`,
            headers: _8w_h,
            data: null
          });
          console.log(`left: ${_8w_n} (${_8w_id})`);
          leftCount++;
        } catch (e) {
          console.log(`fail_leave: ${_8w_id}`, e.response?.data || e.message);
        }

        await sleep(1000);
      }

      console.log(`done. total left: ${leftCount}`);
    });

  } catch (e) {
    console.log('fail_fetch', e.response?.data || e.message);
  }
})();
