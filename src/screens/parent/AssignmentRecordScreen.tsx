import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const AssignmentRecordScreen = ({ route }) => {
  const { id } = route.params;
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAssignment = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://erpcollege.free.beeceptor.com/assignment/${id}`); // Replace with your actual host URL
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

    fetchAssignment();
  }, [id]);

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
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        Alert.alert('Error', 'An error occurred while uploading the assignment.');
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!assignment) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Assignment not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
        <View style={styles.buttonContainer}>
          <Button title="Download & Share PDF" onPress={downloadPDF} />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Upload Completed Assignment" onPress={uploadAssignment} />
      </View>
      <Text style={styles.uploadStatus}>Upload Status: {assignment.upload_status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subject: {
    fontSize: 18,
    marginBottom: 5,
  },
  dueDate: {
    fontSize: 16,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  uploadStatus: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default AssignmentRecordScreen;
