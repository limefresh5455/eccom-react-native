import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import profile from '../assets/images/profile.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const SideMenu = ({onClose, route}) => {
  const [userDetails, setUserDetails] = useState(null);
  const {cartItems} = route.params;

  const navigation = useNavigation();

  const logoutAccount = async () => {
    await AsyncStorage.removeItem('userDetail');
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });
  };

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    try {
      const userName = await AsyncStorage.getItem('userDetail');
      if (userName) {
        console.log('User details:', userName);
        // Update state with user details
        setUserDetails(JSON.parse(userName));
      } else {
        console.log('No user details found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error loading user details:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.overlay} onPress={onClose} />
        <View style={styles.sidebar}>
          <View style={styles.imageContainer}>
            <Image style={styles.profileImage} source={profile} />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.hey}>Hey 👋</Text>
            <Text style={styles.name}>
              {userDetails?.firstName} {userDetails?.lastName}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('profile')}
            style={styles.option}>
            <Ionicons name="person-outline" style={styles.optionIcon} />
            <Text style={styles.optionText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.option}>
            <Ionicons name="home-outline" style={styles.optionIcon} />
            <Text style={styles.optionText}>Home Page</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('cart', {cartItems})}
            style={styles.option}>
            <Ionicons name="bag-handle-outline" style={styles.optionIcon} />
            <Text style={styles.optionText}>Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Favorite')}
            style={styles.option}>
            <Ionicons name="heart-outline" style={styles.optionIcon} />
            <Text style={styles.optionText}>Favorite</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('orders')}
          style={styles.option}>
            <MaterialCommunityIcons
              name="truck-fast-outline"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <MaterialCommunityIcons
              name="bell-ring-outline"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Notifications</Text>
          </TouchableOpacity>

          <View style={styles.line}></View>

          <TouchableOpacity
            onPress={() => logoutAccount()}
            style={styles.option}>
            <MaterialCommunityIcons name="logout" style={styles.optionIcon} />
            <Text style={styles.optionText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
  },
  sidebar: {
    width: '100%', // Adjust the width of the sidebar as needed
    backgroundColor: '#080063',
    paddingVertical: height * 0.1,
    paddingHorizontal: width * 0.05,
  },
  imageContainer: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    overflow: 'hidden',
    marginBottom: height * 0.02,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nameContainer: {
    marginBottom: height * 0.05,
  },
  hey: {
    color: '#707B81',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: height * 0.01,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.01,
    width: '40%',
  },
  optionIcon: {
    marginLeft: width * 0.02,
    width: width * 0.06,
    height: height * 0.04,
    marginRight: width * 0.02,
    color: '#ffffff',
    fontSize: 18,
  },
  optionText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: width * 0.03,
  },
  line: {
    height: 1,
    width: '50%',
    backgroundColor: '#EEEEEE',
    marginVertical: height * 0.01,
  },
});

export default SideMenu;
