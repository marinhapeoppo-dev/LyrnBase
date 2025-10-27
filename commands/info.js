module.exports = {
    name: 'info',
    description: 'Menampilkan info bot',

    async execute(sock, message, args, prefix) {
        const infoText = `
🤖 *BOT INFORMATION*

📡 *Platform:* LyrnBase
⚡ *Module:* CommonJS
🔧 *Framework:* Baileys
🔣 *Prefixes:* ! # . / ~
📊 *Commands:* 10+

✨ *Features:*
• Multi-prefix support
• Auto-command loading  
• Sticker creator
• Media downloader
• Group management

🚀 *Usage:*
!help | #help | .help
!ping | #ping | .ping

_📞 Contact owner for more info_
        `.trim();

        await sock.sendMessage(message.key.remoteJid, { text: infoText });
    }
};