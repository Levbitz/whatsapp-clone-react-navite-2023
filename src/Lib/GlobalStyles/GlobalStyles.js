import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");





export const globalStyles = StyleSheet.create({
  mainTitle: {
    color: "#424242",
    fontWeight: "600",
    marginVertical: 10,
    marginLeft: 10,
  },
  locationText: {
    fontSize: 14,
    color: "#424242",
    fontWeight: "500",
    marginLeft: 5,
  },
  screenBg: {
    backgroundColor: "#f1f5f8",
  },

  modalStyles: {
    backgroundColor: "#f1f5f8",
    flex: 1,
    paddingTop: 20,

    borderWidth: 0.3,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,

    height: height,
    paddingHorizontal: 15,
  },
  modalTopContent: {
    justifyContent: "space-between",

    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  modalCloseBtn: {
    backgroundColor: "#094c59",
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 10,
  },
  modalClearFilterBtn: {
    backgroundColor: "#b71c1c",
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 10,
  },
  modalTopText: {
    color: "#fff",
  },
  levbitzSafeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 28 : 0,
    
  },

  pickerStyles: {
    backgroundColor: "red",
  },
  levbitzSuperTitle: {
    fontSize: 15,
    color: "gray",
    fontWeight: "500",
    marginHorizontal: 5,
    marginVertical: 10,
  },
  //pordut outline
  levbitzProductOutlineImageWrap: {
    marginBottom: 10,
    width: width * 0.44,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 15,
  },
  levbitzProductOutlineTitle: {
    fontSize: 12,
    marginVertical: 5,
  },
  levbitzProductOutlineTitleNotAvailable: {
    color: "coral",
    fontSize: 12,
    marginVertical: 5,
  },

  //pordut outline

  //mega category
  levbitzMegaCategoryWrapper: {
    paddingHorizontal: 5,
  },
  levbitzMegaCategoryProductListing: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  levbitzMegaCategorySubCatListing: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
  },
  //mega category

  //individual product
  imageThumbnail: {
    width: "100%",
    height: height / 6,
    resizeMode: "contain",
  },
  //input
  myInput: {
    fontSize: 20,
    color: "gray",
    fontWeight: "300",
    marginBottom: 20,
    borderColor: "#fff",
    
    borderWidth: 0.5,
    paddingLeft: 5,
    borderRadius: 5,
    height: 50,
    borderColor: "gray",

    fontSize: 15,
    fontWeight: "500",
    borderWidth: 1,
   
  },
  //input

  //cateory  main Image
  levbitzCategoryMainImage: {
    width: "100%",
    aspectRatio: 9 / 3,
    borderRadius: 20,
  },
  //cateory  main Image


  passwordWrap:{
    flexDirection:"row",
    alignItems:"center",
    fontSize: 20,
    color: "gray",
    fontWeight: "300",
    marginBottom: 20,
    borderColor: "#fff",
    borderWidth: 0.5,
   
    borderRadius: 5,
    height: 50,
    borderColor: "gray",

    fontSize: 15,
    fontWeight: "500",
    borderWidth: 1, 
  },
  passwordInput:{
    fontSize: 20,
    color: "gray",
    fontWeight: "300",
    marginBottom: 20,
   marginTop:15,
    borderWidth: 0.5,
    paddingLeft: 5,
    borderRadius: 5,
    height: 50,
    borderColor: "transparent",
    width:width*.75,

    fontSize: 15,
    fontWeight: "500",
    borderWidth: 1, 
  },
  passwordIcon:{
    fontSize: 20,
    color: "#334155",
    fontWeight: "300",
    marginBottom: 20,
    borderColor: "#fff",
    borderWidth: 0.5,
    paddingLeft: 5,
    borderRadius: 5,
    height: 50,
    borderColor: "gray",

    fontSize: 15,
    fontWeight: "500",
    borderWidth: 1, 
  }
});
