// Stagger entrance — each section 120ms apart
document.querySelectorAll('[data-anim]').forEach(el => {
  const delay = parseInt(el.dataset.anim, 10) * 120;
  setTimeout(() => el.classList.add('visible'), delay);
});

// QR code — always reflects the current URL (works on any domain)
if (typeof QRCode !== 'undefined') {
  new QRCode(document.getElementById('qrcode'), {
    text: window.location.href,
    width: 144,
    height: 144,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M,
  });
}

// vCard download — vCard 3.0 for max iOS + Android compat
document.getElementById('saveContact').addEventListener('click', () => {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Ulhaq;Mohammad Mueed Zahid Izhar;;;',
    'FN:Mohammad Mueed Zahid Izhar Ulhaq',
    'NICKNAME:Mueed Zahid',
    'ORG:MSS Tech',
    'TITLE:Director of Business Development',
    'TEL;TYPE=CELL,VOICE:+97366989288',
    'EMAIL;TYPE=WORK:mueed@msstech.ai',
    'URL;TYPE=WORK:https://msstech.ai',
    'ADR;TYPE=WORK:;;Manama;;; ;Bahrain',
    'NOTE:Founder of BHMonitor (bhmonitor.com) and Bahrain Blood Donor Network (bloodbh.com)',
    'END:VCARD',
  ];
  const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Mueed-Zahid.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
