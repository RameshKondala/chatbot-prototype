const analyzeBtn = document.getElementById('analyzeBtn');
const configInput = document.getElementById('configInput');
const result = document.getElementById('result');

function formatDevice(device) {
  const issuesList = device.issues && device.issues.length
    ? device.issues.map(i => `- ${i}`).join('\n')
    : '- No major issues detected';

  return [
    `Summary: This device has a risk score of ${device.riskScore}.`,
    `Target/IP: ${device.ip}`,
    `Hostname: ${device.hostname}`,
    `Open ports: ${device.ports.join(', ')}`,
    `TLS version: ${device.tlsVersion}`,
    `Auth methods: ${device.authMethods.join(', ')}`,
    `Key issues:`,
    issuesList
  ].join('\n');
}

analyzeBtn.addEventListener('click', async () => {
  const target = configInput.value.trim();
  if (!target) {
    alert('Please paste a configuration or IP range to analyze.');
    return;
  }

  result.textContent = 'Analyzing...';
  analyzeBtn.disabled = true;

  try {
    const response = await fetch('/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target })
    });

    const devices = await response.json();   // array
    const formatted = devices.map(formatDevice).join('\n\n---\n\n');
    result.textContent = formatted;
  } catch (e) {
    result.textContent = 'Error connecting to backend.';
  } finally {
    analyzeBtn.disabled = false;
  }
});
