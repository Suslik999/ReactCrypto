import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { fetchCryptoData } from '../utils/api';

const HomeScreen = ({ navigation }) => {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchCryptoData('usd');
            setCryptos(data);
        };
        loadData();
    }, []);

    return (
        <View>
            <FlatList
                data={cryptos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
                        <Text>{item.name}: ${item.current_price}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default HomeScreen;
