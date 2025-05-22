import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function CustomRecipesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const { recipe } = route.params || {};

  const favoriteRecipes = useSelector(
    (state) => state.favorites.favoriterecipes
  );

  const isFavorite = recipe && favoriteRecipes.some(
    (fav) => fav.idCategory === recipe.idCategory
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.recipeTitle}>No Recipe Details Available</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      testID="scrollContent"
    >
      {/* Image Container */}
      <View style={styles.imageContainer} testID="imageContainer">
        {recipe.image && (
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        )}
      </View>

      {/* Top Buttons */}
      <View style={styles.topButtonsContainer} testID="topButtonsContainer">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.buttonText}>GoBack</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteButton}
        >
          <Text style={styles.buttonText}>{isFavorite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Content Container */}
      <View style={styles.contentContainer} testID="contentContainer">
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Content</Text>
          <Text style={styles.contentText}>{recipe.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  recipeImage: {
    width: wp(98),
    height: hp(50),
    borderRadius: 35,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginTop: 4,
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: hp(2),
  },
  sectionContainer: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: hp(1),
  },
  contentText: {
    fontSize: hp(1.6),
    color: "#4B5563",
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    top: hp(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
    elevation: 3,
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
    elevation: 3,
  },
  buttonText: {
    fontSize: hp(2.2),
    color: "#000",
  },
});

  
