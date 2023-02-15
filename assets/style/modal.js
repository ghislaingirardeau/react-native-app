export default {
  colorPrimary: "#073B4C", // blue dark
  colorSecond: "#FFD166", // yellow
  colorThird: "#118AB2", // blue claire
  colorFourth: "#EF476F", // rouge
  colorFifth: "#06D6A0", // vert
  modalContainer: {
    backgroundColor: "#118AB2",
    borderColor: "#FFD166",
    borderWidth: 2,
    zIndex: 10,
    elevation: 3,
    position: "absolute",
    width: "100%",
    borderRadius: 5,
    top: 70,
  },
  modalHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: "#FFD166",
    padding: 5,
  },
  modalTitle: {
    color: "#FFD166",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Handlee_400Regular",
    padding: 10,
  },
  modalContent: {},
  modalInput: {
    height: 45,
    padding: 10,
    color: "#06D6A0",
    borderWidth: 2,
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 5,
    fontFamily: "Handlee_400Regular",
    borderColor: "#06D6A0",
    margin: 10,
  },
};
