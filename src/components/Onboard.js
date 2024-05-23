import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import background from '../assets/images/background.png';
import empty from '../assets/images/backImage.jpg';
import logo from '../assets/images/MyLogo.png';
import uperBackground from '../assets/images/uperBackground.png';
import VideoPlayer from 'react-native-video';
import Feather from 'react-native-vector-icons/Feather'; // Import play icon from react-native-vector-icons
import AntDesign from 'react-native-vector-icons/AntDesign'; // Import play icon from react-native-vector-icons
import {useNavigation} from '@react-navigation/native';

const Onboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const navigation = useNavigation();

  const openModal = video => {
    setSelectedVideo(video);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setModalVisible(false);
  };

  const videos = [
    {id: 1, uri: require('../assets/videos/intro.mp4'), image: empty},
    {id: 2, uri: require('../assets/videos/intro2.mp4'), image: empty},
    {id: 3, uri: require('../assets/videos/intro4.mp4'), image: empty},
    {id: 4, uri: require('../assets/videos/intro3.mp4'), image: empty},
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <View style={styles.upperBackground}>
            <Image
              source={uperBackground}
              resizeMode="cover"
              style={styles.upperBackgroundImage}
            />
          </View>

          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>

          <Text style={styles.heading}>Build business with us</Text>

          <View style={styles.cardContainer}>
            {videos.map(video => (
              <TouchableOpacity
                key={video.id}
                style={styles.itemContainer}
                onPress={() => openModal(video)}>
                <ImageBackground
                  source={video.image}
                  style={styles.videoThumbnail}>
                  <Feather
                    name="play-circle"
                    size={50}
                    color="#ffffff"
                    style={styles.playIcon}
                  />
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.register}
            onPress={() => navigation.navigate('login')}>
            <Text style={styles.registerText}>Proceed Now</Text>
          </TouchableOpacity>

          {/* Modal for playing selected video */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <AntDesign name="close" style={styles.closeButtonText} />
              </TouchableOpacity>
              {selectedVideo && (
                <VideoPlayer
                  source={selectedVideo.uri}
                  style={styles.modalVideo}
                  resizeMode="contain"
                  autoplay={true}
                  controls={true}
                />
              )}
            </View>
          </Modal>
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
  upperBackground: {
    alignItems: 'center',
  },
  upperBackgroundImage: {
    width: '100%',
    height: 250,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    right: 20,
    marginTop: '15%',
    position: 'absolute',
  },
  logo: {
    resizeMode: 'contain',
    width: '80%',
  },
  heading: {
    fontSize: 34,
    color: '#131313',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  itemContainer: {
    width: '45%',
    height: '100%',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  videoThumbnail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    opacity: 0.8,
  },
  register: {
    backgroundColor: '#080063',
    borderRadius: 42,
    height: 50,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
    alignSelf: 'center',
    marginBottom: '10%',
  },
  registerText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalVideo: {
    width: Dimensions.get('window').width - 40,
    height: ((Dimensions.get('window').width - 40) * 9) / 16,
  },
  closeButton: {
    position: 'absolute',
    top: 160,
    right: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 30,
  },
});

export default Onboard;
