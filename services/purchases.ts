/**
 * In-App Purchases — RevenueCat (STUB)
 *
 * react-native-purchases is not yet installed.
 * To enable real subscriptions:
 *   1. npm install react-native-purchases
 *   2. Follow the RevenueCat setup in SETUP_GUIDE.md
 *   3. Replace this file with the full implementation.
 *
 * For now, checkPremiumStatus() always returns false
 * and purchasePremium() shows an "coming soon" message.
 */

import { Alert } from 'react-native';

export async function initPurchases(): Promise<void> {
  // no-op until RevenueCat is configured
}

export async function purchasePremium(): Promise<boolean> {
  Alert.alert(
    'Coming Soon',
    'Premium subscriptions will be available at launch. Stay tuned!'
  );
  return false;
}

export async function restorePurchases(): Promise<boolean> {
  return false;
}

export async function checkPremiumStatus(): Promise<boolean> {
  return false;
}
