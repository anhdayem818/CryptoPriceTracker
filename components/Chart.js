import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';
import theme from '../assets/themes/index';
import { useSharedValue } from 'react-native-reanimated';
export const {width: SIZE} = Dimensions.get('window');

const Chart=(props)=>{
  
  const {name, logo, symbol, currentPrice, changePricePercent24h, sparklineIn7d} = props
  const priceChangeColor = changePricePercent24h > 0 ? "#34C759" : "#FF3830";

  const lastedPrice = useSharedValue(currentPrice)
  const [chartReady, setChartReady] = useState(false)
  useEffect(() => {
    lastedPrice.value = currentPrice
    setTimeout(()=>{
      setChartReady(true)
    },0)
  }, [currentPrice])

  const formatUSD = value => {
    'worklet';
    if (value === '') {
      const formattedValue = `$${lastedPrice.value.toLocaleString('en-US', { currency: 'USD' })}`
      return formattedValue;
    }

    const formattedValue =`$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    return formattedValue;
  };


  return(
    <ChartPathProvider data={{ points: sparklineIn7d, smoothingStrategy: 'bezier' }}>
      <View style={styles.contentContainer}>
        <View style={styles.headerInfoChart}>
          <View style={styles.leftInfoChart}>
            <View style={ {flexDirection: "row", alignItems: "center" } }>
              <Image source={ {uri: logo}} style={styles.imageLogo} />
              <Text> {name} {`(${symbol.toUpperCase()})`}  </Text>
            </View>
            <ChartYLabel
              format={formatUSD}
              style={styles.currentPrice}
            />
            
          </View>
          <View style={styles.rightInfoChart}>
            <Text> 24h </Text>
            <Text style={ {color: priceChangeColor} }> {`${changePricePercent24h}%`} </Text>
          </View>
        </View>
        {
          chartReady ? 
            (<View style={{ backgroundColor: '#fff' }}>
              <ChartPath height={SIZE / 2} stroke="#ccc" width={SIZE} />
              <ChartDot style={{ backgroundColor: 'blue' }} />
            </View>)
          : null
        }
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