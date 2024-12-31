import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

import { usePathname } from "expo-router";

export default function NotFoundScreen() {
  const pathname = usePathname();
  return (
    <View style={styles.container}>
      <Text>Current Route: {pathname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
