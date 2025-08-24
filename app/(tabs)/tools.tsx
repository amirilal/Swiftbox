import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../core/theme/ThemeContext';
import { useRouter } from 'expo-router';
import { AdMobBanner } from '../../core/admob/AdMobComponents';
import { Image, FileText, QrCode, Merge } from 'lucide-react-native';

export default function ToolsScreen() {
  const { t } = useTranslation();
  const { effectiveTheme } = useTheme();
  const router = useRouter();
  
  const isDark = effectiveTheme === 'dark';
  
  const tools = [
    {
      icon: Image,
      title: t('tools.imageCompress'),
      description: t('tools.imageCompressDesc'),
      color: '#2196F3',
      route: '/modules/utilities/image-compress',
    },
    {
      icon: FileText,
      title: t('tools.imageToPdf'),
      description: t('tools.imageToPdfDesc'),
      color: '#FF9800',
      route: '/modules/utilities/images-to-pdf',
    },
    {
      icon: Merge,
      title: t('tools.mergePdf'),
      description: t('tools.mergePdfDesc'),
      color: '#9C27B0',
      route: '/modules/utilities/merge-pdf',
    },
    {
      icon: QrCode,
      title: t('tools.qrScanner'),
      description: t('tools.qrScannerDesc'),
      color: '#4CAF50',
      route: '/modules/utilities/qr-scanner',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>
            {t('tools.title')}
          </Text>
        </View>

        <AdMobBanner />

        <View style={styles.content}>
          {tools.map((tool, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.toolCard, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}
              onPress={() => console.log('Navigate to:', tool.route)}
            >
              <View style={[styles.iconContainer, { backgroundColor: tool.color }]}>
                <tool.icon color="#fff" size={24} />
              </View>
              <View style={styles.toolInfo}>
                <Text style={[styles.toolTitle, { color: isDark ? '#fff' : '#333' }]}>
                  {tool.title}
                </Text>
                <Text style={[styles.toolDescription, { color: isDark ? '#999' : '#666' }]}>
                  {tool.description}
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
  toolCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
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
    marginRight: 16,
  },
  toolInfo: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
