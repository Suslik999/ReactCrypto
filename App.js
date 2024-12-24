import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import WalletScreen from './src/screens/WalletScreen';
import { WalletProvider } from './src/context/WalletContext';

const Stack = createStackNavigator();

export default function App() {
    return (
        <WalletProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                    <Stack.Screen name="Wallet" component={WalletScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </WalletProvider>
    );
}
