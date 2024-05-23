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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmptyCartImage from '../assets/images/emptycart.png';
import background from '../assets/images/background.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Orders = ({route}) => {
  const navigation = useNavigation();

  // const {cartItems: initialCartItems} = route.params;
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateSubtotal();
  }, [cartItems]);

  const calculateSubtotal = () => {
    let subtotalAmount = 0;
    cartItems.forEach(item => {
      if (item.variants && item.variants.length > 0) {
        subtotalAmount += item.variants[0].price * 1;
      }
    });
    setSubtotal(subtotalAmount);
    setTotal(subtotalAmount + 40); // Assuming shipping cost is $40, adjust accordingly
  };

  const handleDelete = async product_id => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      const parsedCartItems = JSON.parse(storedCartItems);

      if (parsedCartItems) {
        const updatedCartItems = parsedCartItems.filter(
          item => item.id !== product_id,
        );
        await AsyncStorage.setItem(
          'cartItems',
          JSON.stringify(updatedCartItems),
        );
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
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
          <Text style={styles.topHeading}>My Order</Text>
        </View>

        {cartItems && cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Image style={styles.emptyCartImage} source={EmptyCartImage} />
            <Text style={styles.emptyCartText}>No Order</Text>
          </View>
        ) : (
          <ScrollView style={styles.cardContainer}>
            {cartItems.map(product => (
              <View style={styles.itemContainer} key={product.product_id}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.cardImage}
                    source={{uri: product.image && product.image.src}}
                  />
                </View>

                <View style={styles.detailsContainer}>
                  <Text style={styles.productHeading}>{product.title}</Text>
                  <Text style={styles.price}>
                    ${product.variants && product.variants[0].price}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.quantityButton, styles.subtract]}>
                      <Text style={styles.sbtractText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>1</Text>
                    <TouchableOpacity style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      handleDelete(product.id);
                    }}
                    style={styles.deleteButton}>
                    <Ionicons name="trash-outline" style={styles.deleteIcon} />
                  </TouchableOpacity>
                </View>
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
    paddingHorizontal: 10,
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#F6F8F7',
    borderRadius: 14,
  },
  imageContainer: {
    width: 99,
    height: 85,
    margin: 10,
  },
  cardImage: {
    flex: 1,
    borderRadius: 10,
    height: '100%',
    width: '100%',
  },
  detailsContainer: {
    flex: 1,
  },
  productHeading: {
    fontFamily: 'Inter-Regular',
    fontSize: 19,
    fontWeight: '500',
    color: '#131313',
    top: 10,
  },
  price: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontWeight: '500',
    color: '#1A2530',
    top: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityButton: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#080063',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtract: {
    backgroundColor: '#ffffff',
  },
  sbtractText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#828A89',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#1A2530',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  deleteButton: {
    position: 'absolute',
    right: 20,
    bottom: 10,
  },
  deleteIcon: {
    fontSize: 22,
  },
  contentContainer: {
    width: '95%',
    backgroundColor: '#E6E6E6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'relative',
    bottom: 0,
    left: '2.5%',
    right: '2.5%',
  },
  subtotalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subtotalHeading: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#707B81',
  },
  subtotalText: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    fontWeight: '400',
    color: '#1A2530',
  },
  line: {
    height: 1,
    backgroundColor: '#EEEEEE',
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalHeading: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2530',
  },
  totalText: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    fontWeight: '700',
    color: '#1A2530',
  },
  buttonBox: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#080063',
    borderRadius: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default Orders;
