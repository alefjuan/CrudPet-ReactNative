import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center",
    padding: 18
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4
  },
  input: {
    height: 32,
    borderWidth: 1,
    padding: 4,
    borderColor: "#006091",
    borderRadius: 12,
    width: "100%",
    marginTop: 12,
  },
  button: {
    height: 32,
    padding: 4,
    backgroundColor: "#006091",
    borderRadius: 7,
    width: "100%"
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default globalStyles;
