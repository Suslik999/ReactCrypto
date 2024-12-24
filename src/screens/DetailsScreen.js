import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { fetchCryptoDetails } from '../utils/api';
import { useWallet } from '../context/WalletContext';

const DetailsScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [details, setDetails] = useState(null);
    const [amount, setAmount] = useState('');
    const { addToWallet } = useWallet();

    useEffect(() => {
        const loadDetails = async () => {
            const data = await fetchCryptoDetails(id);
            setDetails(data);
        };
        loadDetails();
    }, [id]);

    if (!details) return <Text>Loading...</Text>;

    const handleBuy = () => {
        const totalPrice = (amount * details.market_data.current_price.usd).toFixed(2);
        if (!amount || isNaN(amount) || amount <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid amount.');
            return;
        }
        addToWallet({
            id: details.id,
            name: details.name,
            symbol: details.symbol.toUpperCase(),
            amount: parseFloat(amount),
            price: parseFloat(details.market_data.current_price.usd),
            total: parseFloat(totalPrice),
        });
        navigation.navigate('Wallet');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{details.name} ({details.symbol.toUpperCase()})</Text>
            <Text style={styles.price}>Current Price: ${details.market_data.current_price.usd.toFixed(2)}</Text>
            <Text>Market Cap: ${details.market_data.market_cap.usd.toLocaleString()}</Text>
            <Text>24h High: ${details.market_data.high_24h.usd.toFixed(2)}</Text>
            <Text>24h Low: ${details.market_data.low_24h.usd.toFixed(2)}</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <Button title="Buy" onPress={handleBuy} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        color: '#333',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
});

export default DetailsScreen;
