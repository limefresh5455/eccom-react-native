import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Home');
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('Home')}>
        <Ionicons
          name="home-outline"
          size={24}
          color={selectedTab === 'home' ? '#5B9EE1' : '#000'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('Favorite')}>
        <Ionicons
          name="heart-outline"
          size={24}
          color={selectedTab === 'favourite' ? '#5B9EE1' : '#000'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        // onPress={() => navigation.navigate('notifications')}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={selectedTab === 'notifications' ? '#5B9EE1' : '#000'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('profile')}>
        <Ionicons
          name="person-outline"
          size={24}
          color={selectedTab === 'profile' ? '#5B9EE1' : '#000'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: '3%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    alignItems: 'center',
  },
});

export default Navbar;
