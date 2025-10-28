```markdown
# LyrnBase

WhatsApp Bot dengan support multiple prefix yang dibangun menggunakan Baileys dan CommonJS.

## ✨ Features

- 🔣 **Multi Prefix** - Support prefix: `!`, `#`, `.`, `/`, `~`
- 🚀 **Auto Command Load** - Otomatis load semua command
- 🎨 **Sticker Creator** - Buat sticker dari gambar
- 📥 **Media Downloader** - Download media dari URL
- 👥 **Group Management** - Fitur untuk group
- ⚡ **Fast & Lightweight** - Dibangun dengan CommonJS
```

## 📦 Installation

1. **Clone repository**
```bash
git clone https://github.com/marinhapeoppo-dev/LyrnBase.git
cd whatsapp-bot-multi-prefix
```

2. Install dependencies

```bash
npm install
```

3. Run the bot

```bash
npm start
```

4. Scan QR Code yang muncul di terminal

🔣 Usage

Bot support multiple prefix:

```
!help    #help    .help    /help    ~help
!ping    #ping    .ping    /ping    ~ping
!sticker #sticker .sticker /sticker ~sticker
```

🛠️ Command List

📝 General

· help - Menampilkan bantuan
· info - Info bot
· ping - Test response bot
· prefix - Lihat semua prefix

🎨 Sticker

· sticker - Buat sticker dari gambar
· stickerwm - Sticker dengan watermark

📥 Download

· download [url] - Download media dari URL
· tiktok [url] - Download video TikTok

📍 Group

· tagall - Mention semua member
· groupinfo - Info group

⚙️ Configuration

Edit config.json untuk custom setting:

```json
{
  "prefixes": ["!", "#", ".", "/", "~"],
  "owner": "62812xxxxxx@s.whatsapp.net",
  "sessionName": "session"
}
```

🎯 Add Custom Command

Buat file baru di folder commands/:

```javascript
module.exports = {
    name: 'namacommand',
    description: 'Deskripsi command',

    async execute(sock, message, args, prefix) {
        // Your code here
        await sock.sendMessage(message.key.remoteJid, { 
            text: `Hello! Prefix yang digunakan: ${prefix}` 
        });
    }
};
```

📁 Project Structure

```
whatsapp-bot-multi-prefix/
├── commands/          # Folder command
│   ├── help.js
│   ├── ping.js
│   ├── sticker.js
│   └── ...
├── config.json       # Configuration
├── index.js          # Main bot
├── package.json
└── README.md
```

🤝 Contributing

1. Fork repository ini
2. Buat feature branch: git checkout -b feature/namafitur
3. Commit changes: git commit -m 'Add some feature'
4. Push ke branch: git push origin feature/namafitur
5. Submit pull request

📝 License

MIT License - lihat LICENSE file untuk detail.

⚠️ Disclaimer

Bot ini dibuat untuk edukasi dan personal use. Pengguna bertanggung jawab penuh atas penggunaan bot. Ikuti Terms of Service WhatsApp.

👨‍💻 Developer

Dibuat dengan ❤️ oleh Martin

---

Note: Pastikan Node.js versi 14 atau lebih tinggi terinstall.

```

## 6. .gitignore

```gitignore
node_modules/
session/
*.json
!.gitignore
!package.json
!config.json
*.log
.DS_Store
.env
```