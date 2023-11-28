/* eslint-disable no-unused-vars */
import React from "react";
import { Drawer, Button, makeStyles, Avatar } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext";

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
});

const logOut = () => {};

export default function UserSideBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const { user } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
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
