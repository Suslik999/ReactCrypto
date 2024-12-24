import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchCryptoData } from '../utils/api';

const HomeScreen = ({ navigation }) => {
    const [cryptos, setCryptos] = useState([]);
    const [filteredCryptos, setFilteredCryptos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchCryptoData('usd');
            setCryptos(data);
            setFilteredCryptos(data);
        };
        loadData();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = cryptos.filter((crypto) =>
            crypto.name.toLowerCase().includes(query.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCryptos(filtered);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search Cryptocurrency"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredCryptos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.cryptoItem}
                        onPress={() => navigation.navigate('Details', { id: item.id })}
                    >
                        <Text style={styles.cryptoName}>{item.name} ({item.symbol.toUpperCase()})</Text>
                        <Text style={styles.cryptoPrice}>${item.current_price.toFixed(2)}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    cryptoItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cryptoName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cryptoPrice: {
        fontSize: 14,
        color: '#555',
    },
});

export default HomeScreen;
