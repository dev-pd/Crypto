/* eslint-disable no-unused-vars */
import { React, useState, useContext, useEffect, createContext } from "react";
import axios from "axios";
import { CoinList } from "./config/api";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
const Crypto = createContext();

export default function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      //console.log("The list of cryptos: ", data);
      setCoins(data);
    } catch (error) {
      //console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "INR") setSymbol("₹");
  }, [currency]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
      }}>
      {children}
    </Crypto.Provider>
  );
}

export const CryptoState = () => {
  return useContext(Crypto);
};
