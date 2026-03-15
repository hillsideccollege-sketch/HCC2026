# Hillside Christian College — Official Website

> **"His Destiny, Our Aim"**
> 125 Theo-Ben Gurirab Street, Walvis Bay, Namibia

---

## 🌐 Live Site

Hosted on **GitHub Pages**:  
`https://<your-github-username>.github.io/<repo-name>/`

---

## 📁 File Structure

```
/
├── index.html       ← Main website (single-page application)
├── style.css        ← All styling & responsive design
├── script.js        ← Interactivity, form, PDF/Word/Excel export, EmailJS
├── README.md        ← This file
└── .nojekyll        ← Disables Jekyll processing on GitHub Pages
```

---

## 🚀 Deploying to GitHub Pages

1. **Create a new GitHub repository** (e.g. `hillside-website`)
2. Upload all files:  `index.html`, `style.css`, `script.js`, `README.md`, `.nojekyll`
3. Go to **Settings → Pages**
4. Under *Source*, select **Deploy from a branch** → `main` → `/ (root)`
5. Click **Save** — your site will be live within a minute or two.

---

## ✉️ EmailJS Configuration

The form uses [EmailJS](https://www.emailjs.com/) for email sending.  
Update the constants at the top of `script.js` if your service changes:

```js
const SCHOOL_EMAIL = 'hillside.c.college@gmail.com';
const EJS_KEY      = 'Ay-Ttl1k84PIXpD3J';   // EmailJS Public Key
const EJS_SVC      = 'service_qho7zce';       // EmailJS Service ID
const EJS_TPL      = 'template_tsoi64l';      // EmailJS Template ID
```

---

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Printable PDF application form (auto-generated)
- ✅ Word (.docx) & Excel (.xlsx) export
- ✅ Direct email to school via EmailJS
- ✅ WhatsApp integration
- ✅ Document upload checklist
- ✅ Automatic year updates (no manual editing needed each year)
- ✅ Namibian public holiday banner
- ✅ Animated scroll reveals
- ✅ FAQ accordion
- ✅ SEO & Open Graph meta tags

---

## 📞 Contact

**Phone / WhatsApp:** +264 81 823 1675  
**Email:** hillside.c.college@gmail.com  
**Address:** 125 Theo-Ben Gurirab Street, Walvis Bay, Namibia
