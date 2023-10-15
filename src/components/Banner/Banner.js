import { Container, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Carousel from "../Banner/Carousel.js";
const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner.jpeg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagLine: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

export default function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagLine}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}>
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}>
            Get information of all the Cryptocurrencies!
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}
