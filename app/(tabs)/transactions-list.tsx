import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TransactionContext } from "@/context/TransactionContextProvider";
import { router } from "expo-router";

const Transactions = () => {
  const { transactions, categories } = useContext(TransactionContext);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  console.log(transactions, "tanu");

  const filteredTransactions = transactions
    ?.filter((transaction) => {
      if (selectedFilter === "all") return true;
      return transaction.type === selectedFilter;
    })
    .filter((transaction) =>
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const TransactionData = filteredTransactions?.map((transaction) => {
    const category = categories.find(
      (category) => category.name === transaction?.category
    );
    return {
      ...transaction,
      category,
    };
  });

  const filters = [
    { id: "all", label: "All" },
    { id: "income", label: "Income" },
    { id: "expense", label: "Expense" },
  ];

  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/transactions/${item.id}`)}
      style={styles.transactionCard}
    >
      <View style={styles.transactionLeft}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: item.type === "income" ? "#E8F5E9" : "#FFEBEE" },
          ]}
        >
          <Ionicons
            name={`${item?.category?.icon}-outline`}
            size={22} // Adjusted for consistency
            color={item.type === "income" ? "#4CAF50" : "#F44336"}
          />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle}>{item.name}</Text>
          <Text style={styles.transactionCategory}>
            {item.category?.name || "Unknown Category"}
          </Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            { color: item.type === "income" ? "#4CAF50" : "#F44336" },
          ]}
        >
          {item.type === "income" ? "+" : "-"} ₹{Math.abs(item.amount)}
        </Text>
        <Text style={styles.transactionDate}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterPill,
              selectedFilter === filter.id && styles.filterPillActive,
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.id && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={TransactionData}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.transactionList}
        showsVerticalScrollIndicator={false}
      />

      {TransactionData?.lenght === 0 && (
        <View>
          <Text>No Transactions found</Text>
        </View>
      )}
    </View>
  );
};

export default Transactions;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E9F2",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1F36",
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E9F2",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1A1F36",
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E9F2",
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    marginRight: 8,
    height: 36,
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  filterPillActive: {
    backgroundColor: "#4F46E5",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  transactionList: {
    padding: 16,
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  transactionInfo: {
    flex: 1,
    marginRight: 8,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1F36",
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 14,
    color: "#64748B",
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 13,
    color: "#64748B",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
  },
});
