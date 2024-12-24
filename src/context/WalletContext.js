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
            return [...prevWallet, currency];
        });
    };

    return (
        <WalletContext.Provider value={{ wallet, addToWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
