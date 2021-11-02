
import React, {useState, useMemo, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Divider,
  FlatList,
  RefreshControl,

} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import theme from './assets/themes';

import ListItem from './components/ListItem';
import sampleData from './data/sampleData';
import Chart from './components/Chart';
import { getMarketData } from './services/crytoService';

const ListHeader=()=>{
  return(
    <>
      <Text style={styles.titleText}>Markets</Text>
      <View style={styles.divider}></View>
    </>
  )
}


const App=() => {

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [refreshing, setRefreshing] = useState(false)
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const _onRefresh = () => {
    console.log('_onRefresh')
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  const openModalSheet= (item) =>{
    setSelectedCoinData(item)
    bottomSheetModalRef.current.present();
  }

  const [selectedCoinData, setSelectedCoinData]= useState();
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchMarketData= async ()=>{
      const marketData = await getMarketData();
      setData(marketData)
    }
    fetchMarketData();
    return () => {
      // cleanup
      
    }
  }, [])
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.sectionContainer}>
        <StatusBar
          backgroundColor="transparent"
          
        />
          
        <FlatList 
          keyExtractor={(item)=> item.id }
          data={data}
          renderItem={({item})=>{
            return(
              <ListItem 
                name={item.name}
                logo={item.image}
                symbol={item.symbol}
                currentPrice={item.current_price}
                changePricePercent24h={item.price_change_percentage_24h}
                onPress={()=> {openModalSheet(item)} }
              />    
            )
          }}
          refreshControl={
            <RefreshControl 
                refreshing={refreshing} 
                onRefresh={_onRefresh}
                tintColor="#F8852D"/>
        }
          ListHeaderComponent={<ListHeader/>}
        />

      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      > 
        {
          selectedCoinData ? (
            <Chart 
              name={selectedCoinData.name}
              logo={selectedCoinData.image}
              symbol={selectedCoinData.symbol}
              currentPrice={selectedCoinData.current_price}
              changePricePercent24h={selectedCoinData.price_change_percentage_24h}
              sparklineIn7d={selectedCoinData.sparkline_in_7d.price}

            />
          ) : ""
        }
        
      </BottomSheetModal>

    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingTop: 0,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  titleText:{
  ...theme.textVariants.h1,
  marginVertical: theme.spacing.m,
  marginHorizontal: theme.spacing.m
  },
  divider:{
    borderBottomColor: theme.colors.gray,
    marginHorizontal: theme.spacing.m,
    borderBottomWidth: 2,
  },
  bottomSheet:{
    borderRadius: theme.borderRadius.m,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: -4
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },

});

export default App;
