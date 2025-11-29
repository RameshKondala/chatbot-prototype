const express = require('express');
const nmap = require('node-nmap');
const Device = require('../models/device');
const { checkConfigSecurity } = require('../analyzers/rules');

const router = express.Router();

// Basic NMAP scan + config analysis
router.post('/scan', async (req, res) => {
  const { target } = req.body; // e.g. "192.168.1.0/24"
  
  const quickscan = new nmap.QuickScan(target);
  quickscan.on('complete', async (data) => {
    const devices = [];
    for (const host of data.hosts) {
      const device = {
        ip: host.address,
        hostname: host.hostnames[0]?.name || 'unknown',
        ports: host.ports.map(p => p.port),
        services: host.ports.map(p => ({ name: p.service, version: p.version }))
      };
      
      // Mock TLS/auth detection (extend with real APIs)
      device.tlsVersion = '1.0'; // From real probe
      device.authMethods = ['default']; // From banner grab
      
      const analysis = checkConfigSecurity(device);
      device.riskScore = analysis.riskScore;
      device.issues = analysis.issues;
      
      await new Device(device).save();
      devices.push(device);
    }
    res.json(devices);
  });
  
  quickscan.startScan();
});

module.exports = router;
