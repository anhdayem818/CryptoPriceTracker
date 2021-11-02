import { constant } from 'lodash';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import theme from '../assets/themes/index';

const ListItem=(props)=>{
  const {name, symbol, currentPrice, changePricePercent24h, logo} = props
  const priceChangeColor = changePricePercent24h > 0 ? "#34C759" : "#FF3830";
  return(
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.itemWrapper}>
        <View style={styles.leftWrapper}>
          <Image source={ {uri: logo}}
            style={styles.iconImage}
          />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}> {name}</Text>
            <Text style={styles.subTitle}> {symbol}</Text>
          </View>
        </View>

        <View style={styles.rightWrapper}>
          <Text style={styles.currencyText}> ${currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</Text>
          <Text style={[styles.subTitle, {color: priceChangeColor}]}> {changePricePercent24h} %</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemWrapper:{
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.m,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...theme.shadows.boxShadownBottom,
  },
  leftWrapper:{
    flexDirection: "row",
  },
  rightWrapper:{
    alignItems: "flex-end"
  },
  iconImage:{
    width: theme.imageHeight.xs,
    height: theme.imageHeight.xs,
  },
  titleWrapper:{
    marginLeft: theme.spacing.sm,
  },
  title:{
    ...theme.textVariants.h2
  },
  subTitle:{
    ...theme.textVariants.body3,
    textTransform: 'uppercase',
  },
  currencyText:{
    ...theme.textVariants.body1,
  },
})

export default ListItem;