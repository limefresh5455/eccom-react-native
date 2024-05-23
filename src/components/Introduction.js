import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Introduction = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkAndNavigate();
  }, []);

  const checkAndNavigate = async () => {
    try {
      const data = await AsyncStorage.getItem('userDetail');
      if (data) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error checking local storage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={require(`../assets/videos/intro.mp4`)}
        // source={{ uri: 'https://media.istockphoto.com/id/1071022938/video/handsome-young-man-sits-at-home-browses-through-online-retailer-clothes-selling-store-man.mp4?s=mp4-640x640-is&k=20&c=mi2ki5WTzdud9j23fo5WBJGMnHXnLIa4HtuaRadU5Y0=' }}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Start Your Shopping Journey Now</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ligula eget
            dolor aenean.
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('register')}
            style={styles.button}>
            <Text style={styles.buttonText}>Let's Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // Add overlay styles here
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Example background color
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Move content to the bottom
    paddingHorizontal: '10%', // Responsive padding
    paddingBottom: '5%', // Responsive padding at the bottom
  },
  heading: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '800',
    fontFamily: 'Inter-Regular',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#080063',
    borderRadius: 42,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Inter-Regular',
    fontSize: 18,
  },
});

export default Introduction;
