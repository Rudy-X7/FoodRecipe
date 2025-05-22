import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ categories, foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <ArticleCard item={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Recipes</Text>
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      testID="articleDisplay"
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate("RecipeDetailScreen", {
          recipeId: item.idMeal,
          recipeName: item.strMeal,
          recipeDetails: item,
        })
      }
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.articleImage} />
      <Text style={styles.articleText}>{item.strMeal}</Text>
      <Text numberOfLines={2} style={styles.articleDescription}>
        {item.strInstructions || "No description available."}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600",
    color: "#52525B",
    marginBottom: hp(1.5),
  },
  cardContainer: {
    flex: 1,
    margin: wp(1),
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: wp(2),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  articleImage: {
    width: "100%",
    height: hp(15),
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  articleText: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#333",
    marginTop: hp(1),
  },
  articleDescription: {
    fontSize: hp(1.4),
    color: "#6B7280",
    marginTop: hp(0.5),
  },
  row: {
    justifyContent: "space-between",
    marginBottom: hp(2),
  },
});


