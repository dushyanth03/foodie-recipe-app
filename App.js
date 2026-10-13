
import React, { useState } from "react";
import {
  View, Text, ScrollView, Image, TextInput, TouchableOpacity,
  StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const CATEGORIES = [
  "All", "Breakfast", "Lunch", "Dinner", "Desserts",
  "Snacks", "Drinks", "Vegetarian", "Vegan", "Italian",
  "Asian", "My Food"
];

const INITIAL_RECIPES = [
  { id: "1", name: "Avocado Toast", category: "Breakfast", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800", time: "10 min", servings: "2", calories: "250", difficulty: "Easy", ingredients: "2 slices bread\n1 ripe avocado\nSalt and pepper\n1 tsp lemon juice", instructions: "1. Toast the bread.\n2. Mash the avocado with lemon juice.\n3. Spread on toast and season.", favorite: false, mine: false },
  { id: "2", name: "Pancakes", category: "Breakfast", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800", time: "20 min", servings: "4", calories: "350", difficulty: "Easy", ingredients: "1 cup flour\n1 egg\n3/4 cup milk\n1 tsp baking powder\n1 tbsp sugar", instructions: "1. Mix the dry ingredients.\n2. Add egg and milk.\n3. Cook small portions on a hot pan until golden.", favorite: false, mine: false },
  { id: "3", name: "Fresh Garden Salad", category: "Lunch", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", time: "15 min", servings: "2", calories: "180", difficulty: "Easy", ingredients: "Lettuce\nTomatoes\nCucumber\nOlive oil\nLemon juice", instructions: "1. Wash and chop the vegetables.\n2. Combine in a bowl.\n3. Add olive oil and lemon dressing.", favorite: false, mine: false },
  { id: "4", name: "Margherita Pizza", category: "Italian", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800", time: "35 min", servings: "2", calories: "420", difficulty: "Medium", ingredients: "Pizza dough\nTomato sauce\nMozzarella\nFresh basil\nOlive oil", instructions: "1. Roll out the dough.\n2. Add sauce and cheese.\n3. Bake until crisp and top with basil.", favorite: false, mine: false },
  { id: "5", name: "Creamy Pasta", category: "Dinner", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800", time: "25 min", servings: "2", calories: "480", difficulty: "Medium", ingredients: "200 g pasta\n1 cup cream\nGarlic\nParmesan\nBlack pepper", instructions: "1. Cook the pasta.\n2. Sauté garlic and add cream.\n3. Toss pasta with sauce and Parmesan.", favorite: false, mine: false },
  { id: "6", name: "Chocolate Brownies", category: "Desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800", time: "40 min", servings: "8", calories: "300", difficulty: "Medium", ingredients: "Dark chocolate\nButter\nSugar\n2 eggs\nFlour", instructions: "1. Melt chocolate and butter.\n2. Whisk in sugar and eggs.\n3. Fold in flour and bake until set.", favorite: false, mine: false },
  { id: "7", name: "Fruit Smoothie", category: "Drinks", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800", time: "5 min", servings: "1", calories: "190", difficulty: "Easy", ingredients: "1 banana\n1 cup berries\n1 cup milk\nIce", instructions: "1. Add all ingredients to a blender.\n2. Blend until smooth.\n3. Serve chilled.", favorite: false, mine: false },
  { id: "8", name: "Vegetable Stir-Fry", category: "Asian", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800", time: "20 min", servings: "2", calories: "220", difficulty: "Easy", ingredients: "Broccoli\nBell pepper\nCarrots\nSoy sauce\nGarlic", instructions: "1. Chop the vegetables.\n2. Stir-fry garlic and vegetables in a hot pan.\n3. Add soy sauce and serve.", favorite: false, mine: false },
  { id: "9", name: "Veggie Sandwich", category: "Vegetarian", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800", time: "10 min", servings: "1", calories: "280", difficulty: "Easy", ingredients: "Bread\nTomato\nCucumber\nLettuce\nCheese", instructions: "1. Slice the vegetables.\n2. Layer them on bread with cheese.\n3. Close, slice and serve.", favorite: false, mine: false },
  { id: "10", name: "Hummus Bowl", category: "Vegan", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800", time: "15 min", servings: "2", calories: "260", difficulty: "Easy", ingredients: "Chickpeas\nTahini\nLemon juice\nGarlic\nOlive oil", instructions: "1. Blend chickpeas, tahini, lemon and garlic.\n2. Add water until creamy.\n3. Drizzle with olive oil and serve.", favorite: false, mine: false },
  { id: "11", name: "Roasted Potato Bites", category: "Snacks", image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800", time: "30 min", servings: "3", calories: "210", difficulty: "Easy", ingredients: "Potatoes\nOlive oil\nPaprika\nSalt\nRosemary", instructions: "1. Cut potatoes into small pieces.\n2. Toss with oil and seasonings.\n3. Roast until crispy.", favorite: false, mine: false }
];

export default function App() {
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [page, setPage] = useState("Home");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [formCategory, setFormCategory] = useState("Dinner");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [time, setTime] = useState("30 min");
  const [servings, setServings] = useState("2");
  const [calories, setCalories] = useState("300");
  const [difficulty, setDifficulty] = useState("Easy");

  const goBack = () => {
    if (page === "Details") {
      setPage(selected?.mine ? "My Recipes" : "Home");
      setSelected(null);
    } else if (page === "Add Recipe") {
      setPage(editingId ? "My Recipes" : "Home");
    } else {
      setPage("Home");
    }
  };

  const openRecipe = (recipe) => {
    setSelected(recipe);
    setPage("Details");
  };

  const toggleFavorite = (id) => {
    setRecipes((old) =>
      old.map((r) => r.id === id ? { ...r, favorite: !r.favorite } : r)
    );
    if (selected?.id === id) {
      setSelected((old) => ({ ...old, favorite: !old.favorite }));
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Allow photo library access to choose a recipe image.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const startNewRecipe = () => {
    setEditingId(null);
    setName("");
    setFormCategory("Dinner");
    setImage("");
    setIngredients("");
    setInstructions("");
    setTime("30 min");
    setServings("2");
    setCalories("300");
    setDifficulty("Easy");
    setPage("Add Recipe");
  };

  const startEdit = (recipe) => {
    setEditingId(recipe.id);
    setName(recipe.name);
    setFormCategory(recipe.category);
    setImage(recipe.image);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setTime(recipe.time);
    setServings(recipe.servings);
    setCalories(recipe.calories);
    setDifficulty(recipe.difficulty);
    setPage("Add Recipe");
  };

  const saveRecipe = () => {
    if (!name.trim() || !ingredients.trim() || !instructions.trim()) {
      Alert.alert("Missing details", "Enter the recipe name, ingredients and instructions.");
      return;
    }
    const recipe = {
      id: editingId || String(Date.now()),
      name: name.trim(),
      category: formCategory,
      image: image.trim() || "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
      ingredients,
      instructions,
      time: time || "Not specified",
      servings: servings || "Not specified",
      calories: calories || "Not specified",
      difficulty: difficulty || "Easy",
      favorite: editingId ? (recipes.find(r => r.id === editingId)?.favorite || false) : false,
      mine: true
    };
    if (editingId) {
      setRecipes((old) => old.map((r) => r.id === editingId ? recipe : r));
    } else {
      setRecipes((old) => [recipe, ...old]);
    }
    setSelected(recipe);
    setEditingId(null);
    setPage("My Recipes");
    Alert.alert("Saved!", "Your recipe is now in My Recipes.");
  };

  const deleteRecipe = (id) => {
    Alert.alert("Delete recipe?", "This recipe will be removed from My Food.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => {
        setRecipes((old) => old.filter((r) => r.id !== id));
        if (selected?.id === id) setSelected(null);
      }}
    ]);
  };

  const filtered = recipes.filter((r) => {
    if (page === "Favorites") return r.favorite;
    if (page === "My Recipes") return r.mine;
    if (category !== "All" && category !== "My Food") return r.category === category;
    return true;
  });

  const recipeCard = (recipe) => (
    <TouchableOpacity key={recipe.id} style={styles.card} onPress={() => openRecipe(recipe)}>
      <View>
        <Image source={{ uri: recipe.image }} style={styles.cardImage} />
        <TouchableOpacity style={styles.heart} onPress={() => toggleFavorite(recipe.id)}>
          <Text style={styles.heartText}>{recipe.favorite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{recipe.name}</Text>
        <Text style={styles.muted}>{recipe.time} · {recipe.difficulty}</Text>
      </View>
      {page === "My Recipes" && (
        <View style={styles.row}>
          <TouchableOpacity style={styles.smallButton} onPress={() => startEdit(recipe)}>
            <Text style={styles.smallButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.smallButton, styles.delete]} onPress={() => deleteRecipe(recipe.id)}>
            <Text style={styles.smallButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderForm = () => (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Text style={styles.heading}>{editingId ? "Edit Recipe" : "Add New Recipe"}</Text>
      <Text style={styles.label}>Recipe name *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Homemade pasta" />
      <Text style={styles.label}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.filter(c => !["All", "My Food"].includes(c)).map(c => (
          <TouchableOpacity key={c} style={[styles.chip, formCategory === c && styles.activeChip]} onPress={() => setFormCategory(c)}>
            <Text style={[styles.chipText, formCategory === c && styles.activeChipText]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.label}>Recipe image</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image from Device</Text>
      </TouchableOpacity>
      <Text style={styles.muted}>Or paste an image URL below</Text>
      <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="https://example.com/food.jpg" autoCapitalize="none" />
      {!!image && <Image source={{ uri: image }} style={styles.previewImage} />}
      <Text style={styles.label}>Ingredients list *</Text>
      <TextInput style={[styles.input, styles.multiline]} value={ingredients} onChangeText={setIngredients} placeholder={"One ingredient per line"} multiline />
      <Text style={styles.label}>Step-by-step instructions *</Text>
      <TextInput style={[styles.input, styles.multiline]} value={instructions} onChangeText={setInstructions} placeholder={"1. First step\n2. Next step"} multiline />
      <Text style={styles.label}>Preparation time</Text>
      <TextInput style={styles.input} value={time} onChangeText={setTime} placeholder="30 min" />
      <Text style={styles.label}>Number of servings</Text>
      <TextInput style={styles.input} value={servings} onChangeText={setServings} placeholder="2" />
      <Text style={styles.label}>Calories</Text>
      <TextInput style={styles.input} value={calories} onChangeText={setCalories} placeholder="300" keyboardType="numeric" />
      <Text style={styles.label}>Difficulty</Text>
      <View style={styles.row}>
        {["Easy", "Medium", "Hard"].map(d => (
          <TouchableOpacity key={d} style={[styles.chip, difficulty === d && styles.activeChip]} onPress={() => setDifficulty(d)}>
            <Text style={[styles.chipText, difficulty === d && styles.activeChipText]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={saveRecipe}>
        <Text style={styles.buttonText}>Save Recipe</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );

  const renderDetails = () => selected && (
    <View>
      <Image source={{ uri: selected.image }} style={styles.heroImage} />
      <View style={styles.detailHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>{selected.name}</Text>
          <Text style={styles.muted}>{selected.category}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(selected.id)}>
          <Text style={styles.bigHeart}>{selected.favorite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.stats}>
        <Text style={styles.stat}>⏱ {selected.time}</Text>
        <Text style={styles.stat}>🍽 {selected.servings} servings</Text>
        <Text style={styles.stat}>🔥 {selected.calories} cal</Text>
        <Text style={styles.stat}>⭐ {selected.difficulty}</Text>
      </View>
      <Text style={styles.sectionTitle}>Ingredients</Text>
      <Text style={styles.body}>{selected.ingredients}</Text>
      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.body}>{selected.instructions}</Text>
      {selected.mine && (
        <View style={styles.row}>
          <TouchableOpacity style={[styles.primaryButton, { flex: 1 }]} onPress={() => startEdit(selected)}>
            <Text style={styles.buttonText}>Edit Recipe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.primaryButton, styles.delete, { flex: 1 }]} onPress={() => deleteRecipe(selected.id)}>
            <Text style={styles.buttonText}>Delete Recipe</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topbar}>
        {page !== "Home" && (
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.logo}>🍲 Foodie</Text>
        <Text style={styles.tagline}>Good food, good mood</Text>
      </View>

      {page === "Home" && (
        <View style={styles.categoryBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map(c => (
              <TouchableOpacity key={c} style={[styles.chip, category === c && styles.activeChip]} onPress={() => {
                if (c === "My Food") { setCategory(c); setPage("My Recipes"); }
                else { setCategory(c); setPage("Home"); }
              }}>
                <Text style={[styles.chipText, category === c && styles.activeChipText]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner} keyboardShouldPersistTaps="handled">
        {page === "Home" && (
          <>
            <Text style={styles.heading}>Find your next favourite</Text>
            <Text style={styles.muted}>Fresh inspiration for every meal.</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.primaryButton} onPress={() => setPage("Favorites")}>
                <Text style={styles.buttonText}>♥ Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => setPage("My Recipes")}>
                <Text style={styles.secondaryText}>My Recipes</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>{category === "All" ? "Popular recipes" : category + " recipes"}</Text>
            <View style={styles.grid}>
              {filtered.length ? filtered.map(recipeCard) : <Text style={styles.empty}>No recipes in this category yet.</Text>}
            </View>
          </>
        )}

        {page === "Favorites" && (
          <>
            <Text style={styles.heading}>Your Favorites ♥</Text>
            <Text style={styles.muted}>Tap a heart on any recipe to save it here.</Text>
            <View style={styles.grid}>
              {filtered.length ? filtered.map(recipeCard) : <Text style={styles.empty}>No favorites yet. Open a recipe and tap ♡.</Text>}
            </View>
          </>
        )}

        {page === "My Recipes" && (
          <>
            <Text style={styles.heading}>My Food · My Recipes</Text>
            <TouchableOpacity style={styles.primaryButton} onPress={startNewRecipe}>
              <Text style={styles.buttonText}>＋ Add New Recipe</Text>
            </TouchableOpacity>
            <View style={styles.grid}>
              {filtered.length ? filtered.map(recipeCard) : <Text style={styles.empty}>You haven't added any recipes yet.</Text>}
            </View>
          </>
        )}

        {page === "Add Recipe" && renderForm()}
        {page === "Details" && renderDetails()}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => { setPage("Home"); setCategory("All"); }}>
          <Text style={styles.navText}>⌂ Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage("Favorites")}>
          <Text style={styles.navText}>♥ Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage("My Recipes")}>
          <Text style={styles.navText}>▣ My Food</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF9F2" },
  topbar: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 10, backgroundColor: "#FFF9F2" },
  logo: { fontSize: 28, fontWeight: "900", color: "#D95D39" },
  tagline: { color: "#75665A", marginTop: 2 },
  backButton: { marginBottom: 6, alignSelf: "flex-start" },
  backText: { color: "#D95D39", fontSize: 16, fontWeight: "700" },
  categoryBar: { paddingVertical: 8, paddingLeft: 12, borderBottomWidth: 1, borderColor: "#F0E4D7" },
  content: { flex: 1 },
  contentInner: { padding: 16, paddingBottom: 28 },
  heading: { fontSize: 24, fontWeight: "800", color: "#33251F", marginBottom: 8 },
  muted: { color: "#88796D", fontSize: 13, marginBottom: 10 },
  sectionTitle: { fontSize: 19, fontWeight: "800", color: "#33251F", marginTop: 20, marginBottom: 12 },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 22, backgroundColor: "#F2E8DC", marginRight: 8, marginVertical: 4 },
  activeChip: { backgroundColor: "#D95D39" },
  chipText: { color: "#57473D", fontWeight: "600", fontSize: 13 },
  activeChipText: { color: "#FFFFFF" },
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 8 },
  primaryButton: { backgroundColor: "#D95D39", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, alignItems: "center", justifyContent: "center", marginVertical: 6 },
  secondaryButton: { backgroundColor: "#F2E8DC", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginVertical: 6 },
  secondaryText: { color: "#57473D", fontWeight: "700" },
  buttonText: { color: "#FFFFFF", fontWeight: "800", textAlign: "center" },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: { width: "48%", backgroundColor: "#FFFFFF", borderRadius: 16, overflow: "hidden", marginBottom: 14, borderWidth: 1, borderColor: "#F0E4D7" },
  cardImage: { width: "100%", height: 125, backgroundColor: "#EEE2D4" },
  heart: { position: "absolute", right: 8, top: 8, width: 34, height: 34, borderRadius: 17, backgroundColor: "#FFFFFFEE", alignItems: "center", justifyContent: "center" },
  heartText: { color: "#D95D39", fontSize: 22 },
  cardInfo: { padding: 10 },
  cardTitle: { fontWeight: "800", color: "#33251F", fontSize: 15, marginBottom: 5 },
  smallButton: { backgroundColor: "#D95D39", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, margin: 5 },
  smallButtonText: { color: "white", fontWeight: "700", fontSize: 12 },
  delete: { backgroundColor: "#A83232" },
  empty: { color: "#88796D", paddingVertical: 20, width: "100%" },
  heroImage: { width: "100%", height: 230, borderRadius: 18, marginBottom: 14, backgroundColor: "#EEE2D4" },
  detailHeader: { flexDirection: "row", alignItems: "center" },
  bigHeart: { color: "#D95D39", fontSize: 36, paddingHorizontal: 10 },
  stats: { flexDirection: "row", flexWrap: "wrap", backgroundColor: "#F2E8DC", padding: 12, borderRadius: 14, marginTop: 12 },
  stat: { width: "50%", color: "#57473D", paddingVertical: 6, fontWeight: "600" },
  body: { fontSize: 15, color: "#51443A", lineHeight: 24, backgroundColor: "#FFFFFF", padding: 14, borderRadius: 12 },
  label: { color: "#33251F", fontWeight: "800", marginTop: 14, marginBottom: 6 },
  input: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5D5C6", borderRadius: 10, padding: 12, fontSize: 15, color: "#33251F" },
  multiline: { minHeight: 100, textAlignVertical: "top" },
  uploadButton: { backgroundColor: "#57473D", borderRadius: 10, padding: 13, marginVertical: 8 },
  previewImage: { width: "100%", height: 160, borderRadius: 12, marginTop: 8 },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 13, borderTopWidth: 1, borderColor: "#F0E4D7", backgroundColor: "#FFFFFF" },
  navText: { color: "#57473D", fontWeight: "800" }
});
