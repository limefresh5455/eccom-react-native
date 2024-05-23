import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotFav from '../assets/images/notFav.png';
import background from '../assets/images/background.png';
import blankImage from '../assets/images/blankImage.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');
const itemWidth = width * 0.45;

const Favorite = () => {
  const navigation = useNavigation();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // Retrieve favorites from AsyncStorage
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          // If favorites exist, parse and set state
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites(); // Call the function to load favorites when the component mounts
  }, []);

  const handleDelete = async product_id => {
    try {
      // Remove the product from favorites state
      const updatedFavorites = favorites.filter(item => item.id !== product_id);
      setFavorites(updatedFavorites);

      // Update AsyncStorage with the updated favorites
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing product from favorites:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.circle}>
            <Ionicons
              name="chevron-back"
              style={styles.backIcon}
              color="#000"
            />
          </TouchableOpacity>
          <Text style={styles.topHeading}>Favorite</Text>
        </View>

        {favorites && favorites.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Image style={styles.emptyCartImage} source={NotFav} />
            <Text style={styles.emptyCartText}>No Favoties Yet</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.cardContainer}>
            {favorites.map(product => (
              <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                  {product.image && product.image.src ? (
                    <Image
                      style={styles.cardImage}
                      source={{uri: product.image.src}}
                    />
                  ) : (
                    <Image style={styles.cardImage} source={blankImage} />
                  )}
                </View>
                <View style={styles.favCircle}>
                  <TouchableOpacity
                    onPress={() => handleDelete(product.id)}
                    style={styles.favIcon}>
                    <Ionicons name="heart" size={18} color="#FF0000" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemHeading}>{product.title}</Text>
                <Text style={styles.price}>${product.variants[0].price}</Text>
              </View>
            ))}
          </ScrollView>
        )}
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
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
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
    fontFamily: 'Inter-Regular',
    fontSize: 30,
    fontWeight: '700',
    color: '#131313',
    width: '90%',
    textAlign: 'center',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  emptyCartText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '15%',
    marginTop: '3%',
  },
  itemContainer: {
    width: itemWidth,
    backgroundColor: '#F6F8F7',
    borderRadius: 20,
    marginBottom: '5%',
    margin: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: '5%',
  },
  cardImage: {
    height: 100,
    width: 120,
    borderRadius: 12,
  },
  favCircle: {
    position: 'absolute',
    top: '12%',
    left: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favIcon: {
    alignSelf: 'center',
  },
  itemHeading: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2%',
    marginTop: '5%',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    fontWeight: '500',
    color: '#1A2530',
    textAlign: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
  },
});

export default Favorite;
