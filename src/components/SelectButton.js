import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  selectButton: (props) => ({
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: props.selected ? "gold" : "",
    color: props.selected ? "black" : "",
    fontWeight: props.selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "yellow",
      color: "black",
    },
    width: "22%",
  }),
}));

export const SelectButton = ({ children, selected, onClick }) => {
  const classes = useStyles({ selected });

  return (
    <span
      onClick={onClick}
      className={classes.selectButton}>
      {children}
    </span>
  );
};
