import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import { useTheme } from '../../core/theme/ThemeContext';
import { Plus, Trash2, Merge, FileText } from 'lucide-react-native';

interface SelectedPDF {
  uri: string;
  name: string;
  id: string;
}

export const PDFMerger: React.FC = () => {
  const { t } = useTranslation();
  const { effectiveTheme } = useTheme();
  const [selectedPDFs, setSelectedPDFs] = useState<SelectedPDF[]>([]);
  const [loading, setLoading] = useState(false);
  
  const isDark = effectiveTheme === 'dark';

  const pickPDFs = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        multiple: true,
      });

      if (!result.canceled) {
        const newPDFs = result.assets.map(asset => ({
          uri: asset.uri,
          name: asset.name,
          id: Math.random().toString(),
        }));
        setSelectedPDFs(prev => [...prev, ...newPDFs]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick PDF files');
    }
  };

  const removePDF = (id: string) => {
    setSelectedPDFs(prev => prev.filter(pdf => pdf.id !== id));
  };

  const mergePDFs = async () => {
    if (selectedPDFs.length < 2) {
      Alert.alert('Error', 'Please select at least 2 PDF files to merge');
      return;
    }

    setLoading(true);
    try {
      // Note: This is a placeholder implementation
      // In a real app, you would use a PDF manipulation library
      Alert.alert(
        'Feature Coming Soon',
        'PDF merging functionality will be implemented with a native PDF library. For now, this is a placeholder.',
        [
          {
            text: 'Share First PDF',
            onPress: () => Sharing.shareAsync(selectedPDFs[0].uri),
          },
          { text: 'OK' },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to merge PDFs');
    } finally {
      setLoading(false);
    }
  };

  const renderPDF = ({ item }: { item: SelectedPDF }) => (
    <View style={[styles.pdfItem, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <FileText color={isDark ? '#4CAF50' : '#2196F3'} size={24} />
      <Text 
        style={[styles.pdfName, { color: isDark ? '#fff' : '#333' }]}
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removePDF(item.id)}
      >
        <Trash2 color="#fff" size={16} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2196F3' }]}
        onPress={pickPDFs}
      >
        <Plus color="#fff" size={20} />
        <Text style={styles.buttonText}>Add PDF Files</Text>
      </TouchableOpacity>

      {selectedPDFs.length > 0 && (
        <>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#333' }]}>
            Selected PDFs ({selectedPDFs.length})
          </Text>
          
          <FlatList
            data={selectedPDFs}
            renderItem={renderPDF}
            keyExtractor={(item) => item.id}
            style={styles.pdfList}
          />

          <TouchableOpacity
            style={[
              styles.button, 
              { 
                backgroundColor: selectedPDFs.length >= 2 ? '#4CAF50' : '#ccc',
                opacity: selectedPDFs.length >= 2 ? 1 : 0.6,
              }
            ]}
            onPress={mergePDFs}
            disabled={loading || selectedPDFs.length < 2}
          >
            <Merge color="#fff" size={20} />
            <Text style={styles.buttonText}>
              {loading ? 'Merging PDFs...' : 'Merge PDFs'}
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
  pdfList: {
    flex: 1,
    marginBottom: 20,
  },
  pdfItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  pdfName: {
    flex: 1,
    fontSize: 14,
    marginLeft: 12,
  },
  removeButton: {
    backgroundColor: '#f44336',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
