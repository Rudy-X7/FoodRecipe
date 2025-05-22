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

  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Recipes</Text>
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      testID="articleDisplay"
      onPress={() =>
        navigation.navigate("RecipeDetailScreen", {
          recipeId: item.idMeal,
          recipeName: item.strMeal,
        })
      }
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.articleImage} />
      <Text style={styles.articleText}>{item.strMeal}</Text>
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
    marginBottom: hp(2),
  },
  articleImage: {
    width: "100%",
    height: hp(25),
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  articleText: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#52525B",
    marginTop: hp(1),
  },
});

