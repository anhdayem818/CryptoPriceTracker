
import React, {useState, useMemo, useRef } from 'react';
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

  const openModalSheet= () =>{
    bottomSheetModalRef.current.present();
  }

  return (
    <BottomSheetModalProvider>
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
                onPress={()=> {openModalSheet()} }
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
        style={styles.bottemSheet}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
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
  bottemSheet:{
    shadowColor: theme.colors.white,
    shadowOffset:{
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

});

export default App;
