import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App() {
  const [fonts] =useFonts({
    Inter_900Black
  });

  if(!fonts){
    return null;
  }

  return (
    <>
    <SafeAreaView style={styles.header}>
      <StatusBar/>
      <View style={styles.header_content}>
        <View style={styles.header_left}>
          <AntDesign name="bars" size={24} style={styles.header_symbols} />
          <Text style={styles.header_icon}>
            Reddit
          </Text>
        </View>
        <View style={styles.header_right}>
          <AntDesign name="search1" style={styles.header_symbols} size={24} />
          <AntDesign name="user" style={styles.header_symbols} size={24} />
        </View>
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header:{
    height:60,
    paddingVertical:10,
    paddingHorizontal:8,
    backgroundColor:"black",
    borderWidth:1,
    borderRadius:3,
    borderBottomColor:'grey',
    shadowRadius:3,
    shadowColor:'white',
    shadowOpacity:3
  },
  header_content:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'black',
    paddingVertical:1,
  },

  header_left:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
  },

  header_right:{
    flexDirection:'row',
    alignItems:'center',
    gap:3,
  },

  header_icon:{
    fontFamily:"Inter_900Black",
    fontSize:25,
    color:'#b22222'
  },
  header_symbols:{
    color:'white'
  }
});
