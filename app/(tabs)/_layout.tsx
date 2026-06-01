import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { Colors } from '../../constants/theme';

type TabIconProps = { label: string; emoji: string; focused: boolean };

function TabIcon({ label, emoji, focused }: TabIconProps) {
  return (
    <View style={{ alignItems: 'center', gap: 2 }}>
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
      <Text style={{
        fontSize: 10,
        fontWeight: focused ? '700' : '400',
        color: focused ? Colors.blueLight : Colors.textMuted,
      }}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0d1527',
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 16,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Home" emoji="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Groups" emoji="📊" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Schedule" emoji="📅" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="predict"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Predict" emoji="🎯" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="earn"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Shop" emoji="🛒" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
