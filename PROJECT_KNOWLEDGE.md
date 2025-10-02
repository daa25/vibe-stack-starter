# VibeStack Project Knowledge (T=0)

## 🎯 Project Overview

**VibeStack** is a multi-funnel monetization platform featuring three distinct business models under one unified frontend. The flagship brand is **Vibe Link Property Enhancement Services LLC**, supported by ReapSow-Lite e-commerce and TravelQuest affiliate marketing.

---

## 🏢 Primary Business: Vibe Link Property Enhancement Services LLC

### Business Model
- **Type**: Lead broker + DIY kit fulfillment
- **Core Service**: Home improvement and property management brokerage
- **Network Model**: Curated network of professional service providers dispatched for customer jobs
- **Product Line**: NestKit - DIY enhancement packages and kits

### Revenue Streams
1. **Lead Brokerage**: $25-$50 per qualified lead
2. **NestKit Sales**: $299-$799 per DIY kit
3. **Service Commissions**: Network professional referrals

### Service Categories
- **Painting & Finishing**: Interior/exterior painting, wallpaper, refinishing
- **Repairs & Maintenance**: Drywall, plumbing, electrical, general fixes
- **Landscaping**: Lawn care, garden design, outdoor maintenance
- **Renovation**: Kitchen/bath remodels, room additions
- **Waterproofing**: Basement, foundation, gutter systems
- **Security & Safety**: Alarm systems, cameras, locks, inspections

### NestKit Product Line
- **Bathroom Refresh Kit**: $299 - Fixtures, sealants, accessories
- **Kitchen Glow-Up Kit**: $499 - Cabinet hardware, backsplash materials, lighting
- **Curb Appeal Starter**: $399 - Landscaping tools, exterior paint, mailbox upgrade
- **Smart Home Basics**: $599 - Smart locks, thermostats, cameras, hub
- **Energy Saver Bundle**: $699 - LED bulbs, weatherstripping, programmable thermostats
- **Outdoor Oasis Kit**: $799 - Patio furniture, string lights, planters, grill accessories

---

## 🛠️ Technical Architecture

### Frontend Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner toasts

### Backend Stack
- **Lovable Cloud**: Full-stack backend (Supabase-powered)
  - PostgreSQL database
  - Authentication system
  - File storage
  - Edge functions
  - Secrets management

### Node.js Services
1. **VibeLink API** (Port 5102)
   - Lead capture to CSV
   - Webhook integration (Zapier/Airtable/Notion)
   
2. **ReapSow-Lite API** (Port 5201)
   - Margin simulation calculator
   - Listing optimization
   - Stripe Connect placeholder

3. **TravelQuest Hub** (Port 5301)
   - Static deals page
   - Affiliate link management

---

## 📁 Current Route Structure

```
/                          → Index (Hub page with all three funnels)
/vibelink                  → Vibe Link Property Enhancement Services
/vibelink/checkout         → NestKit checkout page
/reapsow                   → ReapSow-Lite e-commerce simulator
/reapsow/consultation      → Book consultation for store setup
/travelquest               → TravelQuest affiliate deals hub
/travelquest/subscribe     → Travel deals subscription page
/*                         → 404 Not Found page
```

---

## 🎨 Design System

### Color Palette (HSL Format)
```css
--background: 240 10% 6%           /* Dark base */
--foreground: 0 0% 98%             /* Light text */
--card: 240 8% 10%                 /* Card background */
--primary: 280 80% 65%             /* Purple accent */
--accent: 200 80% 60%              /* Cyan accent */
--primary-glow: 280 100% 75%       /* Lighter purple */
```

### Gradient System
```css
--gradient-primary: linear-gradient(135deg, hsl(280 80% 65%), hsl(280 100% 75%))
--gradient-card: linear-gradient(145deg, hsl(240 8% 10%), hsl(240 6% 8%))
--gradient-subtle: linear-gradient(180deg, transparent, hsl(240 8% 10%))
```

### Shadow System
```css
--shadow-elegant: 0 10px 30px -10px hsl(280 80% 65% / 0.3)
--shadow-glow: 0 0 40px hsl(280 100% 75% / 0.4)
--shadow-card: 0 8px 24px -8px hsl(280 80% 65% / 0.2)
```

### Component Variants
- **Button `hero`**: Gradient with glow effect
- **Button `cta`**: Accent-colored call-to-action
- **Card `gradient-card`**: Background gradient with elegant shadow

---

## 📊 Lead Generation Implementation

### VibeLink Lead Capture
**Endpoint**: `POST http://localhost:5102/api/leads`

**Payload**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "service": "string",
  "address": "string",
  "details": "string"
}
```

**Storage**: 
- CSV file: `VibeLink/server/leads.csv`
- Webhook: Configurable via `.env` → `WEBHOOK_URL`

**Toast Notifications**: Success/error feedback using Sonner

---

## 🖼️ Current Image Assets

### Vibe Link
- `vibelink-hero.jpg`: Hero banner (1920x1080)
- `vibelink-professionals.jpg`: Service professionals showcase
- `vibelink-services-showcase.jpg`: Dynamic services grid visual
- `nestkit-products.jpg`: NestKit product display

### Other Funnels
- `reapsow-hero.jpg`: ReapSow e-commerce header
- `travelquest-hero.jpg`: Travel deals hero image

---

## 🔧 Configuration Files

### Environment Variables

**VibeLink Server** (`VibeLink/server/.env`)
```env
PORT=5102
WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/
```

**ReapSow Router** (`ReapSow-Lite/router/.env`)
```env
PORT=5201
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
```

**Square Payment Server** (`server/.env`)
```env
SQUARE_ACCESS_TOKEN=your_token
SQUARE_ENV=sandbox
PORT=3000
```

---

## 🚀 Development Workflow

### Start All Services
```powershell
./start_all.ps1
```

This launches:
- VibeLink API → `http://localhost:5102`
- ReapSow-Lite API → `http://localhost:5201`
- TravelQuest Hub → `http://localhost:5301`
- Frontend Dev Server → `http://localhost:8080`

### Individual Service Start
```powershell
# VibeLink
cd VibeLink/server && ./start.ps1

# ReapSow-Lite
cd ReapSow-Lite/router && ./start.ps1

# TravelQuest
cd TravelQuest && ./serve.ps1
```

---

## 📦 Key Dependencies

### Production
- `react` + `react-dom`: ^18.3.1
- `react-router-dom`: ^6.30.1
- `@tanstack/react-query`: ^5.83.0
- `lucide-react`: ^0.462.0 (icons)
- `react-hook-form`: ^7.61.1
- `zod`: ^3.25.76 (validation)
- `sonner`: ^1.7.4 (toasts)
- `tailwind-merge`: ^2.6.0
- `tailwindcss-animate`: ^1.0.7

### Backend Services
- `express`: ^4.18.2
- `cors`: ^2.8.5
- `dotenv`: ^16.3.1
- `csv-writer`: ^1.6.0
- `square`: (for payment processing)

---

## 🎯 Current Implementation Status

### ✅ Completed
- [x] Three-funnel frontend architecture
- [x] Vibe Link Property Enhancement Services branding
- [x] NestKit DIY product showcase
- [x] Lead generation form with CSV storage
- [x] Service network categories (6 categories)
- [x] Professional imagery integration
- [x] Responsive design system
- [x] Dark mode with purple-cyan gradient theme
- [x] Webhook integration structure
- [x] ReapSow margin calculator API
- [x] TravelQuest affiliate link system
- [x] Lovable Cloud enabled (backend infrastructure)

### 🚧 Pending
- [ ] Lovable Cloud database schema implementation
- [ ] User authentication flow
- [ ] NestKit checkout payment integration
- [ ] Email autoresponder for leads
- [ ] SMS notifications (Twilio)
- [ ] CRM integration (HubSpot/Salesforce)
- [ ] LLM integration for listing optimization
- [ ] Stripe Connect for ReapSow
- [ ] TravelQuest admin panel

---

## 🔑 Key Business Logic

### Lead Qualification Criteria
- Valid email format
- Phone number provided
- Service type selected
- Address for on-site services
- Detailed service description

### NestKit Pricing Strategy
- Entry-level: $299 (Bathroom Refresh)
- Mid-tier: $399-$599 (Kitchen, Curb Appeal, Smart Home)
- Premium: $699-$799 (Energy Saver, Outdoor Oasis)

### Service Network Dispatch Flow
1. Lead captured via form
2. CSV append + webhook trigger
3. Manual review/qualification
4. Professional assignment from network
5. Service delivery
6. Commission payment

---

## 📈 Success Metrics (Week 1 Goals)

- ✅ Deploy all three funnels
- ✅ Configure webhooks/affiliates
- ⏳ First lead captured
- ⏳ NestKit checkout integration
- ⏳ Backend data persistence

---

## 🎨 Component Architecture

### Page Components
- `Index.tsx`: Main hub with all three funnels
- `VibeLink.tsx`: Full property enhancement landing page
- `KitCheckout.tsx`: NestKit purchase flow
- `ReapSow.tsx`: E-commerce simulator
- `BookConsultation.tsx`: Consultation booking
- `TravelQuest.tsx`: Travel deals hub
- `TravelDeals.tsx`: Deals subscription page
- `NotFound.tsx`: 404 error page

### Reusable UI Components (shadcn/ui)
- Buttons (hero, cta variants)
- Cards (gradient-card variant)
- Forms (input, textarea, select)
- Toasts (Sonner notifications)
- Dialogs, Sheets, Tooltips, etc.

---

## 🔐 Security Considerations

### Current State
- CORS enabled on all backend services
- Environment variables for sensitive keys
- No authentication yet (pending Cloud implementation)
- CSV storage (temporary, migrate to database)

### Future Hardening
- Rate limiting on lead submission
- reCAPTCHA for form spam prevention
- JWT authentication for protected routes
- RLS policies on Lovable Cloud database
- Encrypted webhook payloads

---

## 📝 Content Strategy

### VibeLink Messaging
- **Headline**: "Transform Your Space with Expert Care"
- **Subheadline**: "Professional network + DIY kits for every property enhancement need"
- **CTA**: "Get Free Quote" / "Shop NestKit"
- **Trust Signals**: "Vetted professionals", "Satisfaction guaranteed"

### Service Descriptions
- Emphasize network quality
- Highlight speed and reliability
- Showcase before/after potential
- Stress convenience (they do the matching)

### NestKit Positioning
- DIY-friendly but professional-grade
- Cost savings vs. hiring out
- Comprehensive kits (everything included)
- QR code tutorials (future feature)

---

## 🌐 Deployment Configuration

### Frontend (GitHub Pages)
- Build command: `npm run build`
- Deploy script: `deploy_github_pages.ps1`
- Custom domain support via `CNAME`

### Backend Services
- Recommended: DigitalOcean, Heroku, Railway, or VPS
- Environment variables configured in hosting platform
- CORS origins updated for production domain

---

## 📞 Integration Endpoints

### Webhooks (VibeLink)
- **Zapier**: `https://hooks.zapier.com/hooks/catch/[ID]/[CODE]`
- **Airtable**: `https://api.airtable.com/v0/[BASE_ID]/[TABLE]` (requires Bearer token)
- **Notion**: `https://api.notion.com/v1/pages` (requires integration token)

### Payment Processors
- **Square**: Configured in `server/server.js` for NestKit checkout
- **Stripe Connect**: Placeholder in ReapSow-Lite for future e-commerce

### Affiliate Networks (TravelQuest)
- URL param: `?aff=https://your-affiliate-domain.com/path?to=`
- Prepends to all deal CTAs dynamically

---

## 🎓 Development Principles

### Cash Flow First
- Prioritize monetization over polish
- Ship fast, iterate based on revenue
- Validate before perfecting

### Windows-Friendly
- PowerShell automation scripts
- Cross-platform Node.js services
- No Unix-specific dependencies

### Modular Funnels
- Each funnel is independently deployable
- Shared design system and components
- Easy to add/remove funnels

---

## 🔄 Version Control

### Repository Structure
```
vibe-stack/
├── src/                  # React frontend
├── VibeLink/server/      # Lead capture API
├── ReapSow-Lite/router/  # E-commerce API
├── TravelQuest/          # Static deals page
├── server/               # Square payment processor
└── [config files]        # Vite, Tailwind, TypeScript
```

### Branch Strategy (Recommended)
- `main`: Production-ready code
- `develop`: Active development
- `feature/*`: Individual features
- `hotfix/*`: Emergency fixes

---

## 📚 Documentation Links

- [Main README](./README.md): Complete setup and deployment guide
- [Lovable Cloud Docs](https://docs.lovable.dev/features/cloud)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Last Updated**: T=0 (Initial Knowledge Snapshot)
**Lovable Cloud Status**: ✅ Enabled
**Production Status**: 🚧 Development
