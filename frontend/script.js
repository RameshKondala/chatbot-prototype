document.addEventListener('DOMContentLoaded', function() {
  const chatInput = document.querySelector('.chat-input textarea');
  const sendChatBtn = document.querySelector('.chat-input button');
  const chatbox = document.querySelector('.chatbox');
  const spinner = document.getElementById('spinner');

  function createChatLi(message, className) {
    const chatLi = document.createElement('li');
    chatLi.classList.add('chat', className);
    chatLi.innerHTML = `<p>${message}</p>`;
    return chatLi;
  }

  async function sendMessageToBackend(message) {
    const response = await fetch('/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data.reply;
  }

  async function handleChat() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    sendChatBtn.disabled = true;
    chatbox.appendChild(createChatLi(userMessage, 'chat-outgoing'));
    chatInput.value = '';
    chatbox.appendChild(createChatLi('Thinking...', 'chat-incoming'));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    spinner.style.display = 'inline-block';

    try {
      const aiReply = await sendMessageToBackend(userMessage);
      chatbox.lastElementChild.innerHTML = `<p>${aiReply}</p>`;
    } catch (e) {
      chatbox.lastElementChild.innerHTML = `<p class="error">Bot unavailable. Please try again.</p>`;
    } finally {
      spinner.style.display = 'none';
      chatbox.scrollTo(0, chatbox.scrollHeight);
      sendChatBtn.disabled = false;
    }
  }

  sendChatBtn.addEventListener('click', handleChat);
  chatInput.addEventListener('input', () => {
    sendChatBtn.disabled = !chatInput.value.trim();
  });
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendChatBtn.disabled) handleChat();
    }
  });
});
