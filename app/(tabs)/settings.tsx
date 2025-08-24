import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../core/theme/ThemeContext';
import { changeLanguage } from '../../core/i18n';
import { AdMobBanner } from '../../core/admob/AdMobComponents';
import { Sun, Moon, Smartphone, Globe, Bell, Info, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { theme, effectiveTheme, setTheme } = useTheme();
  
  const isDark = effectiveTheme === 'dark';

  const handleThemeChange = () => {
    Alert.alert(
      t('settings.theme'),
      'Select theme',
      [
        { text: t('settings.light'), onPress: () => setTheme('light') },
        { text: t('settings.dark'), onPress: () => setTheme('dark') },
        { text: t('settings.system'), onPress: () => setTheme('system') },
        { text: t('common.cancel'), style: 'cancel' },
      ]
    );
  };

  const handleLanguageChange = () => {
    Alert.alert(
      t('settings.language'),
      'Select language',
      [
        { text: 'English', onPress: () => changeLanguage('en') },
        { text: 'हिंदी', onPress: () => changeLanguage('hi') },
        { text: t('common.cancel'), style: 'cancel' },
      ]
    );
  };

  const getThemeIcon = () => {
    if (theme === 'light') return Sun;
    if (theme === 'dark') return Moon;
    return Smartphone;
  };

  const ThemeIcon = getThemeIcon();

  const settingsItems = [
    {
      icon: ThemeIcon,
      title: t('settings.theme'),
      value: t(`settings.${theme}`),
      onPress: handleThemeChange,
    },
    {
      icon: Globe,
      title: t('settings.language'),
      value: 'English / हिंदी',
      onPress: handleLanguageChange,
    },
    {
      icon: Bell,
      title: t('settings.notifications'),
      onPress: () => Alert.alert('Notifications', 'Feature coming soon!'),
    },
    {
      icon: Info,
      title: t('settings.about'),
      onPress: () => Alert.alert('About', 'SwiftBox v1.0.0\nYour all-in-one toolkit'),
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>
            {t('settings.title')}
          </Text>
        </View>

        <AdMobBanner />

        <View style={styles.content}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.settingItem, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}
              onPress={item.onPress}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: isDark ? '#333' : '#e0e0e0' }]}>
                  <item.icon color={isDark ? '#fff' : '#666'} size={20} />
                </View>
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: isDark ? '#fff' : '#333' }]}>
                    {item.title}
                  </Text>
                  {item.value && (
                    <Text style={[styles.settingValue, { color: isDark ? '#999' : '#666' }]}>
                      {item.value}
                    </Text>
                  )}
                </View>
              </View>
              <ChevronRight color={isDark ? '#666' : '#999'} size={20} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.version, { color: isDark ? '#666' : '#999' }]}>
            {t('settings.version')} 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 14,
    marginTop: 2,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
  },
});
