module.exports = {
    name: 'ping',
    description: 'Test bot response time',

    async execute(sock, message, args, prefix) {
        const start = Date.now();
        await sock.sendMessage(message.key.remoteJid, { text: '🏓 Pong!' });
        const latency = Date.now() - start;
        
        await sock.sendMessage(message.key.remoteJid, { 
            text: `📊 Latency: ${latency}ms\n⚡ Prefix: ${prefix}` 
        });
    }
};