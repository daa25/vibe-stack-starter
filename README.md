# 🎯 VibeStack

**Three monetization funnels in one Windows-friendly starter kit**

Ship plug-and-play funnels locally, deploy fast. Prioritize cash now, polish later.

---

## 🚀 Quick Start

```powershell
# Clone the repository
git clone https://github.com/yourusername/vibe-stack.git
cd vibe-stack

# Start all services
./start_all.ps1
```

**Service URLs:**
- VibeLink API: `http://localhost:5102`
- ReapSow-Lite API: `http://localhost:5201`
- TravelQuest Hub: `http://localhost:5301`
- Main Frontend: `http://localhost:8080` (Vite dev server)

---

## 💰 The Three Funnels

### 1️⃣ VibeLink - Property Enhancement
**Model:** Lead broker + DIY kit sales

**Ports:** 5101 (landing), 5102 (API)

**Features:**
- Quote request form with lead capture
- Automatic append to `leads.csv`
- Webhook integration (Airtable/Notion/Zapier)
- DIY enhancement kits showcase
- QR code support for tutorials

**Revenue:**
- Broker fee per qualified lead ($25-$50)
- DIY kit sales ($299-$799)

**Setup:**
```powershell
cd VibeLink/server
./start.ps1
```

Configure webhook in `.env`:
```env
WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/
```

---

### 2️⃣ ReapSow-Lite - Zero-Capital E-Commerce
**Model:** Service setup + future Stripe Connect

**Port:** 5201

**Features:**
- `/api/simulate`: Calculate margins, profit, hold days
- `/api/optimize-listing`: Rule-based title/description optimizer (LLM-ready)
- `/api/stripe-connect-test`: Test mode endpoint
- No upfront inventory investment

**Revenue:**
- "No-Capital Store Starter" setup service ($499-$999)
- Future: Stripe Connect transaction fees

**Setup:**
```powershell
cd ReapSow-Lite/router
./start.ps1
```

Optional Stripe configuration in `.env`:
```env
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
```

---

### 3️⃣ TravelQuest Hub - Affiliate Travel
**Model:** Affiliate click-outs with sports events focus

**Port:** 5301

**Features:**
- Static deals page with JSON data source
- Affiliate link prepending via `?aff=` URL param
- Sports events + adventure packages
- Mobile-optimized cards

**Revenue:**
- 5-15% commission per booking
- Focus: sports trips, cruises, adventure packages

**Setup:**
```powershell
cd TravelQuest
./serve.ps1
```

**Usage:**
```
http://localhost:5301?aff=https://your-affiliate-domain.com/path?to=
```
All deal CTAs will prepend the affiliate base URL.

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router

**Backend:**
- Node.js + Express
- CSV file storage (VibeLink)
- Environment-based configuration
- CORS enabled

**Deployment:**
- GitHub Pages (frontend)
- Node backends on VPS/cloud
- PowerShell automation

---

## 📦 Installation

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- PowerShell 7+ (included on Windows 10/11)
- Git

### Full Setup
```powershell
# Install dependencies for all services
cd VibeLink/server && npm install && cd ../..
cd ReapSow-Lite/router && npm install && cd ../..

# Install frontend dependencies
npm install

# Start development
npm run dev          # Frontend (port 8080)
./start_all.ps1      # All backend services
```

---

## 🌐 Deployment

### Frontend (GitHub Pages)
```powershell
# Build and deploy
npm run build

# Deploy to GitHub
./deploy_github_pages.ps1 -Owner "yourusername" -Repo "vibe-stack"

# With custom domain
./deploy_github_pages.ps1 -Owner "yourusername" -Repo "vibe-stack" -Domain "yourdomain.com"
```

### Backends
Deploy Node.js services to:
- **DigitalOcean App Platform**
- **Heroku**
- **Railway**
- **Your own VPS**

Set environment variables in your hosting platform:
```env
# VibeLink
PORT=5102
WEBHOOK_URL=https://your-webhook-url

# ReapSow-Lite
PORT=5201
STRIPE_SECRET_KEY=sk_live_YOUR_KEY
```

---

## 📁 Project Structure

```
vibe-stack/
├── src/                      # React frontend
│   ├── pages/
│   │   ├── Index.tsx        # Main hub
│   │   ├── VibeLink.tsx     # Property enhancement
│   │   ├── ReapSow.tsx      # E-commerce simulator
│   │   └── TravelQuest.tsx  # Travel deals
│   └── components/ui/       # shadcn components
│
├── VibeLink/
│   └── server/
│       ├── server.js        # Express API
│       ├── package.json
│       ├── .env.example
│       ├── start.ps1
│       └── leads.csv        # Generated on first lead
│
├── ReapSow-Lite/
│   └── router/
│       ├── server.js        # Express API
│       ├── package.json
│       ├── .env.example
│       └── start.ps1
│
├── TravelQuest/
│   ├── deals.json          # Deal data
│   └── serve.ps1
│
├── start_all.ps1           # Boot all services
├── deploy_github_pages.ps1 # Deploy to GitHub
└── README.md
```

---

## 🔧 Configuration

### VibeLink Webhook Integration

**Airtable:**
```env
WEBHOOK_URL=https://api.airtable.com/v0/BASE_ID/TABLE_NAME
# Add Bearer token in headers (server.js modification required)
```

**Zapier:**
```env
WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/12345/abcdef/
```

**Notion:**
```env
WEBHOOK_URL=https://api.notion.com/v1/pages
# Requires Authorization header with integration token
```

### ReapSow Stripe Connect (Future)
1. Create Stripe account
2. Get API keys from [Dashboard](https://dashboard.stripe.com/test/apikeys)
3. Add to `.env`: `STRIPE_SECRET_KEY=sk_test_...`
4. Implement Connect onboarding flow

### TravelQuest Affiliate Links
Edit `TravelQuest/deals.json` with your affiliate IDs.

Or pass dynamically:
```
http://localhost:5301?aff=https://booking.com/affiliate?aid=YOUR_ID&
```

---

## 🎨 Design System

**Theme:** Dark mode with purple-cyan gradient accents

**Colors:**
- Background: `hsl(240 10% 6%)`
- Primary: `hsl(280 80% 65%)`
- Accent: `hsl(200 80% 60%)`
- Card: `hsl(240 8% 10%)`

**Variants:**
- `hero`: Gradient button with glow effect
- `cta`: Accent-colored action button

All defined in `src/index.css` and `tailwind.config.ts`.

---

## 🚨 Error Handling

All APIs return consistent error format:
```json
{
  "error": "Error description",
  "details": "Technical details"
}
```

**Common Issues:**

1. **Port already in use**
   ```powershell
   # Kill process on port 5102
   Get-Process -Id (Get-NetTCPConnection -LocalPort 5102).OwningProcess | Stop-Process
   ```

2. **Missing dependencies**
   ```powershell
   # Reinstall in each service
   rm -r node_modules
   npm install
   ```

3. **CORS errors**
   - Ensure backends have `cors()` middleware
   - Check frontend API calls use correct ports

---

## 📝 TODOs

### VibeLink
- [ ] SMS notifications via Twilio
- [ ] Email autoresponder
- [ ] CRM integration (HubSpot/Salesforce)
- [ ] Payment processing for DIY kits

### ReapSow-Lite
- [ ] LLM integration for listing optimization
- [ ] Full Stripe Connect implementation
- [ ] Inventory management dashboard
- [ ] Automated supplier ordering

### TravelQuest
- [ ] Admin panel for deal management
- [ ] User reviews and ratings
- [ ] Email newsletter integration
- [ ] Advanced filtering and search

---

## 🤝 Contributing

This is a starter kit - fork and customize for your needs!

**Priorities:**
1. Cash flow (monetization first)
2. Speed (deploy fast, iterate)
3. Polish (improve after revenue)

---

## 📄 License

MIT License - use freely for commercial projects.

---

## 🎯 Success Metrics

**Week 1 Goals:**
- ✅ Deploy all three funnels
- ✅ Configure webhooks/affiliates
- ✅ First lead captured

**Month 1 Goals:**
- 📈 100+ qualified leads (VibeLink)
- 💰 5 setup service sales (ReapSow)
- 🔗 50+ affiliate click-outs (TravelQuest)

**Scale:**
- Add more funnels as you validate
- Integrate paid ads (Facebook/Google)
- Build email list for retargeting

---

## 💬 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/vibe-stack/issues)
- **Docs:** This README
- **Community:** Coming soon

---

**Built for builders. Ship fast, monetize now, polish later.** 🚀
