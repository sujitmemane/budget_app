import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  generateRandomId,
  TransactionContext,
} from "@/context/TransactionContextProvider";
import { Category } from "@/context/types";

const Categories = () => {
  const { categories, addCategory, deleteCategory, updateCategory } =
    useContext(TransactionContext);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("#4CAF50");
  const [categoryName, setCategoryName] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const colorOptions = [
    "#4CAF50",
    "#2196F3",
    "#FF9800",
    "#9C27B0",
    "#F44336",
    "#009688",
    "#E91E63",
    "#3F51B5",
    "#CDDC39",
    "#795548",
  ];

  const iconOptions = [
    { name: "restaurant", label: "Food" },
    { name: "cart", label: "Shopping" },
    { name: "car", label: "Transport" },
    { name: "film", label: "Entertainment" },
    { name: "receipt", label: "Bills" },
    { name: "home", label: "Home" },
    { name: "medical", label: "Health" },
    { name: "book", label: "Education" },
  ];

  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0].name);

  const resetModal = () => {
    setCategoryName("");
    setSelectedColor("#4CAF50");
    setSelectedIcon(iconOptions[0].name);
    setEditMode(false);
    setSelectedCategoryId(null);
  };

  const onSaveCategory = () => {
    if (editMode && selectedCategoryId) {
      updateCategory({
        id: selectedCategoryId,
        name: categoryName,
        icon: selectedIcon,
        color: selectedColor,
      });
      Alert.alert("Category updated successfully!");
    } else {
      addCategory({
        id: generateRandomId(),
        name: categoryName,
        icon: selectedIcon,
        color: selectedColor,
      });
      Alert.alert("Category added successfully!");
    }
    setModalVisible(false);
    resetModal();
  };

  const onDeleteCategory = (id: string) => {
    deleteCategory(id);
  };

  const onEditCategory = (id: string) => {
    const categoryToEdit = categories?.find((item) => item.id === id);
    if (categoryToEdit) {
      setEditMode(true);
      setSelectedCategoryId(id);
      setCategoryName(categoryToEdit.name);
      setSelectedColor(categoryToEdit.color);
      setSelectedIcon(categoryToEdit.icon);
      setModalVisible(true);
    }
  };

  const onCloseModal = () => {
    setModalVisible(false);
    resetModal();
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <View
        style={[styles.categoryIcon, { backgroundColor: item.color + "20" }]}
      >
        <Ionicons name={`${item.icon}-outline`} size={24} color={item.color} />
      </View>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        {/* <Text style={styles.transactionCount}>24 transactions</Text> */}
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onEditCategory(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View
            style={[styles.iconBackground, { backgroundColor: "#4CAF5015" }]}
          >
            <Ionicons name="pencil" size={18} color="#4CAF50" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onDeleteCategory(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View
            style={[styles.iconBackground, { backgroundColor: "#F4433615" }]}
          >
            <Ionicons name="trash" size={18} color="#F44336" />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.categoryList}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editMode ? "Edit Category" : "Add Category"}
              </Text>
              <TouchableOpacity onPress={onCloseModal}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Category Name"
              value={categoryName}
              onChangeText={setCategoryName}
            />

            <Text style={styles.sectionTitle}>Select Icon</Text>
            <View style={styles.iconGrid}>
              {iconOptions.map((icon) => (
                <TouchableOpacity
                  key={icon.name}
                  style={[
                    styles.iconOption,
                    selectedIcon === icon.name && {
                      borderColor: selectedColor,
                      backgroundColor: selectedColor + "15",
                    },
                  ]}
                  onPress={() => setSelectedIcon(icon.name)}
                >
                  <Ionicons
                    name={`${icon.name}-outline`}
                    size={24}
                    color={selectedIcon === icon.name ? selectedColor : "#666"}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Select Color</Text>
            <View style={styles.colorGrid}>
              {colorOptions.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColorOption,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: selectedColor }]}
              onPress={onSaveCategory}
            >
              <Text style={styles.saveButtonText}>
                {editMode ? "Save Changes" : "Add Category"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryList: {
    padding: 15,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 15,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  transactionCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
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
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 4,
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    margin: 4,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: "#333",
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
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  iconBackground: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Categories;
