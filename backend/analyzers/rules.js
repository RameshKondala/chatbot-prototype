const checkConfigSecurity = (device) => {
    const issues = [];
    
    // NIST IoT baseline checks
    if (!device.firmware || device.firmware.includes('default')) 
      issues.push('Default firmware - update immediately');
    if (device.ports.includes('23')) issues.push('Telnet exposed - disable');
    if (device.tlsVersion && parseFloat(device.tlsVersion) < 1.2) 
      issues.push('Weak TLS version');
    if (device.authMethods.includes('none') || device.authMethods.includes('default'))
      issues.push('Weak/no authentication');
    
    const riskScore = Math.min(100, issues.length * 20);
    return { issues, riskScore };
  };
  
  module.exports = { checkConfigSecurity };
  