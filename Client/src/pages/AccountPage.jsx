import React, {useEffect, useState} from 'react'
import {StyledHeader} from "../components/StyledHeader.jsx";
import axios from "axios";
import {useSelector} from "react-redux";

const formatAmount = (amount) => {
    // Function to format the amount with commas and two decimal places
    return Number(amount).toFixed(2).replace(/\d(?=(\d{3})+(?!\d))/g, ',');
};

export const AccountPage = () => {
    // const [emailAccount, setEmailAccount] = useState('');
    const [accountBalance, setAccountBalance] = useState({});
    const [balanceCurrencies, setBalanceCurrencies] = useState([]);
    const [accountTransactions, setAccountTransactions] = useState([]);

    const SERVER_ADDRESS = 'http://localhost:3000/';
    const authToken = useSelector((state) => state.token);

    useEffect(() => {
        const fetchData = () => {
            const requestedData = ['balance', 'transactions'];
            const url = `${SERVER_ADDRESS}accountData`;

            return axios.get(url, {
                params: { requestedData: requestedData.join(',') },
                headers: { Authorization: `Bearer ${authToken}` },
            });
        };

        fetchData()
            .then((response) => {
                // setAccountBalance(response.data.balance);
                setAccountTransactions(response.data.transactions);
                console.log("response.data.balance:  ", response.data.balance);
                const balance = response.data.balance;

                const currencies = Object.keys(balance);
                const updatedBalanceCurrencies = [...balanceCurrencies];
                console.log("currencies:  ", currencies);
                currencies.forEach((currency) => {
                    updatedBalanceCurrencies.push({ currency, amount: formatAmount(balance[currency]) });
                });
                setBalanceCurrencies(updatedBalanceCurrencies);

            })
            .catch((error) => {
                console.error('Error fetching account data:', error);
            });
    }, []);


    return (
        <div>
            <StyledHeader />

            {balanceCurrencies.map((currency) => (
                <div key={currency.currency}>
                    {currency.amount}:  {currency.currency}
                </div>
            ))}

            <div>
                {/*{balanceCurrency)}*/}
            </div>
        </div>
    )
}
