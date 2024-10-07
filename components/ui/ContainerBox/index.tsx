import React, { FC } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

type ContainerBoxProps = {
    name: string;
    value?: number;
    image?: any;
    boxWidth: any;
    hasError?: boolean
};

const ContainerBox: FC<ContainerBoxProps> = ({ name, boxWidth, value, image, hasError }) => {
  return (
    <View style={[styles.boxContainer, { minWidth: boxWidth }]}>
        {value === undefined ? <></> : <Text style={{ fontWeight: '700', fontSize: 18 }}>{value}</Text>}
        {image && <Image style={styles.logoImage} source={image} />}
        <Text style={{ fontSize: 15 }}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  boxContainer: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    height: 100,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: '#f1f1f1',
  },
  logoImage: {
    width: 20,
    height: 20
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: '700'
  }
})

export default ContainerBox
