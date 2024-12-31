import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { TransactionProvider } from "@/context/TransactionContextProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <TransactionProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="/transactions/[transactionId]"
            options={{
              title: "Transaction Details",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="add-income"
            options={{
              presentation: "modal",
              title: "Add Income",
            }}
          />
          <Stack.Screen
            name="add-expense"
            options={{
              presentation: "modal",
              title: "Add Expense",
            }}
          />

          <Stack.Screen name="+not-found" />
        </Stack>
      </TransactionProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
