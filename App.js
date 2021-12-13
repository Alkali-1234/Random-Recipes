import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import axios from 'axios';


export default function App() {
  const [generatedRecipe, setGeneratedRecipe] = useState();
  const randInt = Math.floor(Math.random() * 100);

  const generate = ()=>{
    var options = {
      method: 'GET',
      url: 'https://random-recipes.p.rapidapi.com/ai-quotes/' + randInt,
      headers: {
        'x-rapidapi-host': 'random-recipes.p.rapidapi.com',
        'x-rapidapi-key': 'key'
      }
    };
    
    axios.request(options).then(function (response) {
      setGeneratedRecipe(response.data);
    }).catch(function (error) {
      alert(error);
    });  
  }
  
  useEffect(
    generate,
  [])

  const renderItem = ({item})=>{
    return(
      <View style={{marginTop: '10px', borderBottom: 'solid 1px grey'}}>
        <Text>{item}</Text>
      </View>
    )
  }

  const renderItem2 = ({item})=>{
    return(
      <View style={{marginTop: 10, borderBottom: 'solid 1px grey'}}>
        <Text>{item.text}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View style={{alignItems: 'center'}}>
      <View style={styles.container}>
        <View><Text style={styles.title}>Random Recipes</Text></View>
        <View><TouchableOpacity onPress={generate} style={styles.button}><Text style={styles.buttonText}>Generate random recipe</Text></TouchableOpacity></View>
        <View style={{border: '1px grey solid', borderRadius: '2px', padding: 10, marginTop: 30}}>
          <View><Text style={{marginTop:'10px'}}>Generated Recipe:</Text></View>
          <View>
            {
              generatedRecipe?(
                <View>
                  <Text>Name: {generatedRecipe[0].title}</Text>
                  <Image source={{uri:generatedRecipe[0].image}} style={styles.image} />
                  <Text>Ingredients: </Text>
                  <FlatList
                    data={generatedRecipe[0].ingredients}
                    renderItem={renderItem}
                  />

                  <Text style={{borderTop: '3px solid black', marginTop:'30px'}}>Instructions: </Text>
                  <FlatList
                    data={generatedRecipe[0].instructions}
                    renderItem={renderItem2}
                  />
                </View>
              ):(
                <Text>INVALID RESPONSE</Text>
              )
            }
          </View>
        </View>
      </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'black',
    borderTopWidth: '10px',
    maxWidth: '800px'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '50px',
  },
  button: {
    padding: "20px",
    marginTop: "30px",
    borderRadius: "6px",
    backgroundColor: "gray",
  },
  buttonText: {
    fontWeight: '800',
    fontSize: '15px'
  },
  image: {
    width: 500,
    height: 400,
    marginVertical: 15
  }
});
