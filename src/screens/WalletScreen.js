import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useWallet } from '../context/WalletContext';
import { fetchCryptoDetails } from '../utils/api';

const WalletScreen = () => {
    const { wallet } = useWallet();
    const [updatedWallet, setUpdatedWallet] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        const updateWalletBalance = async () => {
            let balance = 0;
            const updated = await Promise.all(
                wallet.map(async (currency) => {
                    const data = await fetchCryptoDetails(currency.id);
                    const currentPrice = data.market_data.current_price.usd;
                    const profitOrLoss =
                        currency.amount * currentPrice - currency.total;
                    balance += currency.amount * currentPrice;

                    return {
                        ...currency,
                        currentPrice,
                        profitOrLoss,
                    };
                })
            );

            setUpdatedWallet(updated);
            setTotalBalance(balance);
        };

        updateWalletBalance();
    }, [wallet]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Wallet</Text>
            <Text style={styles.totalBalance}>
                Total Balance: ${totalBalance.toFixed(2)}
            </Text>
            {updatedWallet.length === 0 ? (
                <Text style={styles.empty}>No currencies purchased yet.</Text>
            ) : (
                <FlatList
                    data={updatedWallet}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.name}>
                                {item.name} ({item.symbol})
                            </Text>
                            <Text>Amount: {item.amount}</Text>
                            <Text>Price per unit: ${item.price.toFixed(2)}</Text>
                            <Text>Current Price: ${item.currentPrice.toFixed(2)}</Text>
                            <Text>Total Paid: ${item.total.toFixed(2)}</Text>
                            <Text
                                style={
                                    item.profitOrLoss >= 0
                                        ? styles.profit
                                        : styles.loss
                                }
                            >
                                {item.profitOrLoss >= 0 ? '+' : '-'}$
                                {Math.abs(item.profitOrLoss).toFixed(2)}
                            </Text>
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
    totalBalance: {
        fontSize: 18,
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
    profit: {
        color: 'green',
        fontWeight: 'bold',
    },
    loss: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default WalletScreen;
