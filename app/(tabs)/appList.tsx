import { StyleSheet, ScrollView, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import SearchInput from "@/components/ui/SearchInput";
import { router } from "expo-router";
import { setCurrentCharacter } from "@/store/appReducer";
import { ICharacterItem } from "@/models";
import ListItem from "@/components/HomeScreen/ListItem";
import Counters from "@/components/common/Counters";

const AppList = () => {
  const { answeredCharacters } = useAppSelector((state) => state.app);
  const [searchText, setSearchText] = useState("");
  const [findedCharacters, setFindedCharacters] = useState(answeredCharacters);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setFindedCharacters(answeredCharacters);
  }, [answeredCharacters]);

  const handleSearch = (value: any) => {
    setSearchText(value);
    if (!value) {
      setFindedCharacters(answeredCharacters);
      return;
    }
    const filtered = findedCharacters.filter((character) =>
      character.name.includes(value)
    );
    setFindedCharacters(filtered);
  };

  const handleReloadCharacter = (character: ICharacterItem) => {
    dispatch(setCurrentCharacter(character));
    router.push("/");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Counters />
      <View style={{ marginTop: 30 }}>
        <SearchInput handleSearch={handleSearch} value={searchText} />
      </View>
      <View style={styles.listContainer}>
        {findedCharacters.map((character) => {
          return (
            <ListItem
              character={character}
              handleReloadCharacter={handleReloadCharacter}
            />
          );
        })}
      </View>
      {searchText && !findedCharacters.length && (
        <Text style={{ textAlign: "center" }}>Not found any character</Text>
      )}
      {!searchText && !findedCharacters.length && (
        <Text style={{ textAlign: "center" }}>No answered characters yet</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  listContainer: {
    flex: 1,
    gap: 15,
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

export default AppList;
