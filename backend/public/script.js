const analyzeBtn = document.getElementById('analyzeBtn');
const configInput = document.getElementById('configInput');
const result = document.getElementById('result');

analyzeBtn.addEventListener('click', async () => {
  const target = configInput.value.trim();   // this is the scan target, e.g. "192.168.1.0/24"
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

    const data = await response.json();   // array of devices
    result.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    result.textContent = 'Error connecting to backend.';
  } finally {
    analyzeBtn.disabled = false;
  }
});
