/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React from "react";
import { Drawer, Button, makeStyles, Avatar } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import DeleteIcon from "@material-ui/icons/Delete";

export function numberWithCommas(x) {
  if (x === null || x === undefined) {
    console.warn("numberWithCommas was called with a non-number value:", x);
    return "";
  }

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
  picture: {
    height: 200,
    width: 200,
    cursor: "pointer",
    objectFit: "contain",
    backgroundColor: "#EEBC1D",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  logout: {
    // height: "8%",
    // width: "100%",
    backgroundColor: "#EEBC1D",
    marginTop: 20,
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 5,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black",
  },
});

export default function UserSideBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const { coins, user, setAlert, watchlist, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);

    setAlert({
      open: true,
      type: "success",
      message: "Logout Successful",
    });

    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );
      setAlert({
        open: true,
        message: `${coin.name} removed from watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.diplayName || user.email}
          />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.diplayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}>
                  {user.diplayName || user.email}
                </span>

                <div className={classes.watchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    watchlist
                  </span>

                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id)) {
                      return (
                        <div className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex" }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            {"  "}
                            <DeleteIcon
                              onClick={() => removeFromWatchlist(coin)}
                              style={{
                                cursor: "pointer",
                                fontSize: "16px",
                                marginLeft: "10px",
                              }}
                            />
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
                <Button
                  variant="contained"
                  className={classes.logout}
                  onClick={logOut}>
                  LogOut
                </Button>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
