import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import React, { FC } from 'react'
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native'

interface SearchInputProps {
    handleSearch: (value: string) => void
    value: string
};

const SearchInput: FC<SearchInputProps> = ({ handleSearch, value }) => {
  return (
    <View>
        <TextInput 
          style={styles.textInput}
          onChangeText={handleSearch}
          value={value}
          placeholder='Filter characters...'
          placeholderTextColor='black'
        />
        <TouchableOpacity style={styles.searchIcon}>
          <TabBarIcon name={'search'} color={'black'} /> 
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%', 
    height: 50, 
    borderColor: 'black', 
    borderWidth: 2, 
    paddingLeft: 20
  },
  searchIcon: {
    position: 'absolute', 
    right: 20, 
    top: '20%'
  }
})

export default SearchInput
