import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import logo from '../assets/images/logo.png';
import background from '../assets/images/background.png';
import config from '../config/config';

const Register = () => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showCnfPassword, setShowCnfPassword] = useState(true);
  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: '',
    cnfPassword: '',
  });

  const handleRegister = async () => {
    setErrors({
      userName: '',
      email: '',
      password: '',
      cnfPassword: '',
    });
    let isValid = true;
    if (!userName) {
      setErrors(prevErrors => ({
        ...prevErrors,
        userName: 'Username must be at least 3 characters.',
      }));
      isValid = false;
    }

    if (!email || !/^\S+@\S+\.\S+/.test(email)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Invalid email address',
      }));
      isValid = false;
    }
    if (!password || password.length < 6) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password must be at least 6 characters',
      }));
      isValid = false;
    }
    if (isValid) {
      try {
        const customerData = {
          customer: {
            first_name: userName,
            email,
            password,
            password_confirmation: password,
          },
        };
        console.log('customerData', customerData);
        const response = await axios.post(
          `${config.shopifyStoreUrlEcommerce}/admin/api/${config.apiVersion}/customers.json`,
          customerData,
          {
            headers: {
              'X-Shopify-Access-Token': config.shopifyApiKey,
            },
          },
        );
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Registration Successful',
          text2: 'You have successfully registered!',
        });
        navigation.navigate('onboard');
      } catch (error) {
        if (
          error.response &&
          error.response.status === 422 &&
          error.response.data &&
          error.response.data.errors &&
          error.response.data.errors.email
        ) {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Registration Failed',
            text2: 'Email is already registered. Please log in instead.',
          });
        } else {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Registration Failed',
            text2: 'An error occurred during registration.',
          });
        }
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <View style={styles.logoCantainer}>
            <Image source={logo} style={styles.logo} />
          </View>

          <Text style={styles.heading}>Sign Up</Text>

          <View style={styles.input}>
            <Octicons name="person" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setUserName(text)}
              placeholder="Full Name"
              placeholderTextColor="#777777"
            />
          </View>

          <Text style={styles.errorText}>{errors.userName}</Text>

          <View style={styles.input}>
            <Feather name="mail" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
              placeholder="Email"
              placeholderTextColor="#777777"
            />
          </View>

          <Text style={styles.errorText}>{errors.email}</Text>

          <View style={styles.input}>
            <MaterialIcons name="lock-outline" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setPassword(text)}
              placeholder="Password"
              placeholderTextColor="#777777"
              secureTextEntry={showPassword}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? 'eye-off' : 'eye'}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.errorText}>{errors.password}</Text>

          <View style={styles.input}>
            <MaterialIcons name="lock-outline" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setCnfPassword(text)}
              placeholder="Confirm Password"
              placeholderTextColor="#777777"
              secureTextEntry={showCnfPassword}
            />
            <TouchableOpacity
              onPress={() => setShowCnfPassword(!showCnfPassword)}>
              <Feather
                name={showCnfPassword ? 'eye-off' : 'eye'}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.errorText}>{errors.password}</Text>

          <TouchableOpacity onPress={handleRegister} style={styles.register}>
            <Text style={styles.registerText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text style={styles.accountText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.login}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  logoCantainer: {
    width: '100%',
    alignItems: 'center',
    marginLeft: '10%',
    marginTop: '20%',
  },
  logo: {
    resizeMode: 'contain',
    width: '50%',
  },
  heading: {
    fontSize: 30,
    color: '#131313',
    fontWeight: '700',
    marginTop: 20,
    left: '5%',
    marginBottom: 20,
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
    marginTop: 12,
  },
  icon: {
    fontSize: 22,
    color: '#131313',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    left: '6%',
  },
  eyeIcon: {
    fontSize: 20,
    right: 5,
    color: '#777777',
  },
  register: {
    backgroundColor: '#080063',
    borderRadius: 42,
    height: 50,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    alignSelf: 'center',
  },
  registerText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 120,
  },
  accountText: {
    fontSize: 15,
    color: '#131313',
    fontWeight: '400',
    marginRight: 5,
    marginBottom: 10,
  },
  login: {
    fontSize: 15,
    color: '#080063',
    fontWeight: '700',
  },
});

export default Register;
