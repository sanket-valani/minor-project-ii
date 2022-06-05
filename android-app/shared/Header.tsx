import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  title: string
}
export const Header: React.FunctionComponent<Props> = ( {title} ) => {
  return(
    <SafeAreaView>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header:{
    width:'100%',
    height: 60,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#0984e3',
  },
  headerText:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  }
});