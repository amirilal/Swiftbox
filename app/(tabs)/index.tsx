import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../core/theme/ThemeContext';
import { AdMobBanner } from '../../core/admob/AdMobComponents';
import { Image, QrCode, FileText, Gamepad2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { t } = useTranslation();
  const { effectiveTheme } = useTheme();
  
  const isDark = effectiveTheme === 'dark';
  
  const quickAccessItems = [
    { icon: QrCode, title: t('tools.qrScanner'), color: '#4CAF50' },
    { icon: Image, title: t('tools.imageCompress'), color: '#2196F3' },
    { icon: FileText, title: t('tools.imageToPdf'), color: '#FF9800' },
    { icon: Gamepad2, title: t('fun.game2048'), color: '#E91E63' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={isDark ? ['#1a1a1a', '#2a2a2a'] : ['#4CAF50', '#45a049']}
          style={styles.header}
        >
          <Text style={[styles.title, { color: '#fff' }]}>
            {t('home.welcome')}
          </Text>
          <Text style={[styles.subtitle, { color: '#fff', opacity: 0.9 }]}>
            {t('home.subtitle')}
          </Text>
        </LinearGradient>

        {/* AdMob Banner */}
        <AdMobBanner />

        {/* Quick Access */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#333' }]}>
            {t('home.quickAccess')}
          </Text>
          <View style={styles.quickAccessGrid}>
            {quickAccessItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickAccessItem, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                  <item.icon color="#fff" size={24} />
                </View>
                <Text style={[styles.quickAccessText, { color: isDark ? '#fff' : '#333' }]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recently Used */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#333' }]}>
            {t('home.recentlyUsed')}
          </Text>
          <View style={[styles.emptyState, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
            <Text style={[styles.emptyText, { color: isDark ? '#999' : '#666' }]}>
              No recent activities
            </Text>
          </View>
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
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyState: {
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});
