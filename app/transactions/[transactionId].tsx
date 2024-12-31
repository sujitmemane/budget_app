import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { TransactionContext } from "@/context/TransactionContextProvider";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons for back arrow

export default function TransactionDetailPage() {
  const params = useLocalSearchParams();
  const { transactions } = useContext(TransactionContext);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // To navigate back

  useEffect(() => {
    try {
      if (!params?.transactionId) throw new Error("Transaction ID is missing");
      const foundTransaction = transactions.find(
        (t) => t.id === params.transactionId
      );
      if (!foundTransaction) throw new Error("Transaction not found");
      setTransaction(foundTransaction);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Transaction detail error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [params?.transactionId, transactions]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAmountColor = () => {
    return transaction.type === "expense" ? "#FF3B30" : "#34C759";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
          </TouchableOpacity>
          <Text style={styles.title}>{transaction.name}</Text>
          <Text style={[styles.amount, { color: getAmountColor() }]}>
            ₹ {transaction?.amount}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{transaction.category}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{formatDate(transaction.date)}</Text>
          </View>

          {transaction.description && (
            <>
              <View style={styles.divider} />
              <View style={styles.notesContainer}>
                <Text style={styles.label}>Notes</Text>
                <Text style={styles.notes}>{transaction.description}</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    backgroundColor: "#F2F2F7",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 8,
    flex: 1, // Takes up available space, ensuring title aligns correctly
  },
  amount: {
    fontSize: 34,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    color: "#8E8E93",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#1C1C1E",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5EA",
  },
  notesContainer: {
    paddingVertical: 12,
  },
  notes: {
    fontSize: 16,
    color: "#1C1C1E",
    marginTop: 8,
    lineHeight: 22,
  },
  error: {
    color: "#FF3B30",
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
});
