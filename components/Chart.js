import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import {ChartDot, ChartPath, ChartPathProvider} from '@rainbow-me/animated-charts';
import theme from '../assets/themes/index';
export const {width: SIZE} = Dimensions.get('window');

const Chart=(props)=>{
  
  const {name, logo, symbol, currentPrice, changePricePercent24h, sparklineIn7d} = props
  const priceChangeColor = changePricePercent24h > 0 ? "#34C759" : "#FF3830";
  console.log(sparklineIn7d)


  return(
    <ChartPathProvider data={{ points: sparklineIn7d, smoothingStrategy: 'bezier' }}>
    <View style={styles.contentContainer}>
      <View style={styles.headerInfoChart}>
        <View style={styles.leftInfoChart}>
          <View style={ {flexDirection: "row", alignItems: "center" } }>
            <Image source={ {uri: logo}} style={styles.imageLogo} />
            <Text> {name} {`(${symbol.toUpperCase()})`}  </Text>
          </View>
          <Text style={styles.currentPrice}>
             ${currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
          </Text>
        </View>
        <View style={styles.rightInfoChart}>
          <Text> 24h </Text>
          <Text style={ {color: priceChangeColor} }> {`${changePricePercent24h}%`} </Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#fff' }}>
        
          <ChartPath height={SIZE / 2} stroke="#ccc" width={SIZE} />
          <ChartDot style={{ backgroundColor: 'blue' }} />
      </View>
    </View>
    </ChartPathProvider>
  )
}

const styles = StyleSheet.create({
  contentContainer:{
    flex: 1,
  },
  chartTitle:{
    ...theme.textVariants.h2,
    marginHorizontal: theme.spacing.m
  },
  headerInfoChart:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  imageLogo:{
    width: 24,
    height:24,
  },
  currentPrice:{
    marginLeft: theme.spacing.sm,
    ...theme.textVariants.h1,
  },
  leftInfoChart:{
    marginLeft: theme.spacing.sm,
  },
  rightInfoChart:{
    alignItems: "flex-end",
    marginRight: theme.spacing.m,
  }

})

export default Chart;