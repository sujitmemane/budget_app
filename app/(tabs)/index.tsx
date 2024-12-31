import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TransactionContext } from "@/context/TransactionContextProvider";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Index = () => {
  const screenWidth = Dimensions.get("window").width;
  const { income, expense, transactions, categories } =
    useContext(TransactionContext);

  const TransactionData = transactions?.map((transaction) => {
    const category = categories.find(
      (category) => category.name === transaction?.category
    );
    return {
      ...transaction,
      category,
    };
  });
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back 👋</Text>
          <Text style={styles.subText}>Track your expenses easily</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={40} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>₹{income - expense}</Text>
        <View style={styles.balanceMetrics}>
          <View style={styles.metric}>
            <Ionicons name="arrow-up-circle" size={24} color="#4CAF50" />
            <View style={styles.metricText}>
              <Text style={styles.metricLabel}>Income</Text>
              <Text style={[styles.metricAmount, styles.incomeColor]}>
                ₹ {income}
              </Text>
            </View>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metric}>
            <Ionicons name="arrow-down-circle" size={24} color="#F44336" />
            <View style={styles.metricText}>
              <Text style={styles.metricLabel}>Expenses</Text>
              <Text style={[styles.metricAmount, styles.expenseColor]}>
                ₹{expense}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          onPress={() => router.push("/add-income")}
          style={styles.actionButton}
        >
          <View style={[styles.actionIcon, { backgroundColor: "#E3F2FD" }]}>
            <Ionicons name="add-circle" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.actionText}>Add Income</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/add-expense")}
          style={styles.actionButton}
        >
          <View style={[styles.actionIcon, { backgroundColor: "#FFEBEE" }]}>
            <Ionicons name="remove-circle" size={24} color="#F44336" />
          </View>
          <Text style={styles.actionText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/transactions")}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction Items */}
        <View style={styles.transactionList}>
          {TransactionData.map((item, index) => (
            <TouchableOpacity
              onPress={() => router.push(`/transactions/${item?.id}`)}
              key={index}
              style={styles.transactionItem}
            >
              <View style={styles.transactionIcon}>
                <Ionicons
                  name={`${item?.category?.icon}-outline`}
                  size={24}
                  color={item?.type === "income" ? "#4CAF50" : "#F44336"}
                />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{item.name}</Text>
                <Text style={styles.transactionDate}>
                  {formatDate(item?.date)}
                </Text>
              </View>
              <Text style={styles.transactionAmount}>
                {item?.type === "income" ? (
                  <Text
                    style={{
                      color: "#4CAF50",
                    }}
                  >
                    + ₹{item?.amount}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: "#F44336",
                    }}
                  >
                    - ₹{item?.amount}
                  </Text>
                )}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  balanceCard: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balanceTitle: {
    fontSize: 16,
    color: "#666",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  balanceMetrics: {
    flexDirection: "row",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  metric: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  metricDivider: {
    width: 1,
    backgroundColor: "#eee",
    marginHorizontal: 15,
  },
  metricText: {
    marginLeft: 10,
  },
  metricLabel: {
    fontSize: 14,
    color: "#666",
  },
  metricAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  incomeColor: {
    color: "#4CAF50",
  },
  expenseColor: {
    color: "#F44336",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  actionButton: {
    alignItems: "center",
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: "#333",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 20,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#2196F3",
  },
  transactionList: {
    gap: 15,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 15,
  },
  transactionTitle: {
    fontSize: 16,
    color: "#333",
  },
  transactionDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F44336",
  },
});

export default Index;
