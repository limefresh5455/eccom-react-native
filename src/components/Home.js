import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
  Modal,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import axios from 'axios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import config from '../config/config';
import Navbar from './Navbar';
import background from '../assets/images/background.png';
import blankImage from '../assets/images/blankImage.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Updated import statement

const {width} = Dimensions.get('window');
const itemWidth = width * 0.45;

const Home = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Category A');
  const [products, setProducts] = useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('option3');
  const [cartItems, setCartItems] = useState([]);

  const [favorites, setFavorites] = useState([]);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${config.shopifyStoreUrlEcommerce}/admin/api/${config.apiVersion}/products.json`,
        {
          headers: {
            'X-Shopify-Access-Token': `${config.shopifyApiKey}`,
          },
        },
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryPress = category => {
    setSelectedCategory(category);
  };

  const handleProductPress = product => {
    navigation.navigate('details', {product, cartItems});
  };

  const goToCart = () => {
    navigation.navigate('cart', {cartItems});
  };

  // Function to toggle modal visibility
  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };
  const handleSelection = option => {
    setSelectedFilter(option);
    setFilterModalVisible(!isFilterModalVisible);
  };

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    loadFavorites();
  }, [favorites]);

  const toggleFavorite = async productId => {
    const index = favorites.findIndex(product => product.id === productId);
    let updatedFavorites = [...favorites];
    if (index !== -1) {
      // If product is already in favorites, remove it
      updatedFavorites.splice(index, 1);
    } else {
      // If product is not in favorites, add it
      const productToAdd = products.find(product => product.id === productId);
      if (productToAdd) {
        updatedFavorites = [...favorites, productToAdd];
      }
    }
    setFavorites(updatedFavorites);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ImageBackground source={background} resizeMode="cover">
          <View style={styles.topContainer}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isFilterModalVisible}
              onRequestClose={() => setFilterModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>SORT BY</Text>

                  <View>
                    <View style={styles.filterOption}>
                      <Text style={styles.filterOptionText}>
                        Price-Low to High
                      </Text>
                      <RadioButton
                        value="option1"
                        status={
                          selectedFilter === 'option1' ? 'checked' : 'unchecked'
                        }
                        onPress={() => handleSelection('option1')}
                      />
                    </View>
                    <View style={styles.filterOption}>
                      <Text style={styles.filterOptionText}>
                        Price-High to Low
                      </Text>
                      <RadioButton
                        value="option2"
                        status={
                          selectedFilter === 'option2' ? 'checked' : 'unchecked'
                        }
                        onPress={() => handleSelection('option2')}
                      />
                    </View>
                    <View style={styles.filterOption}>
                      <Text style={styles.filterOptionText}>Newest First</Text>
                      <RadioButton
                        value="option3"
                        status={
                          selectedFilter === 'option3' ? 'checked' : 'unchecked'
                        }
                        onPress={() => handleSelection('option3')}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              onPress={() => navigation.navigate('sidemenu', {cartItems})}
              style={styles.circle}>
              <EvilIcons
                name="navicon"
                style={styles.navIcon}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <Text style={styles.topHeading}>Find your interest</Text>
            <TouchableOpacity
              onPress={goToCart}
              style={[styles.circle, styles.cart]}>
              <View>
                <Ionicons
                  name="bag-handle-outline"
                  style={styles.bagIcon}
                  color="#000"
                />
                {cartItems.length >= 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartItems.length}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#818a91"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Search products"
              placeholderTextColor="#777777"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={toggleFilterModal}>
            <Text style={styles.label}>Sort By</Text>
            <SimpleLineIcons name="arrow-down" color={'#131313'} size={12} />
          </TouchableOpacity>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity
              style={[
                styles.category,
                selectedCategory === 'Category A' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryPress('Category A')}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === 'Category A' && {color: '#ffffff'},
                ]}>
                Category A
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.category,
                selectedCategory === 'Category B' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryPress('Category B')}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === 'Category B' && {color: '#ffffff'},
                ]}>
                Category B
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.category,
                selectedCategory === 'Category C' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryPress('Category C')}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === 'Category C' && {color: '#ffffff'},
                ]}>
                Category C
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer}>
            {products.map(product => (
              <TouchableOpacity
                key={product.id}
                onPress={() => handleProductPress(product)}
                style={styles.itemContainer}>
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

                <TouchableOpacity
                  style={styles.favCircle}
                  onPress={() => toggleFavorite(product.id)}>
                  <Ionicons
                    name={
                      favorites.some(favProduct => favProduct.id === product.id)
                        ? 'heart'
                        : 'heart-outline'
                    }
                    size={18}
                    color={
                      favorites.some(favProduct => favProduct.id === product.id)
                        ? '#FF0000'
                        : '#DADADA'
                    }
                  />
                </TouchableOpacity>

                <Text style={styles.sellerHeading}>Best Seller</Text>
                <Text style={styles.itemHeading}>{product.title}</Text>
                <Text style={styles.price}>${product.variants[0].price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ImageBackground>
      </ScrollView>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '95%',
    marginTop: '5%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 10,
    color: '#777777',
    padding: 10,
    left: 10,
    borderBottomWidth: 1,
    borderColor: '#0000004A',
  },
  filterOption: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterOptionText: {
    fontFamily: 'Inter-Regular',
    fontWeight: '500',
    fontSize: 12,
    color: '#000000',
  },
  circle: {
    height: 44,
    width: 44,
    borderRadius: 30,
    backgroundColor: '#080063',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
  topHeading: {
    fontSize: 30,
    color: '#000',
    fontWeight: '700',
    color: '#131313',
  },
  cart: {
    backgroundColor: '#ECECEC',
  },
  bagIcon: {
    fontSize: 24,
    color: '#E67E22',
  },
  badge: {
    position: 'absolute',
    bottom: 25,
    left: 15,
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
    fontSize: 14,
    bottom: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    paddingLeft: '5%',
    width: '95%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#13131321',
    borderRadius: 10,
    margin: 15,
  },
  searchIcon: {
    marginRight: 10,
    color: '#131313',
  },
  input: {
    flex: 1,
    height: 50,
  },
  sortButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align items to the end of the container
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    gap: 10,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: '#131313',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: '3%',
    padding: 8,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#13131308',
    borderRadius: 42,
    justifyContent: 'space-between',
  },
  category: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    height: 40,
    width: '32%',
  },
  selectedCategory: {
    backgroundColor: '#080063',
  },
  categoryText: {
    fontSize: 15,
    color: '#080063',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: '15%',
    marginTop: '3%',
  },
  itemContainer: {
    width: itemWidth,
    backgroundColor: '#F6F8F7',
    borderRadius: 20,
    marginBottom: '5%',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: '5%',
  },
  cardImage: {
    height: 0.35 * width,
    width: itemWidth - 20,
    borderRadius: 12,
  },
  favCircle: {
    height: 32,
    width: 32,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: '52%',
    right: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerHeading: {
    color: '#131313',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    textAlign: 'left',
    marginVertical: '1%',
    marginTop: '8%',
    marginLeft: '5%',
  },
  itemHeading: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    color: '#000000',
    textAlign: 'left',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2%',
  },
  price: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    fontWeight: '500',
    color: '#1A2530',
    textAlign: 'left',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2%',
  },
});

export default Home;
