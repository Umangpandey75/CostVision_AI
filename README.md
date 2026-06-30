<!-- ═══════════ ANIMATED HEADER ═══════════ -->

# 🚀 CostVision AI

<div align="center">
<!-- ═══════════ TYPING ANIMATION ═══════════ -->

<br/>

<!-- ═══════════ BADGES ═══════════ -->
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
&nbsp;
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
&nbsp;
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
&nbsp;
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<br/>

![Repo Size](https://img.shields.io/github/repo-size/Umangpandey75/CostVision_AI?style=flat-square&color=6AD3F7&label=Repo+Size)
&nbsp;
![Last Commit](https://img.shields.io/github/last-commit/Umangpandey75/CostVision_AI?style=flat-square&color=58A6FF&label=Last+Commit)
&nbsp;
![License](https://img.shields.io/github/license/Umangpandey75/CostVision_AI?style=flat-square&color=27AE60)
&nbsp;
![Stars](https://img.shields.io/github/stars/Umangpandey75/CostVision_AI?style=social)
&nbsp;
![Forks](https://img.shields.io/github/forks/Umangpandey75/CostVision_AI?style=social)

</div>

<div align="center">

<a href="https://spendinspenza.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Website-00C853?style=for-the-badge" alt="Live Demo"/>
</a>

</div>

-----

## 💸 What is CostVision AI?

**CostVision AI** is an intelligent, free audit platform designed to help startups analyze and optimize their AI tool spending. Most teams overpay for subscriptions to tools like ChatGPT, Claude, Copilot, and Cursor without realizing it. CostVision AI instantly analyzes your usage and provides actionable recommendations to cut costs by 30-60%.

Whether you're an indie hacker or scaling a massive team — **CostVision AI** gives you the financial visibility you need in the AI era.

> *"Find out if you're overpaying for AI tools. Stop guessing, start optimizing."*

### ✨ Core Philosophy
- 🎯 **Simplicity first** — clean, intuitive UI that asks only what is necessary
- ⚡ **Speed** — instant audit generation in milliseconds
- 📊 **Actionable Insights** — we don't just show your spend, we tell you exactly how to cut it

---

## 🚀 Features

<div align="center">

| Feature | Description | Status |
|---------|-------------|--------|
| 💰 **Instant Spend Audit** | Calculates current monthly & annual AI expenses instantly | ✅ Active |
| 🤖 **Smart Tool Optimization** | Automatically detects overkill plans and suggests cheaper alternatives | ✅ Active |
| 📄 **Dynamic PDF Reports** | Generates beautiful, shareable PDF documents of your audit results | ✅ Active |
| 🌐 **Modern Next.js Frontend** | Beautiful glassmorphism UI with subtle, premium micro-animations | ✅ Active |
| ✉️ **Automated Emails** | Built-in email capabilities via Resend for sending reports & leads | ✅ Active |
| 🛡️ **Rate Limiting** | Integrated API protection to prevent spam and abuse | ✅ Active |

</div>

---

## 🛠️ Tech Stack

<div align="center">

### 💻 Frontend & Framework
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### 🧠 Logic & Data
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge)

### 🔧 Tools & DevOps
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)

</div>

---

## 🗂️ Project Structure

```
📦 CostVision_AI/
├── 📁 app/                ← Next.js App Router (Pages, Layouts, API Routes)
├── 📁 components/         ← Reusable React UI Components (AuditResults, SpendForm, etc.)
├── 📁 data/               ← Core Engine Logic, Pricing Data, and Rate Limiters
├── 📁 public/             ← Static assets and icons
└── 📄 globals.css         ← Global Tailwind styling & animations
```

---

## ⚙️ Architecture Overview

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "background":         "#f8fafc",
    "primaryColor":       "#ffffff",
    "primaryTextColor":   "#1e3a8a",
    "primaryBorderColor": "#3b82f6",
    "lineColor":          "#3b82f6",
    "secondaryColor":     "#eff6ff",
    "tertiaryColor":      "#dbeafe",
    "fontFamily":         "Inter, sans-serif"
  }
}}%%
flowchart LR
    A["👤 User Inputs Stack"] --> B["SpendForm\n(Frontend)"]
    B --> C{"auditEngine.js\n(Logic Core)"}
    C --> D["Pricing DB\nLookup"]
    C --> E["Optimization\nAlgorithms"]
    D --> F["📊 Generate Report"]
    E --> F
    F --> G["AuditResults UI"]
    G --> H["📄 Export as PDF"]
```

---

## 🚦 Quick Start

### Prerequisites

```bash
# Make sure you have Node.js 18+ installed
node --version

# Install dependencies
npm install
```

### 🖥️ Run the Web Interface Locally

```bash
# 1. Clone the repository
git clone https://github.com/Umangpandey75/CostVision_AI.git

# 2. Navigate to the project directory
cd CostVision_AI

# 3. Start the development server
npm run dev

# 4. Open http://localhost:3000 in your browser
```

---

## 🎮 How to Use

<div align="center">

```
  Step 1             Step 2              Step 3              Step 4
     💼                 🛠️                  🧠                  📄
Input Team Size  →  Select AI Tools  →  Engine Audits  →  Get PDF Report
```

</div>

### 🗣️ Core Workflows

| Action | Result |
|---------|--------|
| **Add a Tool** | Selects from predefined tools (Claude, ChatGPT, etc.) |
| **Run Audit** | Calculates current spend vs optimized spend instantly |
| **Download PDF** | Generates a perfectly formatted, branded PDF report |
| **Share Report** | Copies a shareable URL to send to stakeholders |

---

## 📸 Interface Highlights

<div align="center">

> ☀️ **Clean, Premium SaaS UI** — minimalist, trustworthy, and focused

```
┌──────────────────────────────────────────┐
│                                          │
│    [ - ]  CostVision AI                  │
│                                          │
│   ┌────────────────────────────────┐     │
│   │ "Are you overpaying for AI?"   │     │
│   └────────────────────────────────┘     │
│                                          │
│          [  Run Free Audit  ]            │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

**Design System:** Modern gradients, soft radial glows, subtle entrance animations, and crisp typography.

</div>

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Here's how you can help:

```bash
# 1. Fork the repository on GitHub
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m '✨ Add AmazingFeature'

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request 🎉
```

### 💡 Ideas for Contribution
- [ ] 🌍 Expand pricing database with more specialized AI tools
- [ ] 📊 Add historical spend tracking and charts
- [ ] 🔐 Implement user accounts to save multiple audits
- [ ] 📧 Enhance email sequences for captured leads

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 👨‍💻 Author

<div align="center">

### **Umang Pandey**
*Software Developer · UI/UX Enthusiast · Full Stack Engineer*

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:umangpandey.co@gmail.com)
&nbsp;
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/umang-pandey-01b486273)
&nbsp;
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Umangpandey75)
&nbsp;
[![Portfolio](https://img.shields.io/badge/Portfolio-6AD3F7?style=for-the-badge&logo=vercel&logoColor=black)](https://umangpandey.vercel.app)

*"Building elegant solutions for modern problems. ✨"*

</div>

---

## ⭐ Show Your Support

If **CostVision AI** helped you optimize your spend, please give it a ⭐ — it means the world!

<div align="center">

[![Star this repo](https://img.shields.io/badge/⭐_Star_this_repo-FFD700?style=for-the-badge)](https://github.com/Umangpandey75/CostVision_AI/stargazers)
&nbsp;
[![Fork this repo](https://img.shields.io/badge/🍴_Fork_it-58A6FF?style=for-the-badge)](https://github.com/Umangpandey75/CostVision_AI/fork)
&nbsp;
[![Share on Twitter](https://img.shields.io/badge/Share_on_Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/intent/tweet?text=Check+out+CostVision+AI+by+%40Umangpandey75!+Stop+overpaying+for+AI+tools!+%F0%9F%92%B8%E2%9C%A8&url=https://github.com/Umangpandey75/CostVision_AI)

</div>
---
<!-- ═══════════ FOOTER WAVE ═══════════ -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3b82f6,40:1e3a8a,70:172554,100:0d1117&height=120&section=footer" width="100%"/>

<div align="center">

*Made with ❤️ by [Umang Pandey](https://github.com/Umangpandey75) · © 2026 CostVision AI*

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Umangpandey75.CostVision_AI&left_color=3b82f6&right_color=6AD3F7&left_text=Visitors)
</div>
