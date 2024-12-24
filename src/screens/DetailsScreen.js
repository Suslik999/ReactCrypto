import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchCryptoDetails } from '../utils/api';

const DetailsScreen = ({ route }) => {
    const { id } = route.params;
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const loadDetails = async () => {
            const data = await fetchCryptoDetails(id);
            setDetails(data);
        };
        loadDetails();
    }, [id]);

    if (!details) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{details.name} ({details.symbol.toUpperCase()})</Text>
            <Text style={styles.price}>Current Price: ${details.market_data.current_price.usd.toFixed(2)}</Text>
            <Text>Market Cap: ${details.market_data.market_cap.usd.toLocaleString()}</Text>
            <Text>24h High: ${details.market_data.high_24h.usd.toFixed(2)}</Text>
            <Text>24h Low: ${details.market_data.low_24h.usd.toFixed(2)}</Text>
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
});

export default DetailsScreen;
