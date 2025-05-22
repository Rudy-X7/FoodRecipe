import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { toggleFavorite } from "../redux/favoritesSlice"; // Redux action
import { Ionicons } from "@expo/vector-icons"; // Icons

export default function RecipeDetailScreen(props) {
  const recipe = props.route.params; // recipe passed from previous screen

  const dispatch = useDispatch();
  const favoriterecipes = useSelector((state) => state.favorites.favoriterecipes);
  const isFavourite = favoriterecipes?.some(
    (favrecipe) => favrecipe.idFood === recipe.idFood
  ); // Check by idrecipe

  const navigation = useNavigation();

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe)); // Dispatch the recipe to favorites
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* recipe Image */}
      <View style={styles.imageContainer} testID="imageContainer">
        <Image
          source={{ uri: recipe.recipeImage || recipe.strMealThumb }}
          style={styles.recipeImage}
          resizeMode="cover"
        />
      </View>

      {/* Back Button and Favorite Button */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[styles.favoriteButton]}
        >
          <Text style={[styles.favoriteButtonText]}>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* recipe Description */}
      <View style={styles.contentContainer}>
        {/* Title and Category */}
        <View
          style={styles.recipeDetailsContainer}
          testID="recipeDetailsContainer"
        >
          <Text style={styles.recipeTitle} testID="recipeTitle">
            {recipe.strMeal || recipe.title || "No Title"}
          </Text>
          <Text style={styles.recipeCategory} testID="recipeCategory">
            {recipe.strCategory || "No Category"}
          </Text>
        </View>

        {/* Misc info icons */}
        <View style={styles.miscContainer} testID="miscContainer">
          <View style={styles.miscItem}>
            <Ionicons name="time-outline" size={hp(3.5)} color="#F59E0B" />
            <Text style={styles.miscText}>{recipe.cookTime || "30 mins"}</Text>
          </View>
          <View style={styles.miscItem}>
            <Ionicons name="restaurant-outline" size={hp(3.5)} color="#F59E0B" />
            <Text style={styles.miscText}>{recipe.servings || "2 servings"}</Text>
          </View>
          <View style={styles.miscItem}>
            <Ionicons name="flame-outline" size={hp(3.5)} color="#F59E0B" />
            <Text style={styles.miscText}>{recipe.calories || "250 cal"}</Text>
          </View>
          <View style={styles.miscItem}>
            <Ionicons name="nutrition-outline" size={hp(3.5)} color="#F59E0B" />
            <Text style={styles.miscText}>{recipe.type || "Non-Veg"}</Text>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.sectionContainer} testID="sectionContainer">
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View testID="ingredientsList" style={styles.ingredientsList}>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.ingredientBullet} />
                  <Text style={styles.ingredientText}>
                    {ingredient.name} - {ingredient.measure}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.descriptionText}>No ingredients available.</Text>
            )}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>
            {recipe.recipeInstructions || recipe.strInstructions || "No instructions provided."}
          </Text>
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
    marginBottom: 20,
  },
  recipeImage: {
    width: wp(98),
    height: hp(45),
    borderRadius: 20,
    marginTop: 4,
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginLeft: wp(5),
  },
  backButtonText: {
    fontSize: hp(2),
    color: "#333",
    fontWeight: "bold",
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 20,
    marginRight: wp(5),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "red",
  },
  favoriteButtonText: {
    fontSize: hp(2),
    color: "red",
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  recipeDetailsContainer: {
    marginBottom: hp(2),
  },
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563",
  },
  recipeCategory: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#9CA3AF",
  },
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: wp(4),
  },
  miscItem: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
  },
  miscText: {
    fontSize: hp(2),
    fontWeight: "600",
  },
  sectionContainer: {
    marginHorizontal: wp(5),
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: hp(2.8),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  ingredientsList: {
    marginLeft: wp(4),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
    padding: 10,
    backgroundColor: "#FFF9E1",
    borderRadius: 8,
    elevation: 2,
  },
  ingredientBullet: {
    backgroundColor: "#FFD700",
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(2),
  },
  ingredientText: {
    fontSize: hp(1.9),
    color: "#333",
  },
  instructionsText: {
    fontSize: hp(2),
    color: "#444",
    lineHeight: hp(3),
    textAlign: "justify",
  },
  descriptionText: {
    fontSize: hp(1.8),
    color: "#4B5563",
    textAlign: "justify",
    lineHeight: hp(2.5),
  },
});

