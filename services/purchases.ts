/**
 * In-App Purchases — RevenueCat
 * Product ID: worldcup2026_premium_monthly ($4.99/month)
 *
 * App Store Connect setup (if not done):
 * 1. Create Auto-Renewable Subscription in App Store Connect
 *    → My Apps → Copa do Mundo 2026 → In-App Purchases → Manage
 *    → "+" → Auto-Renewable Subscription
 *    → Product ID: worldcup2026_premium_monthly
 *    → Price: $4.99/month
 *    → Subscription Group: "Premium"
 * 2. In RevenueCat dashboard → Products → add the product ID above
 *    → Entitlement: "premium" linked to that product
 *    → Offering: "default" with a monthly package
 */

import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';

const REVENUECAT_API_KEY = 'test_dPjCtPAHYcUerqCKpRYmiPUwoDf';

export async function initPurchases(): Promise<void> {
  try {
    Purchases.configure({ apiKey: REVENUECAT_API_KEY });
  } catch (e) {
    console.warn('RevenueCat init failed:', e);
  }
}

export async function getOfferings(): Promise<PurchasesOffering | null> {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  } catch (e) {
    console.warn('Could not fetch offerings:', e);
    return null;
  }
}

export async function purchasePremium(): Promise<boolean> {
  try {
    const offering = await getOfferings();
    if (!offering?.monthly) {
      // No offering configured yet — still return true for sandbox testing
      console.warn('No monthly package found in RevenueCat');
      return false;
    }
    const { customerInfo } = await Purchases.purchasePackage(offering.monthly);
    return isPremiumActive(customerInfo);
  } catch (err: any) {
    if (err.userCancelled) return false;
    throw err;
  }
}

export async function restorePurchases(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return isPremiumActive(customerInfo);
  } catch {
    return false;
  }
}

export async function checkPremiumStatus(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return isPremiumActive(customerInfo);
  } catch {
    return false;
  }
}

function isPremiumActive(info: CustomerInfo): boolean {
  return typeof info.entitlements.active['premium'] !== 'undefined';
}
