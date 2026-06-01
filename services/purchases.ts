/**
 * In-App Purchases — RevenueCat
 *
 * HOW TO SET UP:
 * 1. Create a free account at https://app.revenuecat.com
 * 2. Create a new project → iOS App
 * 3. Add your iOS bundle ID (from app.json: "com.yourname.worldcup2026")
 * 4. In App Store Connect, create a Subscription Group named "Premium"
 *    and add a product with ID: "worldcup2026_premium_monthly" ($4.99/month)
 * 5. Copy your RevenueCat Public SDK Key and replace REVENUECAT_API_KEY below
 *
 * ENTITLEMENT: "premium"
 * OFFERING: "default"
 * PRODUCT: "worldcup2026_premium_monthly" — $4.99/month
 */

import Purchases, {
  PurchasesOffering,
  CustomerInfo,
} from 'react-native-purchases';

const REVENUECAT_API_KEY = 'YOUR_REVENUECAT_API_KEY'; // ← Replace this

export async function initPurchases(): Promise<void> {
  if (REVENUECAT_API_KEY === 'YOUR_REVENUECAT_API_KEY') return;
  Purchases.configure({ apiKey: REVENUECAT_API_KEY });
}

export async function getOfferings(): Promise<PurchasesOffering | null> {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  } catch (err) {
    console.warn('Could not fetch offerings:', err);
    return null;
  }
}

export async function purchasePremium(): Promise<boolean> {
  try {
    const offering = await getOfferings();
    if (!offering?.monthly) throw new Error('No monthly package found');
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
  if (REVENUECAT_API_KEY === 'YOUR_REVENUECAT_API_KEY') return false;
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
