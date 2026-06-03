/**
 * In-App Purchases — RevenueCat
 * Wrapped in try/catch so a missing native module never crashes the app.
 */

const REVENUECAT_API_KEY = 'test_dPjCtPAHYcUerqCKpRYmiPUwoDf';

let Purchases: any = null;

// Lazy-load the native module so a linking failure doesn't crash on import
try {
  Purchases = require('react-native-purchases').default;
} catch (e) {
  console.warn('react-native-purchases not available:', e);
}

export async function initPurchases(): Promise<void> {
  if (!Purchases) return;
  try {
    Purchases.configure({ apiKey: REVENUECAT_API_KEY });
  } catch (e) {
    console.warn('RevenueCat init failed:', e);
  }
}

export async function purchasePremium(): Promise<boolean> {
  if (!Purchases) return false;
  try {
    const offerings = await Purchases.getOfferings();
    const monthly = offerings?.current?.monthly;
    if (!monthly) return false;
    const { customerInfo } = await Purchases.purchasePackage(monthly);
    return isPremiumActive(customerInfo);
  } catch (err: any) {
    if (err?.userCancelled) return false;
    console.warn('Purchase error:', err);
    return false;
  }
}

export async function restorePurchases(): Promise<boolean> {
  if (!Purchases) return false;
  try {
    const info = await Purchases.restorePurchases();
    return isPremiumActive(info);
  } catch {
    return false;
  }
}

export async function checkPremiumStatus(): Promise<boolean> {
  if (!Purchases) return false;
  try {
    const info = await Purchases.getCustomerInfo();
    return isPremiumActive(info);
  } catch {
    return false;
  }
}

function isPremiumActive(info: any): boolean {
  return !!info?.entitlements?.active?.['premium'];
}
