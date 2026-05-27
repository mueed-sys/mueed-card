# Mueed Digital Business Card — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a premium dark-theme personal digital business card at mueed-card.vercel.app (+ GitHub mueed-sys/mueed-card).

**Architecture:** Pure HTML + CSS + minimal vanilla JS, zero build step. Single `index.html` with external `css/style.css` and `js/main.js`. QR code generated at runtime using qrcodejs (CDN). vCard downloaded client-side. Deployed to Vercel as a static site.

**Tech Stack:** HTML5, CSS3 (custom properties, animations), Vanilla JS, qrcodejs (CDN), Vercel static hosting, GitHub Actions–free CI via Vercel git integration.

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Full page markup, CDN link for qrcodejs |
| `css/style.css` | All styles: tokens, layout, components, animations |
| `js/main.js` | Stagger animation, QR code render, vCard download |
| `assets/profile.jpg` | Profile photo (user to drop in; placeholder used initially) |
| `vercel.json` | Static routing config (`cleanUrls`, `trailingSlash`) |
| `.gitignore` | Standard ignores |

---

## Task 1: Project Scaffolding

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `vercel.json`
- Create: `.gitignore`

- [ ] **Step 1: Init git and create root files**

```bash
cd /Users/mmz/mueed-card
git init
touch index.html css/style.css js/main.js vercel.json .gitignore assets/.gitkeep
```

- [ ] **Step 2: Write `.gitignore`**

```
.DS_Store
node_modules/
dist/
.vercel/
```

- [ ] **Step 3: Write `vercel.json`**

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

- [ ] **Step 4: Initial commit**

```bash
git add -A
git commit -m "chore: scaffold mueed-card project"
```

---

## Task 2: HTML Structure

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Write full HTML markup**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Mueed Zahid — Director of Business Development at MSS Tech, Founder of BHMonitor & Bahrain Blood Donor Network" />
  <title>Mueed Zahid</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <main class="card" id="card">

    <!-- Profile -->
    <section class="profile" data-anim="0">
      <div class="avatar-ring">
        <img src="assets/profile.jpg" alt="Mueed Zahid" class="avatar" onerror="this.src='assets/placeholder.svg'" />
      </div>
    </section>

    <!-- Name -->
    <section class="identity" data-anim="1">
      <h1 class="display-name">Mueed Zahid</h1>
      <p class="full-name">Mohammad Mueed Zahid Izhar Ulhaq</p>
    </section>

    <!-- Role Pills -->
    <section class="roles" data-anim="2">
      <a href="https://msstech.ai" class="role-pill" target="_blank" rel="noopener">
        <span class="pill-dot"></span>Director of Business Development · MSS Tech
      </a>
      <a href="https://bhmonitor.com" class="role-pill" target="_blank" rel="noopener">
        <span class="pill-dot"></span>Founder · BHMonitor
      </a>
      <a href="https://bloodbh.com" class="role-pill" target="_blank" rel="noopener">
        <span class="pill-dot"></span>Founder · Bahrain Blood Donor Network
      </a>
    </section>

    <!-- Contact Buttons -->
    <section class="contacts" data-anim="3">
      <a href="tel:+97366989288" class="contact-btn">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.06 2.18 2 2 0 012 .06h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
        <span>Call +973 6698 9288</span>
      </a>
      <a href="https://wa.me/97366989288" class="contact-btn" target="_blank" rel="noopener">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span>WhatsApp</span>
      </a>
      <a href="mailto:mueed@msstech.ai" class="contact-btn">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <span>mueed@msstech.ai</span>
      </a>
      <a href="https://linkedin.com/in/ADD-YOUR-URL" class="contact-btn" target="_blank" rel="noopener">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        <span>LinkedIn</span>
      </a>
    </section>

    <!-- Save Contact -->
    <section class="save-section" data-anim="4">
      <button class="save-btn" id="saveContact">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
        Save Contact
      </button>
    </section>

    <!-- Companies -->
    <section class="companies" data-anim="5">
      <h2 class="section-label">Ventures</h2>
      <div class="company-card">
        <div class="company-info">
          <span class="company-name">MSS Tech</span>
          <span class="company-tagline">AI & Technology Solutions</span>
        </div>
        <div class="company-links">
          <a href="https://msstech.ai" class="company-link" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            msstech.ai
          </a>
          <a href="https://instagram.com/msstech.ai" class="company-link" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            @msstech.ai
          </a>
        </div>
      </div>
      <div class="company-card">
        <div class="company-info">
          <span class="company-name">BHMonitor</span>
          <span class="company-tagline">Bahrain Safety Monitoring</span>
        </div>
        <div class="company-links">
          <a href="https://bhmonitor.com" class="company-link" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            bhmonitor.com
          </a>
          <a href="https://instagram.com/bhmonitor" class="company-link" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            @bhmonitor
          </a>
        </div>
      </div>
      <div class="company-card">
        <div class="company-info">
          <span class="company-name">Bahrain Blood Donor Network</span>
          <span class="company-tagline">Connecting Lives · bloodbh.com</span>
        </div>
        <div class="company-links">
          <a href="https://bloodbh.com" class="company-link" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            bloodbh.com
          </a>
          <a href="https://instagram.com/bloodbh" class="company-link" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            @bloodbh
          </a>
        </div>
      </div>
    </section>

    <!-- Location -->
    <section class="location" data-anim="6">
      <span class="location-text">🇧🇭 Based in Manama, Bahrain</span>
    </section>

    <!-- QR Code -->
    <section class="qr-section" data-anim="7">
      <div id="qrcode"></div>
      <p class="qr-label">Scan to save my contact</p>
    </section>

  </main>

  <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add HTML structure for business card"
```

---

## Task 3: CSS — Tokens, Layout & Components

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Write complete stylesheet**

```css
/* ── Design Tokens ── */
:root {
  --bg: #0A0F1C;
  --bg-card: #0F1628;
  --bg-glass: rgba(255, 255, 255, 0.04);
  --border-glass: rgba(255, 255, 255, 0.08);
  --text-primary: #F0F4FF;
  --text-muted: #6B7A9F;
  --text-dim: #3A4560;
  --cyan: #00b4d8;
  --purple: #8b5cf6;
  --magenta: #d946ef;
  --gradient: linear-gradient(135deg, var(--cyan), var(--purple), var(--magenta));
  --gradient-text: linear-gradient(90deg, var(--cyan), var(--purple));
  --radius-pill: 9999px;
  --radius-card: 16px;
  --radius-btn: 14px;
  --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --font: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-tap-highlight-color: transparent; }
body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font);
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  padding: 40px 16px 60px;
  /* subtle radial glow at top */
  background-image: radial-gradient(ellipse 80% 40% at 50% -10%, rgba(0,180,216,0.08), transparent);
}

/* ── Card ── */
.card {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

/* ── Avatar ── */
.profile { display: flex; justify-content: center; }
.avatar-ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  padding: 3px;
  background: var(--gradient);
  background-size: 200% 200%;
  animation: shimmer 4s ease-in-out infinite;
  position: relative;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  display: block;
  background: var(--bg-card);
}
@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* ── Identity ── */
.identity { text-align: center; }
.display-name {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: 6px;
}
.full-name {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 400;
  letter-spacing: 0.01em;
}

/* ── Role Pills ── */
.roles {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.role-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: var(--radius-pill);
  background: var(--bg-glass);
  border: 1px solid var(--border-glass);
  color: var(--text-primary);
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  transition: border-color var(--transition), background var(--transition), transform var(--transition);
  position: relative;
  overflow: hidden;
}
.role-pill::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid transparent;
  background: var(--gradient) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  opacity: 0.5;
}
.role-pill:hover, .role-pill:active {
  background: rgba(255,255,255,0.07);
  transform: scale(1.01);
}
.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gradient);
  flex-shrink: 0;
}

/* ── Contact Buttons ── */
.contacts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.contact-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: var(--radius-btn);
  background: var(--bg-glass);
  border: 1px solid var(--border-glass);
  color: var(--text-primary);
  font-size: 0.925rem;
  font-weight: 500;
  text-decoration: none;
  transition: background var(--transition), border-color var(--transition), transform var(--transition);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
.contact-btn:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.15);
}
.contact-btn:active { transform: scale(0.98); }
.btn-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  opacity: 0.8;
}

/* ── Save Contact Button ── */
.save-section { width: 100%; }
.save-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px;
  border-radius: var(--radius-btn);
  background: var(--gradient);
  background-size: 200% 200%;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  animation: shimmer 4s ease-in-out infinite;
  transition: opacity var(--transition), transform var(--transition);
}
.save-btn:hover { opacity: 0.92; }
.save-btn:active { transform: scale(0.98); }
.save-btn .btn-icon { width: 18px; height: 18px; }

/* ── Companies ── */
.companies { width: 100%; }
.section-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.company-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: var(--radius-card);
  background: var(--bg-glass);
  border: 1px solid var(--border-glass);
  margin-bottom: 8px;
  gap: 12px;
}
.company-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.company-name {
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.company-tagline {
  font-size: 0.7rem;
  color: var(--text-muted);
}
.company-links {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.company-link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-glass);
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition), border-color var(--transition), background var(--transition);
  white-space: nowrap;
}
.company-link svg { width: 12px; height: 12px; flex-shrink: 0; }
.company-link:hover {
  color: var(--text-primary);
  border-color: rgba(139,92,246,0.4);
  background: rgba(139,92,246,0.08);
}

/* ── Location ── */
.location { text-align: center; }
.location-text {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* ── QR Code ── */
.qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
#qrcode {
  padding: 12px;
  background: #fff;
  border-radius: 12px;
  display: inline-block;
  line-height: 0;
}
#qrcode canvas, #qrcode img { display: block; }
.qr-label {
  font-size: 0.75rem;
  color: var(--text-dim);
  letter-spacing: 0.03em;
}

/* ── Stagger Animation ── */
[data-anim] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
[data-anim].visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Responsive ── */
@media (max-width: 400px) {
  .display-name { font-size: 1.7rem; }
  .company-card { flex-direction: column; align-items: flex-start; }
  .company-links { width: 100%; }
  .company-link { flex: 1; justify-content: center; }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add complete CSS styling"
```

---

## Task 4: JavaScript — Animations, QR Code, vCard

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Write main.js**

```javascript
// Stagger fade-in on load
const animEls = document.querySelectorAll('[data-anim]');
animEls.forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), i * 100);
});

// QR code pointing to current page URL
new QRCode(document.getElementById('qrcode'), {
  text: window.location.href,
  width: 140,
  height: 140,
  colorDark: '#000000',
  colorLight: '#ffffff',
  correctLevel: QRCode.CorrectLevel.M,
});

// vCard download
document.getElementById('saveContact').addEventListener('click', () => {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Ulhaq;Mohammad Mueed Zahid Izhar;;;',
    'FN:Mohammad Mueed Zahid Izhar Ulhaq',
    'NICKNAME:Mueed Zahid',
    'ORG:MSS Tech',
    'TITLE:Director of Business Development',
    'TEL;TYPE=CELL,VOICE:+97366989288',
    'EMAIL:mueed@msstech.ai',
    'URL:https://msstech.ai',
    'ADR;TYPE=WORK:;;Manama;Bahrain',
    'END:VCARD',
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Mueed-Zahid.vcf';
  a.click();
  URL.revokeObjectURL(url);
});
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: add animations, QR code, and vCard download"
```

---

## Task 5: Placeholder Profile Photo

**Files:**
- Create: `assets/placeholder.svg`

- [ ] **Step 1: Create SVG placeholder (used when profile.jpg is missing)**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <circle cx="60" cy="60" r="60" fill="#1a2240"/>
  <circle cx="60" cy="48" r="22" fill="#2a3560"/>
  <ellipse cx="60" cy="95" rx="34" ry="24" fill="#2a3560"/>
</svg>
```

- [ ] **Step 2: Note for profile photo**

Drop `assets/profile.jpg` (or `profile.png` — update `onerror` accordingly) into the `assets/` folder. Recommended: crop to square, at least 240×240px.

- [ ] **Step 3: Commit**

```bash
git add assets/
git commit -m "feat: add SVG profile placeholder"
```

---

## Task 6: GitHub + Vercel Deploy

- [ ] **Step 1: Create GitHub repo**

```bash
gh repo create mueed-sys/mueed-card --public --source=. --remote=origin --push
```

- [ ] **Step 2: Verify Vercel picks it up**

Go to vercel.com → Add New Project → Import `mueed-sys/mueed-card`. 
- Framework Preset: **Other**
- Root Directory: `/`
- Build Command: *(leave empty)*
- Output Directory: *(leave empty)*

Deploy. Note the URL (e.g. `mueed-card.vercel.app`).

- [ ] **Step 3: Update LinkedIn placeholder**

In `index.html`, find `href="https://linkedin.com/in/ADD-YOUR-URL"` and replace with the real URL when available.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: ready for production"
git push
```

---

## Post-Deploy Checklist

- [ ] Drop real `assets/profile.jpg` and push
- [ ] Confirm LinkedIn URL and update
- [ ] Confirm Instagram handles: `@bhmonitor`, `@bloodbh`
- [ ] Test "Save Contact" on iPhone — opens Contacts app
- [ ] Test "Save Contact" on Android
- [ ] Test QR code scans correctly
- [ ] Test all call/WhatsApp/email links on mobile
