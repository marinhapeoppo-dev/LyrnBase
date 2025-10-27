const { downloadMediaMessage } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'sticker',
    description: 'Membuat sticker dari gambar',

    async execute(sock, message, args, prefix) {
        try {
            const isImage = message.message?.imageMessage || 
                           message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;

            if (!isImage) {
                await sock.sendMessage(message.key.remoteJid, {
                    text: `❌ Kirim gambar atau reply gambar dengan caption ${prefix}sticker`
                }, { quoted: message });
                return;
            }

            await sock.sendMessage(message.key.remoteJid, {
                text: '🔄 Membuat sticker...'
            });

            const mediaBuffer = await downloadMediaMessage(
                message,
                'buffer',
                {},
                {
                    reuploadRequest: sock.updateMediaMessage
                }
            );

            await sock.sendMessage(message.key.remoteJid, {
                sticker: mediaBuffer
            });

        } catch (error) {
            console.error('Sticker error:', error);
            await sock.sendMessage(message.key.remoteJid, {
                text: '❌ Gagal membuat sticker'
            });
        }
    }
};