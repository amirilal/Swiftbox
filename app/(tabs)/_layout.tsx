import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Home, Wrench, Gamepad2, Settings } from 'lucide-react-native';
import { useTheme } from '../../core/theme/ThemeContext';

export default function TabLayout() {
  const { t } = useTranslation();
  const { effectiveTheme } = useTheme();
  
  const colors = {
    tabBarActiveTintColor: effectiveTheme === 'dark' ? '#fff' : '#007AFF',
    tabBarInactiveTintColor: effectiveTheme === 'dark' ? '#8E8E93' : '#8E8E93',
    tabBarStyle: {
      backgroundColor: effectiveTheme === 'dark' ? '#1C1C1E' : '#fff',
      borderTopColor: effectiveTheme === 'dark' ? '#38383A' : '#E5E5EA',
    },
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        ...colors,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: t('tabs.tools'),
          tabBarIcon: ({ color, size }) => <Wrench color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="fun"
        options={{
          title: t('tabs.fun'),
          tabBarIcon: ({ color, size }) => <Gamepad2 color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
