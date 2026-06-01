# Copa do Mundo 2026 App — Setup & App Store Submission Guide

## Prerequisites

- Mac with macOS 13+
- Node.js 18+ (`node -v` to check)
- Xcode 15+ (install from App Store)
- Apple Developer account (you already have this ✓)
- Expo account (free at expo.dev)
- EAS CLI

---

## Step 1 — Install Dependencies

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Navigate to the project folder
cd "Soccer World Cup app"

# Install all packages
npm install
```

---

## Step 2 — Get Your Live Scores API Key (Free)

1. Go to **https://rapidapi.com/api-sports/api/api-football**
2. Sign up for a free RapidAPI account
3. Subscribe to the **Basic** plan (free — 100 requests/day)
4. Copy your **X-RapidAPI-Key** from the dashboard
5. Open `services/api.ts` and replace:
   ```ts
   const RAPIDAPI_KEY = 'YOUR_RAPIDAPI_KEY';
   ```
   with your actual key.

> **Need more requests?** The Pro plan ($10/month) gives 1,000/day — plenty for a live app.

---

## Step 3 — Set Up RevenueCat (Premium Subscriptions)

1. Create a free account at **https://app.revenuecat.com**
2. Click **Create new project** → iOS
3. Enter your app's bundle ID: `com.edtx.worldcup2026`
   (Edit `app.json` to change `bundleIdentifier` to something unique like `com.eduardomollo.copamundo2026`)
4. In **App Store Connect** (https://appstoreconnect.apple.com):
   - Create a new app with the same bundle ID
   - Go to **In-App Purchases** → **Manage**
   - Create a new **Auto-Renewable Subscription**
   - Product ID: `copamundo2026_premium_monthly`
   - Price: $4.99/month
   - Add a Subscription Group named `Premium`
5. Back in RevenueCat → **Products** → add the product ID above
6. Create an **Entitlement** named `premium`, linked to the product
7. Create an **Offering** named `default` with the monthly package
8. Copy your **Public SDK Key** from RevenueCat project settings
9. Open `services/purchases.ts` and replace:
   ```ts
   const REVENUECAT_API_KEY = 'YOUR_REVENUECAT_API_KEY';
   ```

---

## Step 4 — Configure App Store Connect

1. Go to **https://appstoreconnect.apple.com**
2. Create a new iOS app:
   - Name: **Copa do Mundo 2026**
   - Bundle ID: `com.edtx.worldcup2026` (must match app.json)
   - SKU: `worldcup2026`
3. Fill in app metadata:
   - **Category**: Sports
   - **Age Rating**: 4+
   - **Description** (suggested):
     > Follow every match of the FIFA Copa do Mundo 2026 live. All 104 games, 48 teams, real-time scores, group standings, and a prediction game where you can win prizes. Covers USA, Canada & Mexico. Includes official merchandise from FIFA Store and Fanatics.
   - **Keywords**: world cup, soccer, FIFA, 2026, football, scores, live
4. Upload screenshots (you'll need these sizes):
   - iPhone 6.9" (1320×2868)
   - iPhone 6.7" (1290×2796)

---

## Step 5 — Add App Icon & Splash

Place the following files in the `assets/` folder:
- `icon.png` — 1024×1024px, no transparency, no rounded corners (Apple adds them)
- `splash.png` — 1284×2778px, background color `#0a0e1a`

Use any design tool (Figma, Canva, etc.). A simple soccer ball on a dark background works great.

---

## Step 6 — Configure EAS

Open `eas.json` and update:
```json
"ios": {
  "appleId": "your@apple.id",
  "ascAppId": "YOUR_APP_ID_FROM_APP_STORE_CONNECT",
  "appleTeamId": "YOUR_TEAM_ID"
}
```

Find your App ID in App Store Connect → My Apps → your app → General.
Find your Team ID at https://developer.apple.com/account → Membership.

---

## Step 7 — Build & Submit

```bash
# Log in to Expo
eas login

# Build for the App Store (this runs in Expo's cloud — no Xcode needed locally)
eas build --platform ios --profile production

# This takes ~15-20 minutes. When done, submit directly:
eas submit --platform ios
```

EAS will walk you through authentication with App Store Connect automatically.

---

## Step 8 — App Review

- Apple review typically takes **24–48 hours** for new apps
- Make sure your prediction prize mechanics comply with Apple's gambling guidelines
  (presenting it as a free skill-based game is fine; real-money gambling requires special entitlements)
- If you show betting odds, add the disclaimer already in the app

---

## Affiliate Merchandise Setup

The app links to FIFA Store and Fanatics. To earn affiliate commission:

### Fanatics Affiliate Program
1. Apply at **https://www.fanatics.com/affiliate**
2. Once approved, replace the URLs in `constants/data.ts` with your tracking links
3. Commission: 8–12% per sale

### FIFA Store
- FIFA Store runs through **Awin**: https://www.awin.com → search "FIFA"
- Commission: ~5–8%

---

## Revenue Estimates (Conservative)

| Revenue Stream | Monthly Estimate |
|---|---|
| Premium subscriptions (100 users × $4.99) | ~$400 |
| Merchandise affiliate (50 clicks/day × 2% CVR × $80 AOV × 10%) | ~$240 |
| **Total** | **~$640/mo** |

Scale with App Store Ads (Apple Search Ads) — $5/day budget during the tournament can bring strong installs given the high intent search traffic for "world cup app."

---

## Quick Troubleshooting

| Issue | Fix |
|---|---|
| `eas build` fails on signing | Run `eas credentials` to set up certs |
| Live scores not loading | Check RapidAPI key in `services/api.ts` |
| Purchase not working | Verify RevenueCat product IDs match App Store Connect exactly |
| App rejected for gambling | Remove "prizes" language, frame as "virtual points leaderboard" |
