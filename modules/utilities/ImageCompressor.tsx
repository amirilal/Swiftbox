import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useTheme } from '../../core/theme/ThemeContext';

export const ImageCompressor: React.FC = () => {
  const { t } = useTranslation();
  const { effectiveTheme } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const isDark = effectiveTheme === 'dark';

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setCompressedImage(null);
    }
  };

  const compressImage = async () => {
    if (!selectedImage) return;

    setLoading(true);
    try {
      const compressed = await ImageManipulator.manipulateAsync(
        selectedImage,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      
      setCompressedImage(compressed.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to compress image');
    } finally {
      setLoading(false);
    }
  };

  const shareImage = async () => {
    if (!compressedImage) return;
    
    await Sharing.shareAsync(compressedImage);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2196F3' }]}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#4CAF50' }]}
            onPress={compressImage}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Compressing...' : 'Compress Image'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {compressedImage && (
        <View style={styles.imageContainer}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#333' }]}>
            Compressed Image:
          </Text>
          <Image source={{ uri: compressedImage }} style={styles.image} />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF9800' }]}
            onPress={shareImage}
          >
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
});
