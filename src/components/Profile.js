import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import background from '../assets/images/background.png';
import ProfileImg from '../assets/images/profile.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ route }) => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Load user details from local storage when component mounts
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      // Retrieve user details from local storage
      const userDetailsJSON = await AsyncStorage.getItem('userDetail');
      console.log(userDetailsJSON,'userDetailsJSON')
      if (userDetailsJSON) {
        // Parse the stored JSON data
        const userDetails = JSON.parse(userDetailsJSON);
        // Set user details in state
        setFullName(userDetails.firstName);
        setEmail(userDetails.email);
        setPassword(userDetails.password);
      }
    } catch (error) {
      console.error('Error loading user details:', error);
    }
  };

  const saveUserDetails = async () => {
    try {
      // Convert user details to JSON string
      const userDetailsJSON = JSON.stringify({
        fullName: fullName,
        email: email,
        password: password,
      });
      // Store user details in local storage
      await AsyncStorage.setItem('userDetails', userDetailsJSON);
      console.log('User details saved successfully');
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View>
          <View style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.circle}>
              <Ionicons name="chevron-back" style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.topHeading}>Profile</Text>
            <TouchableOpacity onPress={saveUserDetails}>
              <AntDesign name="edit" style={styles.edit} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image source={ProfileImg} style={styles.profileImage} />
            <Text style={styles.imageText}>{fullName}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={text => setFullName(text)}
            />
            <Text style={styles.inputHeading}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <Text style={styles.inputHeading}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginTop: '5%',
  },
  circle: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: '#E67E22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  topHeading: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    color: '#131313',
    fontWeight: '700',
    textAlign: 'center',
  },
  edit: {
    padding: 10,
    fontSize: 25,
    color: '#777777',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '5%',
  },
  profileImage: {
    width: '30%',
    aspectRatio: 1,
  },
  imageText: {
    marginTop: '2%',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: '5%',
    marginTop: '5%',
  },
  inputHeading: {
    fontFamily: 'Inter-Regular',
    fontWeight: '700',
    fontSize: 16,
    color: '#131313',
    marginBottom: '2%',
  },
  input: {
    backgroundColor: '#ECECEC',
    borderRadius: 50,
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    marginBottom: '2%',
  },
});

export default Profile;

