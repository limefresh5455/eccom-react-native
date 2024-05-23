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
import background from '../assets/images/background.png';
import BlankImage from '../assets/images/blankImage.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Details = ({route}) => {
  const {product} = route.params;

  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
  }, [cartItems]);

  const loadCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  const saveCartItems = async items => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  };

  const addtocartHandler = () => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    saveCartItems(updatedCartItems);
  };

  const goToCart = () => {
    navigation.navigate('cart', {cartItems});
  };

  return (
   
    <View style={styles.container}>
          <ImageBackground source={background} style={styles.backgroundImage} resizeMode="cover">
          <View style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.circle}>
              <Ionicons name="chevron-back" style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.topHeading}>{product.title}</Text>
            <TouchableOpacity
              onPress={goToCart}
              style={[styles.circle, styles.cart]}>
              <Ionicons
                name="bag-handle-outline"
                style={styles.bagIcon}
                color="#000"
              />
              <View>
                {cartItems.length >= 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartItems.length}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={{
            position:'absolute',
            bottom:0,
          }} >
          <View style={styles.imageContainer}>
            {product.image && product.image.src ? (
              <Image
                style={styles.cardImage}
                source={{uri: product.image.src}}
              />
            ) : (
              <Image style={styles.cardImage} source={BlankImage} />
            )}
          </View>
          
          <View style={styles.contentContainer}>
            <Text style={styles.sellerHeading}>BEST SELLER</Text>
            <Text style={styles.productHeading}>{product.title}</Text>
            <Text style={styles.price}>${product.variants[0].price}</Text>
            <Text style={styles.description}>
              There Are Many Beautiful And Attractive Plants To Your Room
            </Text>
            <Text style={styles.similarHeading}>Similar product</Text>
            <View style={styles.similarimageContainer}>
              {product.image && product.image.src ? (
                <Image
                  style={styles.similarcardImage}
                  source={{uri: product.image.src}}
                />
              ) : (
                <Image style={styles.similarcardImage} source={BlankImage} />
              )}
            </View>
            <View style={styles.footer}>
              <View style={styles.footerPriceBox}>
                <Text style={styles.footerPrice}>Price</Text>
                <Text style={styles.footerPriceText}>
                  ${product.variants[0].price}
                </Text>
              </View>
              <View style={styles.buttonBox}>
                <TouchableOpacity
                  onPress={addtocartHandler}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Add To Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </View>
      </ImageBackground>
        </View>

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
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.05,
    marginTop: windowHeight * 0.02,
  },
  circle: {
    height: 44,
    width: 44,
    borderRadius: 40,
    backgroundColor: '#E67E22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: windowHeight * 0.035, // 3.5% of window height
    color: '#FFFFFF',
  },
  topHeading: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'Inter-Regular',
    color: '#131313',
    fontWeight: '700',
    textAlign: 'center',
  },
  cart: {
    backgroundColor: '#ECECEC',
  },
  bagIcon: {
    fontSize: windowHeight * 0.04, // 4% of window height
    color: '#E67E22',
  },
  badge: {
    position: 'absolute',
    bottom: 25,
    left: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: windowWidth * 0.025,
    bottom: 1,
  },

  imageContainer: {
    alignItems: 'center',
    marginTop: windowHeight * 0.02,
    marginBottom:20
  },
  cardImage: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.9,
    borderRadius: windowHeight * 0.04,
  },
  contentContainer: {
    // flex: 1,
    backgroundColor: '#F6F8F7',
    borderTopLeftRadius: windowWidth * 0.1, // 10% of window width
    borderTopRightRadius: windowWidth * 0.1, // 10% of window width
    paddingTop: windowHeight * 0.02, // 2% of window height
    // marginTop: windowHeight * 0.25,
    // position: 'absolute',
    // bottom: 0,
  },
  sellerHeading: {
    color: '#080063',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
    textAlign: 'left',
    marginBottom: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.05, // 5% of window width
  },
  productHeading: {
    fontSize: 24,
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    color: '#131313',
    marginBottom: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.05,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
    color: '#131313',
    marginBottom: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.05,
  },
  description: {
    fontSize: windowWidth * 0.03, // 3% of window width
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    color: '#777777',
    marginBottom: windowHeight * 0.04,
    paddingHorizontal: windowWidth * 0.05,
  },
  similarHeading: {
    fontFamily: 'Inter-Regular',
    fontWeight: '700',
    fontSize: windowWidth * 0.045, // 4.5% of window width
    left: windowWidth * 0.05,
    color: '#080063',
  },
  similarimageContainer: {
    paddingHorizontal: windowWidth * 0.05,
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.02,
  },
  similarcardImage: {
    height: windowHeight * 0.15,
    width: windowWidth * 0.43,
    borderRadius: windowHeight * 0.04,
  },
  footer: {
    backgroundColor: '#fff',
    height: 'auto',
    backgroundColor: '#E6E6E6',
    borderColor: '#E6E6E6',
    borderTopWidth: 0.4,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.01,
    borderBottomWidth: 0,
    borderTopLeftRadius: windowWidth * 0.05, // 5% of window width
    borderTopRightRadius: windowWidth * 0.05, // 5% of window width
    marginTop: windowHeight * 0.005,
    paddingVertical: windowHeight * 0.01,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: windowWidth * 0.05,
  },
  footerPriceBox: {
    width: '59%',
  },
  footerPrice: {
    color: '#777777',
    fontWeight: 'bold',
    fontSize: windowWidth * 0.04, // 4% of window width
  },
  footerPriceText: {
    fontFamily: 'Inter-Regular',
    fontWeight: '700',
    fontSize: windowWidth * 0.05, // 5% of window width
    color: '#1A2530',
  },
  buttonBox: {
    width: '41%',
  },
  button: {
    backgroundColor: '#080063',
    borderRadius: windowHeight * 0.03,
    height: windowHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * 0.02,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: windowHeight * 0.025,
    fontWeight: 'bold',
  },
});

export default Details;

