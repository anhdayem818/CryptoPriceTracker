import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ListItem=()=>{
  return(
    <TouchableOpacity>
      <View style={styles.itemWrapper}>
        <View style={styles.leftWrapper}>
          <Image source={}></Image>
          <View>
            <Text style={styles.title}> Etherium</Text>
            <Text style={styles.subTitle}> ETH</Text>
          </View>
        </View>

        <View style={styles.rightWrapper}>

        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemWrapper:{

  },
  leftWrapper:{},
  rightWrapper:{},
})

export default ListItem;