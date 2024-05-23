import React from 'react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './components/Register';
import Login from './components/Login';
import Introduction from './components/Introduction';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Details from './components/Details';
import Onboard from './components/Onboard';
import Cart from './components/Cart';
import Profile from './components/Profile';
import SideMenu from './components/SideMenu';
import Favorite from './components/Favorite';
import Orders from './components/Orders';
import ForgotPassword from './components/ForgotPassword';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="introduction" component={Introduction} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="onboard" component={Onboard} />
        <Stack.Screen name="navbar" component={Navbar} />
        <Stack.Screen name="details" component={Details} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="cart" component={Cart} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="sidemenu" component={SideMenu} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="orders" component={Orders} />
        <Stack.Screen name="forgotpassword" component={ForgotPassword} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default App;
