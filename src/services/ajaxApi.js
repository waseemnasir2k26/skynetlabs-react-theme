function getAjaxUrl() {
  return window.skynetlabsData?.ajaxUrl || '/wp-admin/admin-ajax.php';
}

function getNonce() {
  return window.skynetlabsData?.nonce || '';
}

export async function submitContactForm({ name, email, phone, service, message }) {
  const form = new FormData();
  form.append('action', 'skynetlabs_contact');
  form.append('nonce', getNonce());
  form.append('name', name);
  form.append('email', email);
  if (phone) form.append('phone', phone);
  if (service) form.append('service', service);
  form.append('message', message);

  const response = await fetch(getAjaxUrl(), { method: 'POST', body: form });
  return response.json();
}

export async function sendChatMessage(message, history = []) {
  const form = new FormData();
  form.append('action', 'skynet_chatgpt_message');
  form.append('nonce', getNonce());
  form.append('message', message);
  form.append('history', JSON.stringify(history));

  const response = await fetch(getAjaxUrl(), { method: 'POST', body: form });
  return response.json();
}

export async function captureLead(email, name = '', source = 'modal') {
  const form = new FormData();
  form.append('action', 'skynetlabs_lead_capture');
  form.append('nonce', getNonce());
  form.append('email', email);
  form.append('name', name);
  form.append('source', source);

  const response = await fetch(getAjaxUrl(), { method: 'POST', body: form });
  return response.json();
}
