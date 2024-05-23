import {useNavigation, CommonActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {ApolloClient, InMemoryCache, HttpLink, gql} from '@apollo/client';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import config from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import logo from '../assets/images/MyLogo.png';
import uperBackground from '../assets/images/uperBackground.png';
import background from '../assets/images/background.png';
import facebook from '../assets/images/facebook.png';
import linkedin from '../assets/images/linkedin.png';
import google from '../assets/images/google.png';
import twitter from '../assets/images/twitter.png';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [errors, setErrors] = useState({
    userName: '',
    password: '',
  });

  const apiEndpoint = `${config.shopifyStoreUrlEcommerce}/api/${config.apiVersion}/graphql.json`;
  const client = new ApolloClient({
    link: new HttpLink({
      uri: apiEndpoint,
      headers: {
        'X-Shopify-Storefront-Access-Token': config.shopifyStoreFrontApiKey,
      },
    }),
    cache: new InMemoryCache(),
  });

  const LOGIN_CUSTOMER = gql`
    mutation CustomerLogin($email: String!, $password: String!) {
      customerAccessTokenCreate(input: {email: $email, password: $password}) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const handleLogin = () => {
    setErrors({
      email: '',
      password: '',
    });
    let isValid = true;
    if (!email || !/^\S+@\S+\.\S+/.test(email)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        userName: 'Invalid User Name',
      }));
      isValid = false;
    }
    if (!password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Required.',
      }));
      isValid = false;
    }
    if (isValid) {
      client
        .mutate({
          mutation: LOGIN_CUSTOMER,
          variables: {
            email: email,
            password: password,
          },
        })
        .then(response => {
          if (response.data.customerAccessTokenCreate.customerAccessToken) {
            const accessToken =
              response.data.customerAccessTokenCreate.customerAccessToken
                .accessToken;
            if (accessToken) {
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Logged In Successful',
                text2: 'You have successfully registered!',
              });
              fetchCustomerDetails(accessToken);
            }
          } else {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Login Failed',
              text2:
                response.data.customerAccessTokenCreate.customerUserErrors[0]
                  .message,
            });
          }
        });
    }
  };

  const fetchCustomerDetails = accessToken => {
    const GET_CUSTOMER_DETAILS = gql`
      query GetCustomerDetails($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          firstName
          lastName
          email
          acceptsMarketing
          defaultAddress {
            id
            address1
            address2
            city
            country
            province
            zip
          }
        }
      }
    `;
    const headers = {
      'X-Shopify-Customer-Access-Token': accessToken,
    };
    client
      .query({
        query: GET_CUSTOMER_DETAILS,
        variables: {
          customerAccessToken: accessToken,
        },
        headers: headers,
      })
      .then(async response => {
        const customerDetails = response.data.customer;
        console.log(customerDetails, 'adfdfdsf');
        await AsyncStorage.setItem(
          'userDetail',
          JSON.stringify(customerDetails),
        );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }),
        );
      })

      .catch(error => {
        console.error(error);
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={uperBackground}
              resizeMode="cover"
              style={{width: '100%', height: 250}}
            />
          </View>

          <View style={styles.logoCantainer}>
            <Image source={logo} style={styles.logo} />
          </View>
          <Text style={styles.heading}>Sign In</Text>

          <View style={[styles.input, styles.firstBox]}>
            <Octicons name="person" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
              placeholder="Email"
              placeholderTextColor="#777777"
            />
          </View>
          <Text style={styles.errorText}>{errors.userName}</Text>

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

          <TouchableOpacity
          onPress={()=>navigation.navigate('forgotpassword')}
          >
            <Text style={styles.forgotText}>Forgot Password ?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} style={styles.register}>
            <Text style={styles.registerText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.accountText}>Or sign in with</Text>

          <View style={styles.socialIconContainer}>
            <TouchableOpacity style={styles.socialIcon}>
              <Image source={google} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Image source={facebook} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Image source={twitter} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Image source={linkedin} style={styles.image} />
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
    marginRight: '40%',
    marginTop: '14%',
    position: 'absolute',
  },
  logo: {
    resizeMode: 'contain',
    width: '90%',
  },
  heading: {
    fontSize: 30,
    color: '#131313',
    fontWeight: '700',
    marginTop: screenHeight * 0.05,
    marginLeft: screenWidth * 0.05,
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
  firstBox: {
    marginTop: '5%',
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
  errorText: {
    color: 'red',
    fontSize: 14,
    left: '8%',
  },
  eyeIcon: {
    fontSize: 18,
    right: 5,
    color: '#777777',
  },
  forgotText: {
    fontFamily: 'Inter-Regular',
    fontWeight: '500',
    fontSize: 15,
    color: '#131313',
    textAlign: 'right',
    position: 'absolute',
    right: 0,
    marginRight: 40,
  },
  register: {
    backgroundColor: '#080063',
    borderRadius: 42,
    height: 50,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  registerText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  accountText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 70,
  },
  socialIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: '5%',
    marginBottom: '2%',
  },
  socialIcon: {
    height: 50,
    width: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This property is for Android only
  },
  image: {
    margin: 10,
  },
});

export default Login;
