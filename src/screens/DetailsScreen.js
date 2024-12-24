import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
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
        <View>
            <Text>{details.name}</Text>
            <Text>Current Price: ${details.market_data.current_price.usd}</Text>
        </View>
    );
};

export default DetailsScreen;
