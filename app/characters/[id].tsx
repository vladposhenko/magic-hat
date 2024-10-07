import { StyleSheet, ScrollView, Text, Image, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getOneCharacter } from '@/store/appActions';
import emptyImage from '../../assets/images/emptyImage.png'
import AccessDeniedBox from '@/components/ui/AccessDeniedBox';


const CharacterDetails = () => {
  const { id, name, hasAccess } = useLocalSearchParams()
  const dispatch = useAppDispatch()
  const { selectedCharacter } = useAppSelector(state => state.app)
  const navigation = useNavigation()
  
  useEffect(() => {
    dispatch(getOneCharacter(id))
    navigation.setOptions({
        headerTitle: name
    })
  }, [])

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image 
                style={{ width: '30%', height: 150 }} 
                resizeMode='contain'
                source={selectedCharacter?.image ? { uri: selectedCharacter?.image } : emptyImage}
            />
          
            {!hasAccess ? <AccessDeniedBox /> 
            : (
                <View style={{ flex: 1, gap: 5 }}>
                    <Text>House: {selectedCharacter?.house}</Text>
                    <Text>Date of birth: {selectedCharacter?.dateOfBirth}</Text>
                    <Text>Actor: {selectedCharacter?.actor}</Text>
                    <Text>Species: {selectedCharacter?.species}</Text>
                </View>
            )
            }
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  counterContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 15
  },
});

export default CharacterDetails