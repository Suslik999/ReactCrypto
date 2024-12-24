import React, { createContext, useState, useContext } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = useState([]);

    const addToWallet = (currency) => {
        setWallet((prevWallet) => {
            const existingCurrency = prevWallet.find((item) => item.id === currency.id);
            if (existingCurrency) {
                return prevWallet.map((item) =>
                    item.id === currency.id
                        ? {
                              ...item,
                              amount: item.amount + currency.amount,
                              total: item.total + currency.total,
                          }
                        : item
                );
            }
            return [...prevWallet, { ...currency }];
        });
    };

    const sellFromWallet = (id, amountToSell) => {
        setWallet((prevWallet) =>
            prevWallet
                .map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              amount: item.amount - amountToSell,
                              total: item.total - amountToSell * item.price,
                          }
                        : item
                )
                .filter((item) => item.amount > 0)
        );
    };

    return (
        <WalletContext.Provider value={{ wallet, addToWallet, sellFromWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
