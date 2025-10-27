const makeWASocket = require('@whiskeysockets/baileys').default;
const QRCode = require('qrcode-terminal');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');

class WhatsAppBot {
    constructor() {
        this.sock = null;
        this.commands = new Map();
        
        // Multi prefix support
        this.prefixes = ['!', '#', '.', '/', '~'];
        this.config = this.loadConfig();
        
        this.init();
    }

    loadConfig() {
        const configPath = path.join(__dirname, 'config.json');
        if (fs.existsSync(configPath)) {
            return JSON.parse(fs.readFileSync(configPath, 'utf8'));
        }
        
        // Default config
        return {
            prefixes: ['!', '#', '.', '/', '~'],
            owner: '62812xxxxxx@s.whatsapp.net',
            sessionName: 'session'
        };
    }

    init() {
        this.loadCommands();
        this.connect();
    }

    loadCommands() {
        const commandsDir = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsDir).filter(file => 
            file.endsWith('.js') && !file.startsWith('_')
        );

        console.log(`📁 Loading ${commandFiles.length} commands...`);

        commandFiles.forEach(file => {
            try {
                const command = require(`./commands/${file}`);
                if (command.name && command.execute) {
                    this.commands.set(command.name, command);
                    console.log(`✅ Loaded command: ${command.name}`);
                }
            } catch (error) {
                console.error(`❌ Failed to load ${file}:`, error);
            }
        });

        console.log(`🎉 Successfully loaded ${this.commands.size} commands`);
        console.log(`🔣 Active prefixes: ${this.prefixes.join(', ')}`);
    }

    connect() {
        try {
            this.sock = makeWASocket({
                printQRInTerminal: false,
                auth: {
                    // Session akan disimpan otomatis
                }
            });

            this.setupEventHandlers();
        } catch (error) {
            console.error('Error connecting:', error);
        }
    }

    setupEventHandlers() {
        if (!this.sock) return;

        // QR Code Handler
        this.sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect, qr } = update;
            
            if (qr) {
                console.log('📱 Scan QR Code berikut:');
                QRCode.generate(qr, { small: true });
            }

            if (connection === 'close') {
                const shouldReconnect = new Boom(lastDisconnect?.error)?.output?.statusCode !== 401;
                console.log('🔌 Connection closed, reconnecting:', shouldReconnect);
                
                if (shouldReconnect) {
                    setTimeout(() => this.connect(), 3000);
                }
            } else if (connection === 'open') {
                console.log('🤖 Bot connected successfully!');
            }
        });

        // Message Handler
        this.sock.ev.on('messages.upsert', async (m) => {
            const message = m.messages[0];
            
            if (!message.message || message.key.fromMe) return;

            await this.handleMessage(message);
        });
    }

    extractMessageText(message) {
        const msgTypes = ['conversation', 'extendedTextMessage', 'imageMessage'];
        
        for (const type of msgTypes) {
            const text = message.message?.[type]?.text;
            if (text) return text;
        }
        return null;
    }

    getPrefix(messageText) {
        for (const prefix of this.prefixes) {
            if (messageText.startsWith(prefix)) {
                return prefix;
            }
        }
        return null;
    }

    async handleMessage(message) {
        try {
            const messageText = this.extractMessageText(message);
            if (!messageText) return;

            const prefix = this.getPrefix(messageText);
            if (!prefix) return;

            const commandText = messageText.slice(prefix.length).trim();
            const [commandName, ...args] = commandText.split(' ');
            
            const command = this.commands.get(commandName);

            if (command) {
                console.log(`🚀 Executing command: ${commandName} with prefix: ${prefix}`);
                await command.execute(this.sock, message, args, prefix);
            } else {
                await this.sendMessage(message.key.remoteJid, 
                    `❌ Command "${commandName}" tidak ditemukan.\n` +
                    `Ketik ${prefix}help untuk melihat daftar command.`
                );
            }
        } catch (error) {
            console.error('❌ Error handling message:', error);
            await this.sendMessage(message.key.remoteJid, 
                '❌ Terjadi error saat memproses command.'
            );
        }
    }

    async sendMessage(jid, text, quoted = null) {
        try {
            await this.sock.sendMessage(jid, { text }, { quoted });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

// Start the bot
const bot = new WhatsAppBot();