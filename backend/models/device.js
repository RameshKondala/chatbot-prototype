const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  ip: String,
  hostname: String,
  firmware: String,
  ports: [String],
  services: [{ name: String, version: String }],
  tlsVersion: String,
  authMethods: [String],
  riskScore: { type: Number, default: 0 },
  issues: [String],
  scannedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);

