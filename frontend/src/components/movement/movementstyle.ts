import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    padding: "30px 50px",
    gap: "1rem",
    fontSize: "12px",
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "30px",
    marginBottom: "10px",
  },
  title: {
    fontWeight: "600",
    marginBottom: "8px",
    padding: "2px 0px 1px 5px",
  },
  image: {
    height: "58px",
    width: "190px",
    alignSelf: "flex-end",
  },
  section: {
    borderWidth: "2px",
    borderColor: "black",
    borderStyle: "solid",
    borderBottom: "none",
    height: "70px",
  },
  bottom: {
    height: "60px",
    paddingTop: "5px",
  },
  largesection: {
    height: "270px",
    border: "2px solid black",
  },
  textBold: {
    fontWeight: "600",
  },
  text: {
    padding: "2px 0px 1px 5px",
    textTransform: "capitalize",
  },
  dataText: {
    fontSize: "14px",
    fontWeight: "600",
    margin: "10px 0px 0px 12px",
    textTransform: "uppercase",
  },
  to: {
    fontSize: "20px",
    padding: "2px 0px 1px 5px",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "60px",
    gap: "3px",
  },
  aside: {
    width: "50%",
    borderRight: "2px",
    height: "70px",
  },
  center: {
    textAlign: "center",
    fontSize: "10px",
    marginTop: "30px",
  },
});
