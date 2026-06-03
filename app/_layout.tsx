import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initPurchases } from '../services/purchases';
import { getUserId } from '../services/auth';

export default function RootLayout() {
  useEffect(() => {
    // Init silently — both are crash-safe
    initPurchases().catch(() => {});
    getUserId().catch(() => {});
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
