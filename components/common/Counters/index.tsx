import ContainerBox from "@/components/ui/ContainerBox";
import { useAppSelector } from "@/hooks/redux";
import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

const Counters = () => {
  const { totalAttempts, failedAttempts, successAttempts } = useAppSelector(
    (state) => state.app
  );
  const counterBoxConfig = [
    {
      name: "Total",
      boxWidth: "30%",
      value: totalAttempts,
    },
    {
      name: "Failed",
      boxWidth: "30%",
      value: failedAttempts,
    },
    {
      name: "Success",
      boxWidth: "30%",
      value: successAttempts,
    },
  ];
  return (
    <View style={styles.counterContainer}>
      {counterBoxConfig.map((counter) => {
        return (
          <ContainerBox
            name={counter.name}
            boxWidth={counter.boxWidth}
            value={counter.value}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
    counterContainer: {
        flex: 1,
        flexDirection: "row",
        gap: 15,
    },
});

export default Counters;
