import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initPurchases } from '../services/purchases';
import { ensureSignedIn } from '../services/auth';

export default function RootLayout() {
  useEffect(() => {
    // Init RevenueCat and Firebase auth silently on launch
    initPurchases();
    ensureSignedIn();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
