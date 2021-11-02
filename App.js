
import React, {useState} from 'react';
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
import { Colors } from 'react-native/Libraries/NewAppScreen';
import theme from './assets/themes';

import ListItem from './components/ListItem';
import sampleData from './data/sampleData';


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

  const _onRefresh = () => {
    console.log('_onRefresh')
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
      />
         
      <FlatList 
        keyExtractor={(item)=> item.id }
        data={sampleData}
        renderItem={({item})=>{
          return(
            <ListItem 
              name={item.name}
              logo={item.image}
              symbol={item.symbol}
              currentPrice={item.current_price}
              changePricePercent24h={item.price_change_percentage_24h}
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
  }
});

export default App;
