import React, {useEffect, useState} from 'react'
import {StyledHeader} from "../components/StyledHeader.jsx";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import logOutIcon from '../assets/Icon Profile Single.svg';
import {logout} from "../redux/Store.jsx";

const formatAmount = (amount) => {
    return Number(amount).toFixed(2).replace(/\d(?=(\d{3})+(?!\d))/g, ',');
};

export const AccountPage = () => {
    const [balanceCurrencies, setBalanceCurrencies] = useState([]);
    const [accountTransactions, setAccountTransactions] = useState([]);

    const SERVER_ADDRESS = 'http://localhost:3000/';
    const authToken = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const fetchData = async () => {
        const requestedData = ['balance', 'transactions'];
        const url = `${SERVER_ADDRESS}accountData`;
            const response = await axios.get(url, {
                params: {requestedData: requestedData.join(',')},
                headers: {Authorization: `Bearer ${authToken}`},
            });

            const body = response.data;
            setAccountTransactions(response.data.transactions);
            console.log("setAccountTransactions:  ", response.data.transactions);
            const balance = body.balance;

            const currencies = Object.keys(balance);
            const updatedBalanceCurrencies = [];
            console.log("currencies:  ", currencies);
            currencies.forEach((currency) => {
                updatedBalanceCurrencies.push({currency, amount: formatAmount(balance[currency])});
            });
            setBalanceCurrencies(updatedBalanceCurrencies);
            console.log("balanceCurrencies: ", balanceCurrencies);
    }

    useEffect(() => {
            fetchData().then((response) => {
            });
    }, []);

    const handelLogout = () => {
        dispatch(logout());
    }

    return (
        <div className='p-0 m-0'>
            <div
                className='
                container
                min-vh-100 min-vw-100
                p-0 m-0'>
                <div
                    className='
                    d-flex
                    justify-content-start align-content-center
                    min-vh-100'
                >
                    <div className='sideGradient col-4 '>
                        <StyledHeader />
                        <div
                            className='ms-5 fs-5'
                            style={{
                                marginTop: '30%'
                            }}
                        >
                            Available Balance:
                        </div>
                        {balanceCurrencies.map((currency) => (
                            <div className='fs-2 fw-bold mx-5 py-2' key={currency.currency}>
                                {currency.amount}:  {currency.currency}
                            </div>
                        ))}
                    </div>
                    <div className='col'>
                        <div
                            className='d-flex
                            flex-column
                            justify-content-start align-content-start'>
                            <button
                                className='align-self-end btn btn-transparent rounded-0 fs-4 text-black'
                                style={{
                                    marginTop: '3%',
                                    marginRight: '5%',
                                }}
                                type='button'
                                onClick={handelLogout}
                            >
                                <img src={logOutIcon} alt='Log Out Icon' className='px-2'/>
                                Log Out
                            </button>

                            <div
                                className='pt-5 ps-5 fs-4 fw-bolder'
                                style={{
                                    marginTop: '15%',
                                }}
                            >
                                Recent Transactions:
                            </div>

                            {accountTransactions.length === 0 && (
                                <div className='fs-2 fw-bold py-3 ps-5'>
                                    No transactions yet !
                                </div>
                            )}
                            {accountTransactions.map((transaction) => (
                                <div className='d-flex fs-2 fw-bold py-2 ps-5' key={transaction}>
                                    <div>
                                        {transaction.email}
                                    </div>
                                    <div
                                        className='ms-auto'
                                        style={{
                                            marginRight: '20%'
                                        }}
                                    >
                                        {transaction.sign} {formatAmount(transaction.amount)} {transaction.currency}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
