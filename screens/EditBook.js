import React, { useState, useEffect } from "react";
import { Text, View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import * as SQLite from 'expo-sqlite'

const EditBook = ({ route, navigation }) => {
    const db = SQLite.openDatabase('Books.db')
    const [title, setTitle] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [author, setAuthor] = useState('')
    const [cost, setCost] = useState("")
    const [currentBook, setCurrentBook] = useState([])

    // console.log(currentVerse);
    const id = route.params.id
    // console.log(id);

    useEffect(() => {
        const getSingleBook = () => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        `SELECT * FROM books_table WHERE id =${id}`,
                        
                        (_, { rows }) => {
                            // console.log(JSON.stringify(rows._array));
                            setCurrentBook(rows._array)
                        },
                        (txObj, error) => console.log('Error ', error)
                    );
                }
            );
        }
        getSingleBook()
    }, [])




    const editBook = () => {
        db.transaction((tx) =>{
            tx.executeSql(
                `UPDATE books_table  SET title=?,descriptions=?,author=?,cost=? WHERE id=?`,
                [title, descriptions, author,cost ,id],
                (tx, results) =>{
                    console.log(results);
                    if(results.rowsAffected >0){
                        alert('Books Updated Successfully...')
                        navigation.navigate("AllBook")
                    }else{
                        alert("Error")
                    }
                }
            )
            navigation.navigate("AllBook")
        })
    }
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
            >Book
            </Text>
          {currentBook &&  
            <View style={styles.userRequest} key={currentBook[0]?.id}>
                <TextInput
                    onChangeText={(value) => setTitle(value)}
                    style={styles.requestText}
                    placeholder="Tittle"
                    value={title}
                    defaultValue={currentBook[0]?.title}
                />
                <TextInput
                    onChangeText={(value) => setDescriptions(value)}
                    style={styles.requestText}
                    placeholder="Descriptions"
                    multiline
                    value={descriptions}
                    defaultValue={currentBook[0]?.descriptions}
                />
                <TextInput
                    onChangeText={(value) => setAuthor(value)}
                    style={styles.requestText}
                    placeholder="Author"
                    value={author}
                    defaultValue={currentBook[0]?.author}
                />
                 <TextInput
                    onChangeText={(value) => setCost(value)}
                    style={styles.requestText}
                    placeholder="cost"
                    value={cost}
                    defaultValue={currentBook[0]?.cost}
                />
                <TouchableOpacity
                    onPress={() => editBook()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        }
        </View>
    )
}

export default EditBook

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0D0D28",
        width: "100%",
        height: "100%"
    },
    userRequest: {
        marginVertical: 40,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15,
        marginHorizontal: 10,
        width: Dimensions.get('screen').width - 20,
    },
    requestText: {
        width: "70%",
        height: 40,
        margin: 20,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#0D0D28",
        borderColor: "#0D0D28",
        backgroundColor: "white",
        color: "grey",
        fontWeight: "normal",
        paddingLeft: 10,
        fontSize: 16,
    },
    button: {
        width: "50%",
        height: 30,
        margin: 20,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#0D0D28",
        alignItems: 'center',
   
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    text: {
        color: "white",
        textAlign: "center",
        marginTop: 60,
        fontWeight: "bold",
        fontSize: 30,
    },
    selectPicker: {
        width: 100,
        height: 50
    },
    optionTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
    },
    item: {
        padding: 12
    }
})
