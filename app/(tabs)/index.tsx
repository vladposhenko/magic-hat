import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";
import ContainerBox from "@/components/ui/ContainerBox";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCharacters } from "@/store/appActions";
import {
  addAnsweredCharacter,
  getRandomCharacter,
  incrementFailedAttempts,
  incrementSuccessAttempts,
  incrementTotalAttempts,
} from "@/store/appReducer";
import { Houses } from "@/constants/Houses";
import emptyImage from "../../assets/images/emptyImage.png";
import Counters from "@/components/common/Counters";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { currentCharacter } = useAppSelector((state) => state.app);
  const [refreshing] = React.useState(false);
  const [isAttemptFailed] = useState(false);

  const onRefresh = React.useCallback(() => {
    dispatch(getRandomCharacter());
  }, []);

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  const handleHouseClick = (house: any) => {
    const isNotInHouse = house.name === "Not in house";
    dispatch(incrementTotalAttempts());
    dispatch(addAnsweredCharacter());
    if (isNotInHouse && currentCharacter?.house === "") {
      dispatch(incrementSuccessAttempts());
      dispatch(addAnsweredCharacter());
      dispatch(getRandomCharacter());
      return;
    }
    if (house.name === currentCharacter?.house) {
      dispatch(incrementSuccessAttempts());
      dispatch(addAnsweredCharacter());
      dispatch(getRandomCharacter());
    } else {
      dispatch(incrementFailedAttempts());
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        ></RefreshControl>
      }
    >
      <Counters />
      <View style={styles.mainBlockContainer}>
        <Image
          style={[
            { width: "50%", height: 300 },
            !currentCharacter?.image && { width: "80%" },
          ]}
          source={
            currentCharacter?.image
              ? { uri: currentCharacter?.image }
              : emptyImage
          }
        />
        <Text style={styles.characterName}>{currentCharacter?.name}</Text>
      </View>
      <View style={styles.houseButtonsContainer}>
        {Houses.map((house) => {
          return (
            <TouchableOpacity onPress={() => handleHouseClick(house)}>
              <ContainerBox
                name={house.name}
                boxWidth={house.boxWidth}
                image={house?.image}
                hasError={isAttemptFailed}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  counterContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 15,
  },
  characterName: {
    fontWeight: "700",
    marginTop: 20,
  },
  mainBlockContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  houseButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: 15,
    marginTop: 20,
  },
});

export default HomeScreen;
