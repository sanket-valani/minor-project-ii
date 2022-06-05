import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MarketPricesStackParamList, MarketPricesStackScreens } from '../App';

type MarketPricesScreenRouteProp = RouteProp <MarketPricesStackParamList, MarketPricesStackScreens.MarketPrices>;
type MarketPricesScreenNavigationProp = StackNavigationProp <MarketPricesStackParamList, MarketPricesStackScreens.MarketPrices>;
type Props = {
  route: MarketPricesScreenRouteProp;
  navigation: MarketPricesScreenNavigationProp;
};

const MarketPrices: React.FunctionComponent<Props> = ( {navigation} ) => {
  type marketPrices = {
    id: Number,
    state: String,
    district: String,
    market: String,
    commodity: String,
    variety: String,
    min_price: String,
    max_price: String,
    modal_price: String
  }
  type dropDownItem = {
    label: String,
    value: String,
    selected?: boolean
  }

  const [allMarketPrices, changeAllMarketPrices] = React.useState<Array<marketPrices>>([]);
  const [currentStateMarketPrices, changeCurrentStateMarketPrices] = React.useState<Array<any>>([]);
  const [allStates, changeAllStates] = React.useState<Array<any>>([{
    label: 'All States',
    value: 'All States',
    selected:true    
  }]);
  const [disableDropDown, changeDisableDropDown] = React.useState<boolean>(true);

  React.useEffect(()=>{
    API_Caller().then(()=>{
      changeDisableDropDown(false);
    });
  },[]);
  

  const API_Caller: Function = async () => {
    try {
      fetch('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=api-key&format=json&offset=0&limit=10000', {
        method: 'GET'
      })
      .then((response)=>response.json())
      .then((responseJSON)=>{
        let records = responseJSON.records; 
        let states = records.map((item: { state: any; }) => item.state)
        states = [...new Set(states)];
        states = states.map((item: any) => {
          return {label: item, value: item};
        });
        changeAllStates( [...allStates, ...states] );
        records = records.map((item: any,index: Number)=>{
          let obj:marketPrices = {
            id: index,
            market: item.market,
            commodity: item.commodity,
            district: item.district,
            max_price: item.max_price,
            min_price: item.min_price,
            modal_price: item.modal_price,
            state: item.state,
            variety: item.variety,
          }
          return obj ;
        })
        changeCurrentStateMarketPrices(records);
        changeAllMarketPrices(records);
      });
    } catch (error) {
      console.log('error in fetch api'+error);
    }      
  }

  const UpdateStateMarketPrices: Function = (item:dropDownItem) => {
    if(item.value === "All States"){
      changeCurrentStateMarketPrices(allMarketPrices);
    } else {
      let newData:marketPrices[] = [];
      allMarketPrices.forEach((obj,index)=>{
        if(obj.state  === item.label){
          newData.push(obj);
        }
      })
      // console.log(newData);
      changeCurrentStateMarketPrices(newData);
    }    
  }

  const card:ListRenderItem<marketPrices> = ( {item} ) => (
    <View style={{paddingBottom:20}}>
      <TouchableOpacity 
        style={styles.card} 
        onPress={()=>{}}> 
        <Text style={{fontSize:20}}> { item.state } | { item.district } </Text>
        <Text style={{fontSize:20}}> Market: { item.market } </Text>
        <Text style={{fontSize:20}}> Commodity: { item.commodity } </Text>
        <Text style={{fontSize:20}}> Variety: { item.variety } </Text>
        <Text style={{fontSize:20}}> Min Price: { item.min_price } | Max Price: { item.max_price } </Text>
        <Text style={{fontSize:20}}> Modal Price: { item.modal_price } </Text>
      </TouchableOpacity>
    </View>
  )

  return(
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor:'#d2dae2' }}
    >
      <View style={{ flex: 1, marginBottom:10, marginTop:10, alignItems: 'center', justifyContent: 'center' }}>
      
        <DropDownPicker 
          items={allStates}
          disabled={disableDropDown}
          containerStyle={{height:60,paddingBottom:10,width:300}}
          itemStyle={{justifyContent:'flex-start',}}
          dropDownStyle={{height:150}}
          onChangeItem={(item:dropDownItem)=>{
            UpdateStateMarketPrices(item);
          }}
        />
        <FlatList 
          data={currentStateMarketPrices}
          renderItem={card}
          keyExtractor={item => item.id.toString()}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding:20,
    borderWidth:1,
    borderRadius:20,
    width:350,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor:'#3dc1d3'
  }
});

export default MarketPrices;