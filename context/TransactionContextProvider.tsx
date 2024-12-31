import React, { createContext, ReactNode, useMemo, useState } from "react";
import { Category, Transaction } from "./types";

interface TransactionContextType {
  transactions: Transaction[];
  categories: Category[];
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (category: Category) => void;
  addTransaction: (transaction: Transaction) => void;
  income: number;
  expense: number;
}

const defaultContext: TransactionContextType = {
  transactions: [],
  categories: [],
  addCategory: () => {},
  deleteCategory: () => {},
  updateCategory: () => {},
  addTransaction: () => {},
  income: 0,
  expense: 0,
};
export const TransactionContext =
  createContext<TransactionContextType>(defaultContext);

export const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: generateRandomId(),
      name: "Groceries",
      description: "This is my grocery expense",
      category: "Food",
      amount: 50,
      type: "expense",
      date: Date.now(),
    },
    {
      id: generateRandomId(),
      name: "Salary",
      description: "I got my salary",
      category: "Work",
      amount: 1000,
      type: "income",
      date: Date.now(),
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: generateRandomId(),
      name: "Food",
      icon: "restaurant",
      color: "#FF6347",
    },
    {
      id: generateRandomId(),
      name: "Work",
      icon: "book",
      color: "#4682B4",
    },
    {
      id: generateRandomId(),
      name: "Shopping",
      icon: "cart",
      color: "#FFD700",
    },
  ]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const addCategory = (category: Category) => {
    console.log(category, "sample");
    setCategories([...categories, category]);
  };

  const deleteCategory = (id: string) => {
    setCategories((categories) =>
      categories?.filter((category) => category.id !== id)
    );
  };

  const updateCategory = (category: Category) => {
    setCategories(
      categories.map((item) =>
        item.id === category.id
          ? {
              ...item,
              name: category.name,
              color: category.color,
              icon: category.icon,
            }
          : item
      )
    );
  };

  const total = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
  }, [transactions]);

  const income = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  }, [transactions]);

  const expense = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        categories,
        addCategory,
        deleteCategory,
        updateCategory,
        addTransaction,
        income,
        expense,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
