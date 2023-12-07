/* eslint-disable no-unused-vars */
import { React, useState, useContext, useEffect, createContext } from "react";
import axios from "axios";
import { CoinList } from "./config/api";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
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
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin?.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log("No items in watchlist");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
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
        watchlist,
      }}>
      {children}
    </Crypto.Provider>
  );
}

export const CryptoState = () => {
  return useContext(Crypto);
};
