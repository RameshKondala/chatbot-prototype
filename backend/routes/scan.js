const express = require('express');
const nmap = require('node-nmap');
const Device = require('../models/device');
const { checkConfigSecurity } = require('../analyzers/rules');

const router = express.Router();

// Basic NMAP scan + config analysis
router.post('/scan', async (req, res) => {
  const { target } = req.body;

  try {
    const device = {
      ip: target || '192.168.1.10',
      hostname: 'example-device',
      ports: [22, 80],
      services: [
        { name: 'ssh', version: 'OpenSSH 7.6' },
        { name: 'http', version: 'Apache 2.4' }
      ],
      tlsVersion: '1.0',
      authMethods: ['default']
    };

    const analysis = checkConfigSecurity(device);
    device.riskScore = analysis.riskScore;
    device.issues = analysis.issues;

    await new Device(device).save();

    res.json([device]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Scan failed on server.' });
  }
});


module.exports = router;
