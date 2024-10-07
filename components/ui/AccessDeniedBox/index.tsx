import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import React, { FC } from 'react'
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native'


const AccessDeniedBox = () => {
  return (
    <View style={styles.boxContainer}>
        <Text style={styles.boxText}>ACCESS DENIED</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  boxContainer: { 
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    borderColor: 'red',
    borderWidth: 2
  },
  logoImage: {
    width: 20,
    height: 20
  },
  boxText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'red'
  }
})

export default AccessDeniedBox
