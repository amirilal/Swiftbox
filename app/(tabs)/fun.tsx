import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../core/theme/ThemeContext';
import { useRouter } from 'expo-router';
import { AdMobBanner } from '../../core/admob/AdMobComponents';
import { Gamepad2, Quote } from 'lucide-react-native';

export default function FunScreen() {
  const { t } = useTranslation();
  const { effectiveTheme } = useTheme();
  const router = useRouter();
  
  const isDark = effectiveTheme === 'dark';
  
  const funItems = [
    {
      icon: Gamepad2,
      title: t('fun.game2048'),
      description: t('fun.game2048Desc'),
      color: '#E91E63',
      route: '/modules/fun/game-2048',
    },
    {
      icon: Quote,
      title: t('fun.dailyQuote'),
      description: t('fun.dailyQuoteDesc'),
      color: '#673AB7',
      route: '/modules/fun/daily-quote',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>
            {t('fun.title')}
          </Text>
        </View>

        <AdMobBanner />

        <View style={styles.content}>
          {funItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.funCard, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}
              onPress={() => console.log('Navigate to:', item.route)}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <item.icon color="#fff" size={32} />
              </View>
              <View style={styles.funInfo}>
                <Text style={[styles.funTitle, { color: isDark ? '#fff' : '#333' }]}>
                  {item.title}
                </Text>
                <Text style={[styles.funDescription, { color: isDark ? '#999' : '#666' }]}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
  funCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  funInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  funTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  funDescription: {
    fontSize: 16,
    lineHeight: 22,
  },
});
