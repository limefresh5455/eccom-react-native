import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';

import background from '../assets/images/background.png';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  return (
   
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <Text style={styles.heading}>Recovery Password</Text>
          <Text style={styles.description}>
            Please Enter Your Email Address To Recieve a verification Code
          </Text>

          <Text style={styles.emailHeading}>Your Email</Text>
          <View style={styles.input}>
            <Octicons name="person" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
              placeholder="Email"
              placeholderTextColor="#777777"
            />
          </View>

          <TouchableOpacity style={styles.continue}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },

  heading: {
    fontSize: 30,
    color: '#131313',
    fontWeight: '700',
    marginTop: screenHeight * 0.2,
    marginLeft: screenWidth * 0.05,
  },
  description: {
    fontSize: 16, // 3% of window width
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    color: '#777777',
    marginBottom: 12,
    marginLeft: screenWidth * 0.05,
  },
  emailHeading: {
    fontSize: 16, // 3% of window width
    fontWeight: '500',
    fontFamily: 'Inter-Regular',
    color: '#131313',
    marginLeft: screenWidth * 0.05,
    marginTop: screenHeight * 0.05,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    height: 50,
    width: '90%',
    borderColor: '#131313',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: screenHeight * 0.02,
  },
  icon: {
    fontSize: 24,
    color: '#131313',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
  },
  continue: {
    backgroundColor: '#080063',
    borderRadius: 42,
    height: 50,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  continueText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
 
});

export default ForgotPassword;
