module.exports = {
    name: 'prefix',
    description: 'Lihat semua prefix yang tersedia',

    async execute(sock, message, args, prefix) {
        const prefixes = ['!', '#', '.', '/', '~'];
        const prefixList = prefixes.map(p => {
            return p === prefix ? `*${p}* ✅` : p;
        }).join(' | ');

        await sock.sendMessage(message.key.remoteJid, {
            text: `🔣 *AVAILABLE PREFIXES*\n\n${prefixList}\n\n_Contoh: ${prefixes[0]}ping, ${prefixes[1]}help, dll._`
        });
    }
};