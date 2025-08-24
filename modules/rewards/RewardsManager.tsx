import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../core/theme/ThemeContext';
import { showRewardedAd } from '../../core/admob/AdMobComponents';
import { Gift, Star, Trophy } from 'lucide-react-native';

interface UserRewards {
  points: number;
  level: number;
  achievements: string[];
}

export const RewardsManager: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const [rewards, setRewards] = useState<UserRewards>({
    points: 0,
    level: 1,
    achievements: [],
  });
  
  const isDark = effectiveTheme === 'dark';

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    try {
      const saved = await AsyncStorage.getItem('userRewards');
      if (saved) {
        setRewards(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load rewards:', error);
    }
  };

  const saveRewards = async (newRewards: UserRewards) => {
    try {
      await AsyncStorage.setItem('userRewards', JSON.stringify(newRewards));
      setRewards(newRewards);
    } catch (error) {
      console.error('Failed to save rewards:', error);
    }
  };

  const addPoints = (points: number) => {
    const newPoints = rewards.points + points;
    const newLevel = Math.floor(newPoints / 100) + 1;
    
    const newRewards = {
      ...rewards,
      points: newPoints,
      level: newLevel,
    };
    
    if (newLevel > rewards.level) {
      Alert.alert('Level Up!', `Congratulations! You've reached level ${newLevel}!`);
    }
    
    saveRewards(newRewards);
  };

  const watchAdForRewards = () => {
    showRewardedAd();
    // Simulate receiving rewards after ad
    setTimeout(() => {
      addPoints(50);
      Alert.alert('Reward Earned!', 'You earned 50 points for watching an ad!');
    }, 1000);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <View style={[styles.statsContainer, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
        <View style={styles.statItem}>
          <Star color="#FFD700" size={32} />
          <Text style={[styles.statValue, { color: isDark ? '#fff' : '#333' }]}>
            {rewards.points}
          </Text>
          <Text style={[styles.statLabel, { color: isDark ? '#999' : '#666' }]}>
            Points
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Trophy color="#FF6B35" size={32} />
          <Text style={[styles.statValue, { color: isDark ? '#fff' : '#333' }]}>
            {rewards.level}
          </Text>
          <Text style={[styles.statLabel, { color: isDark ? '#999' : '#666' }]}>
            Level
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.adButton, { backgroundColor: '#4CAF50' }]}
        onPress={watchAdForRewards}
      >
        <Gift color="#fff" size={24} />
        <Text style={styles.buttonText}>Watch Ad for 50 Points</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 30,
    borderRadius: 16,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 16,
    marginTop: 5,
  },
  adButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
    gap: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
