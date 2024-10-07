import { router } from 'expo-router';
import React, { FC } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import emptyImage from '../../../assets/images/emptyImage.png'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ICharacterItem } from '@/models';

interface ListItemProps {
    character: ICharacterItem
    handleReloadCharacter: (character: ICharacterItem) => void
};

const ListItem: FC<ListItemProps> = ({ character, handleReloadCharacter }) => {
    const handleNavigateDetails = () => {
        router.push({ pathname: '/characters/[id]', params: { id: character.id, name: character.name, hasAccess: character.isHasSuccessAttempt ? true : '' } })
    }
  return (
    <TouchableOpacity
        onPress={handleNavigateDetails}
        style={styles.listContainer}>
      <View style={styles.leftSideContainer}>
          <View>
            <Image 
              style={styles.listImage} 
              source={character?.image ? { uri: character?.image} : emptyImage}/>
          </View>
          <View>
            <Text style={styles.listName}>{character?.name}</Text>
            <Text style={styles.listAttempts}>Attempts: {character?.attempts}</Text>
          </View>
      </View>
      <View style={styles.rightSideContainer}>
        {!character.isHasSuccessAttempt && (
          <TouchableOpacity onPress={() => handleReloadCharacter(character)}>
              <TabBarIcon name={'reload'} color={'black'} /> 
          </TouchableOpacity>
        ) }
        <TabBarIcon name={character.isHasSuccessAttempt ?'checkmark-circle' : 'close'} color={character.isHasSuccessAttempt ? 'green' : 'red'} /> 
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listContainer: { 
    width: '100%',
    flex: 1 ,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  leftSideContainer: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10
  },
  listImage: {
    width: 30, 
    height: 50 
  },
  listName: {
    fontWeight: '700',
    fontSize: 12
  },
  listAttempts: {
    fontSize: 8, 
    marginTop: 2
  },
  rightSideContainer: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    gap: 15, 
    alignItems: 'center' 
  }
})

export default ListItem
