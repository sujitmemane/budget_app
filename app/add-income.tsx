import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { TransactionContext } from "@/context/TransactionContextProvider";
import { Category } from "@/context/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const AddIncome = () => {
  const { categories, addTransaction } = useContext(TransactionContext);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    amount: "",
    category: "",
    description: "",
  });

  console.log(selectedCategory, "cat");
  const handleAddIncome = () => {
    setErrors({
      name: "",
      amount: "",
      category: "",
      description: "",
    });

    let isValid = true;
    if (!name) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      isValid = false;
    }

    if (!description) {
      setErrors((prev) => ({
        ...prev,
        description: "Description is required",
      }));
      isValid = false;
    }

    if (!name) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      isValid = false;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setErrors((prev) => ({ ...prev, amount: "Enter a valid amount" }));
      isValid = false;
    }

    if (!selectedCategory) {
      setErrors((prev) => ({ ...prev, category: "Please select a category" }));
      isValid = false;
    }

    if (isValid) {
      addTransaction({
        name,
        description,
        amount: parseFloat(amount),
        category: selectedCategory?.name,
        type: "income",
      });
      Alert.alert("Success", "Income added successfully!");
      router.push("/(tabs)/transactions");
    } else {
      Alert.alert("Error", "Please fill in all fields correctly.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={[styles.input, errors.name && { borderColor: "red" }]}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Enter a description"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        {errors.description && (
          <Text style={styles.errorText}>{errors.description}</Text>
        )}

        <TextInput
          style={[styles.input, errors.amount && { borderColor: "red" }]}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

        <Text style={styles.sectionTitle}>Category</Text>

        <View style={styles.categoryGrid}>
          {categories.map((category: Category) => (
            <TouchableOpacity
              key={category?.id}
              style={[
                styles.categoryCard,
                selectedCategory?.id === category.id
                  ? styles.selectedCategory
                  : {},
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <View
                style={[
                  styles.categoryIcon,
                  { backgroundColor: `${category.color}20` },
                ]}
              >
                <Ionicons name={`${category.icon}-outline`} size={18} />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {errors.category && (
          <Text style={styles.errorText}>{errors.category}</Text>
        )}

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: "#4CAF50" }]}
          disabled={!selectedCategory}
          onPress={handleAddIncome}
        >
          <Text style={styles.saveButtonText}>Add Income</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddIncome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  categoryCard: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    margin: "1.5%",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedCategory: {
    borderColor: "#2196F3",
    backgroundColor: "#E3F2FD",
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    textAlign: "center",
  },
  saveButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
