import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// AdMob Banner Placeholder
export const AdMobBanner: React.FC<{ size?: 'banner' | 'largeBanner' | 'mediumRectangle' }> = ({ 
  size = 'banner' 
}) => {
  const getHeight = () => {
    switch (size) {
      case 'largeBanner': return 100;
      case 'mediumRectangle': return 250;
      default: return 50;
    }
  };

  return (
    <View style={[styles.adContainer, { height: getHeight() }]}>
      <Text style={styles.adText}>AdMob Banner ({size})</Text>
      <Text style={styles.adSubtext}>Replace with actual AdMob component</Text>
    </View>
  );
};

// AdMob Interstitial Placeholder
export const showInterstitialAd = () => {
  // TODO: Implement AdMob Interstitial
  console.log('Show Interstitial Ad');
};

// AdMob Rewarded Placeholder
export const showRewardedAd = () => {
  // TODO: Implement AdMob Rewarded Ad
  console.log('Show Rewarded Ad');
};

const styles = StyleSheet.create({
  adContainer: {
    width: width - 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  },
  adText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  adSubtext: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
});
