// Stagger fade-in on load — each section 100ms after the previous
const animEls = document.querySelectorAll('[data-anim]');
animEls.forEach((el, i) => {
  const delay = parseInt(el.dataset.anim, 10) * 100;
  setTimeout(() => el.classList.add('visible'), delay);
});

// QR code — points to whatever URL this page is served from
// (works on localhost, Vercel preview, and custom domain without any changes)
if (typeof QRCode !== 'undefined') {
  new QRCode(document.getElementById('qrcode'), {
    text: window.location.href,
    width: 148,
    height: 148,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M,
  });
}

// vCard download — opens Contacts app on iOS/Android when tapped
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
