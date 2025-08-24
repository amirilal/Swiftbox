import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import { useTheme } from '../../core/theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Quote, RefreshCw, Share2 } from 'lucide-react-native';

interface QuoteData {
  text: string;
  author: string;
}

const quotes: QuoteData[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" }
];

export const DailyQuote: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const { t } = useTranslation();
  const [currentQuote, setCurrentQuote] = useState<QuoteData>(quotes[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const isDark = effectiveTheme === 'dark';

  useEffect(() => {
    // Get quote based on current date to ensure same quote per day
    const today = new Date().toDateString();
    const dayHash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const quoteIndex = dayHash % quotes.length;
    setCurrentQuote(quotes[quoteIndex]);
  }, []);

  const refreshQuote = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIsRefreshing(false);
    }, 500);
  };

  const shareQuote = async () => {
    try {
      await Share.share({
        message: `"${currentQuote.text}" - ${currentQuote.author}\n\nShared via SwiftBox`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share quote');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <View style={[styles.quoteCard, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
        <Quote 
          color={isDark ? '#4CAF50' : '#673AB7'} 
          size={32} 
          style={styles.quoteIcon} 
        />
        
        <Text style={[styles.quoteText, { color: isDark ? '#fff' : '#333' }]}>
          "{currentQuote.text}"
        </Text>
        
        <Text style={[styles.authorText, { color: isDark ? '#999' : '#666' }]}>
          — {currentQuote.author}
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
            onPress={refreshQuote}
            disabled={isRefreshing}
          >
            <RefreshCw color="#fff" size={20} />
            <Text style={styles.buttonText}>
              {isRefreshing ? 'Loading...' : 'New Quote'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
            onPress={shareQuote}
          >
            <Share2 color="#fff" size={20} />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  quoteCard: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  quoteIcon: {
    marginBottom: 20,
  },
  quoteText: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  authorText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
