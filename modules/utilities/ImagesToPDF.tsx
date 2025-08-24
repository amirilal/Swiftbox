import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useTheme } from '../../core/theme/ThemeContext';
import { Plus, Trash2, FileText } from 'lucide-react-native';

interface SelectedImage {
  uri: string;
  id: string;
}

export const ImagesToPDF: React.FC = () => {
  const { t } = useTranslation();
  const { effectiveTheme } = useTheme();
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [loading, setLoading] = useState(false);
  
  const isDark = effectiveTheme === 'dark';

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImages = result.assets.map(asset => ({
        uri: asset.uri,
        id: Math.random().toString(),
      }));
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (id: string) => {
    setSelectedImages(prev => prev.filter(img => img.id !== id));
  };

  const createPDF = async () => {
    if (selectedImages.length === 0) {
      Alert.alert('Error', 'Please select at least one image');
      return;
    }

    setLoading(true);
    try {
      const htmlContent = `
        <html>
          <head>
            <style>
              body { margin: 0; padding: 20px; }
              .image { 
                width: 100%; 
                max-width: 600px; 
                height: auto; 
                margin-bottom: 20px; 
                page-break-inside: avoid;
              }
            </style>
          </head>
          <body>
            ${selectedImages.map(img => `
              <img src="${img.uri}" class="image" />
            `).join('')}
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      await Sharing.shareAsync(uri, {
        UTI: '.pdf',
        mimeType: 'application/pdf',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to create PDF');
    } finally {
      setLoading(false);
    }
  };

  const renderImage = ({ item }: { item: SelectedImage }) => (
    <View style={styles.imageItem}>
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeImage(item.id)}
      >
        <Trash2 color="#fff" size={16} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2196F3' }]}
        onPress={pickImages}
      >
        <Plus color="#fff" size={20} />
        <Text style={styles.buttonText}>Add Images</Text>
      </TouchableOpacity>

      {selectedImages.length > 0 && (
        <>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#333' }]}>
            Selected Images ({selectedImages.length})
          </Text>
          
          <FlatList
            data={selectedImages}
            renderItem={renderImage}
            keyExtractor={(item) => item.id}
            numColumns={3}
            style={styles.imageList}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#4CAF50' }]}
            onPress={createPDF}
            disabled={loading}
          >
            <FileText color="#fff" size={20} />
            <Text style={styles.buttonText}>
              {loading ? 'Creating PDF...' : 'Create PDF'}
            </Text>
          </TouchableOpacity>
        </>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  imageList: {
    flex: 1,
    marginBottom: 20,
  },
  imageItem: {
    flex: 1,
    margin: 5,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#f44336',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
