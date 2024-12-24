import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const WalletScreen = ({ route }) => {
    const [wallet, setWallet] = useState(route.params?.currency ? [route.params.currency] : []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Wallet</Text>
            {wallet.length === 0 ? (
                <Text style={styles.empty}>No currencies purchased yet.</Text>
            ) : (
                <FlatList
                    data={wallet}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.name}>{item.name} ({item.symbol})</Text>
                            <Text>Amount: {item.amount}</Text>
                            <Text>Price per unit: ${item.price.toFixed(2)}</Text>
                            <Text>Total: ${item.total.toFixed(2)}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    empty: {
        fontSize: 16,
        color: '#777',
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WalletScreen;
