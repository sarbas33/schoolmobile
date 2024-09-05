import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AssignmentRecordScreen = () => {
  const { id } = useRoute().params;
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://erpcollege.free.beeceptor.com/assignment/${id}`);
      if (response.status === 200) {
        setAssignment(response.data.assignment);
      } else {
        Alert.alert('Error', 'Failed to fetch assignment details.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching the assignment.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!assignment || !assignment.download_url) {
      Alert.alert('Error', 'No PDF URL found for this assignment.');
      return;
    }

    const fileName = assignment.download_url.split('/').pop();
    const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    setLoading(true);
    try {
      const downloadResult = await RNFS.downloadFile({
        fromUrl: assignment.download_url,
        toFile: path,
      }).promise;

      if (downloadResult.statusCode === 200) {
        Alert.alert('Success', 'PDF downloaded successfully.');
        sharePDF(path);
      } else {
        Alert.alert('Error', 'Failed to download the PDF.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while downloading the PDF.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const sharePDF = async (filePath) => {
    try {
      await Share.open({
        url: 'file://' + filePath,
        type: 'application/pdf',
      });
    } catch (error) {
      console.log('Error sharing file:', error);
    }
  };

  const uploadAssignment = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const filePath = res.uri;
      const fileName = res.name;
      const fileType = res.type;

      const fileData = await RNFS.readFile(filePath, 'base64');

      const formData = new FormData();
      formData.append('file', {
        uri: filePath,
        type: fileType,
        name: fileName,
        data: fileData,
      });

      setLoading(true);
      const response = await axios.post('YOUR_UPLOAD_URL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Assignment uploaded successfully.');
      } else {
        Alert.alert('Error', 'Failed to upload the assignment.');
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'An error occurred while uploading the assignment.');
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors.screenBackground,
    },
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: Fonts.size.xlarge,
      fontWeight: Fonts.weight.bold,
      color: Colors.text,
      marginBottom: 8,
    },
    subject: {
      fontSize: Fonts.size.medium,
      color: Colors.textLight,
      marginBottom: 4,
    },
    dueDate: {
      fontSize: Fonts.size.medium,
      color: Colors.textLight,
      marginBottom: 16,
    },
    description: {
      fontSize: Fonts.size.regular,
      color: Colors.text,
      marginBottom: 16,
    },
    detailsContainer: {
      marginBottom: 16,
    },
    heading: {
      fontSize: Fonts.size.large,
      fontWeight: Fonts.weight.semibold,
      color: Colors.text,
      marginBottom: 8,
    },
    detailDescription: {
      fontSize: Fonts.size.regular,
      color: Colors.text,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginBottom: 12,
    },
    buttonIcon: {
      marginRight: 8,
    },
    buttonText: {
      color: Colors.white,
      fontSize: Fonts.size.medium,
      fontWeight: Fonts.weight.semibold,
    },
    uploadStatus: {
      fontSize: Fonts.size.regular,
      color: Colors.textLight,
      fontStyle: 'italic',
      marginTop: 16,
    },
    errorText: {
      fontSize: Fonts.size.large,
      color: Colors.error,
      textAlign: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.screenBackground,
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!assignment) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Assignment not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{assignment.title}</Text>
        <Text style={styles.subject}>Subject: {assignment.subject}</Text>
        <Text style={styles.dueDate}>Due Date: {assignment.due_date}</Text>
        <Text style={styles.description}>{assignment.description}</Text>
        {assignment.content && assignment.content.details.map((detail, index) => (
          <View key={index} style={styles.detailsContainer}>
            <Text style={styles.heading}>{detail.heading}</Text>
            <Text style={styles.detailDescription}>{detail.description}</Text>
          </View>
        ))}
        {assignment.download_url && (
          <TouchableOpacity style={styles.button} onPress={downloadPDF}>
            <Ionicons name="download-outline" size={20} color={Colors.white} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Download & Share PDF</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={uploadAssignment}>
          <Ionicons name="cloud-upload-outline" size={20} color={Colors.white} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Upload Completed Assignment</Text>
        </TouchableOpacity>
        <Text style={styles.uploadStatus}>Upload Status: {assignment.upload_status}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssignmentRecordScreen;
