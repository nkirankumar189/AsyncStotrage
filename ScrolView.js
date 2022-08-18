import React from "react";
import { ScrollView,
  View,Image ,
  StyleSheet,
  Text,
  FlatList
} from "react-native";


const users=[
          {
            id:1,
            name:"kiran"
          },
        
          {
            id:2,
            name:"raju"
          },
          {
            id:3,
            name:"kiran"
          },
          {
            id:3,
            name:"kiran"
          }, {
            id:3,
            name:"kiran"
          }, {
            id:3,
            name:"kiran"
          },
          {
            id:1,
            name:"kiran"
          },
        
          {
            id:2,
            name:"raju"
          },
          {
            id:3,
            name:"kiran"
          },
          {
            id:3,
            name:"kiran"
          }, {
            id:3,
            name:"kiran"
          }, {
            id:3,
            name:"kiran"
          },
]

const SingleItem=({item})=>{

  return(
    
    <View>
    <View style={styles.Image}>
    <Image
     style={styles.tinyLogo}
     source={require("./assets/kohli18.jpg")}
   />
    </View>
   <View>
    <View style={styles.text}>
  <View >
      <Text style={styles.kiran}>{item.name}</Text>
      </View>
                    
       {/* <Paragraph>Active 4 mins Ago..</Paragraph> */}
       <Text style={styles.active}>Active 4 mints Ago</Text>
    </View>
    
    </View>
    <View style={styles.Hello}>
      <Text>Hello</Text>
    </View>
   <View
       style={styles.bar}></View>
    
     </View>
  )

}

  //  const renderItem=()=>{
  //   <SingleItem/>
  //  }

const App=()=>{
  return(
   <ScrollView>
     <View style={styles.container}>
       {/* <SingleItem/> */}
       <FlatList
         data={users}
         renderItem={ SingleItem }
          keyExtractor={(item)=>{item.id}}
       />
       {/* {users.map((user,index)=>(
                 <SingleItem {...users} index={index}/> 
       ))} */}

      
       {/* <View style={styles.Image}>
       <Image
        style={styles.tinyLogo}
        source={require("./assets/kohli18.jpg")}
      />
       </View> */}
      {/* <View>
       <View style={styles.text}>
         <Text style={styles.kiran}>KiranKumar</Text>
         */}
         {/* <Paragraph>Active 4 mins Ago..</Paragraph> */}
         {/* <Text style={styles.active}>Active 4 mints Ago</Text>
       </View> */}
       
       {/* </View>
       <View style={styles.Hello}>
         <Text>Hello</Text>
       </View> */}
       {/* <View
       style={styles.bar}></View> */}
     </View>
   </ScrollView>
  )
}
export default App;

const styles=StyleSheet.create({
  tinyLogo:{
    width: 50,
    height: 50,
    // margin:1, 
    borderRadius: 40,
    
    // padding:10,
 
    
  },

  kiran:{
    fontSize:18,
    fontWeight:'bold'
  },
  active:{
           marginStart:90,
          //  justifyContent:'center'
          flexDirection:'row'
  },
  bar:{
    borderWidth:0.5,
    marginTop:10
    
  },
  Hello:{
    // flexDirection:"row"
    paddingHorizontal:70,
    marginTop:-20
  },
  text:{
    flexDirection:"row",
    justifyContent:"space-between",
    // alignItems:'center'
    marginHorizontal:60,
    paddingHorizontal:10,
    marginTop:-40

  },
  container:{
      //  alignItems:'center',
      //  justifyContent:'center'
      flex:1,
      margin:4
      // padding:1
  },
  Image:{
    marginTop:15,
    // padding:10,
    marginLeft: 8,
    height: 50,
    width: 50,
    borderWidth:1,
    borderRadius: 40,
  }
})



































// import React from 'react';

// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   TextInput,
//   FlatList
// } from 'react-native';
// import { useEffect, useState } from 'react';



// const App = () => {


//   const [search, setSearch] = useState('');
//   const [filteredDataSource, setFilteredDataSource] = useState([]);
//   const [masterDataSource, setMasterDataSource] = useState([]);


//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//       .then((response) => response.json())
//       .then((responseJson) => {
        // console.log(responseJson)
//         setFilteredDataSource(responseJson);
//         setMasterDataSource(responseJson);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);


//   const searchFilterFunction = (text) => {
//     // Check if searched text is not blank
//     if (text) {
//       // Inserted text is not blank
//       // Filter the masterDataSource
//       // Update FilteredDataSource
//       const newData = masterDataSource.filter(
//         function (item) {
//           const itemData = item.title
//             ? item.title.toUpperCase()
//             : ''.toUpperCase();
//           const textData = text.toUpperCase();
//           return itemData.indexOf(textData) > -1;
//         });
//       setFilteredDataSource(newData);
//       setSearch(text);
//     } else {
//       // Inserted text is blank
//       // Update FilteredDataSource with masterDataSource
//       setFilteredDataSource(masterDataSource);
//       setSearch(text);
//     }
//   };

//   const ItemView = ({ item }) => {
//     return (
//       // Flat List Item
//       <Text
//         style={styles.itemStyle}
//         onPress={() => (item)}>
//         {item.id}
//         {'.'}
//         {item.title.toUpperCase()}
//         {/* {item.title} */}
//       </Text>
//     );
//   };

//   const ItemSeparatorView = () => {
//     return (
//       // Flat List Item Separator
//       <View
//         style={{
//           height: 0.5,
//           width: '100%',
//           backgroundColor: '#C8C8C8',
//         }}
//       />
//     );
//   };


//   return (
//     <SafeAreaView style={styles.page} >

//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//       >
//         <View style={styles.container} >
        
//             <Text style={styles.text1}>
//               FlatList with Searchbar using API
//             </Text>
         
//           <TextInput
//             style={styles.textInputStyle}
//             onChangeText={(text) => searchFilterFunction(text)}
//             value={search}
//             // underlineColorAndroid="transparent"
//             placeholder="Search Here"
//           />

//           <FlatList
//             data={filteredDataSource}
//             // keyExtractor={(item, index) => index.toString()}
//             ItemSeparatorComponent={ItemSeparatorView}
//             renderItem={ItemView}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   textInputStyle: {
//     height: 40,
//     borderWidth: 1,
//     paddingLeft: 20,
//     margin: 10,
//     marginTop: 50,
//     borderColor: '#009688',
//     // backgroundColor: '#FFFFFF',
//   },
//   itemStyle: {
//     padding: 10,
//     color:'black'

//   },
//   text1:{
//    textAlign:'center',
//    fontSize:30,
//    color:'black'
 
//   },
//   container:{
//     padding:10,
//     marginTop:10
//   },
//   // page:{
//   //   backgroundColor:"yellow"
//   // }
// });

// export default App;
