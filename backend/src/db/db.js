const mongoose = require('mongoose');
const dns = require('dns');

// Set reliable DNS servers (Google & Cloudflare) to prevent querySrv ECONNREFUSED on Windows / local ISP DNS
try {
    dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
    console.warn('Could not set custom DNS servers:', e);
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

module.exports = connectDB;