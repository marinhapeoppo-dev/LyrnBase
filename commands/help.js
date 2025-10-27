module.exports = {
    name: 'help',
    description: 'Menampilkan daftar command',

    async execute(sock, message, args, prefix) {
        const commands = [
            `🤖 *BOT COMMANDS* (Prefix: ${prefix})`,
            '',
            '📝 *General*',
            `${prefix}help - Menampilkan bantuan`,
            `${prefix}info - Info bot`,
            `${prefix}ping - Test response`,
            `${prefix}prefix - Lihat semua prefix`,
            '',
            '🎨 *Sticker*',
            `${prefix}sticker - Buat sticker dari gambar`,
            `${prefix}stickerwm - Sticker dengan watermark`,
            '',
            '📥 *Download*',
            `${prefix}download [url] - Download media`,
            `${prefix}tiktok [url] - Download TikTok`,
            '',
            '📍 *Group*',
            `${prefix}tagall - Mention semua member`,
            `${prefix}groupinfo - Info group`,
            '',
            '⚙️ *Owner*',
            `${prefix}eval [code] - Execute code`,
            `${prefix}broadcast [text] - Broadcast message`,
            '',
            '_✨ LyrnBase_'
        ].join('\n');

        await sock.sendMessage(message.key.remoteJid, { text: commands });
    }
};