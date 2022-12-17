import React, { useState } from "react";
import {TouchableOpacity, Text, TextInput, StyleSheet, View, Dimensions ,ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from 'expo-sqlite'


const CreateBook = () => {
    const db = SQLite.openDatabase('Books.db')
    const [descriptions, setDescriptions] = useState('')
    const [author, setAuthor] = useState('')
    const [cost, setCost] = useState("")
    const [title, setTitle] = useState('')
    const navigation = useNavigation()

    const create = () => {

        if (title == '' || descriptions == '' || author == '' || cost == '') {
            alert('Please Enter All the Values');
        } else {

            db.transaction(tx => {
                tx.executeSql(
                    "CREATE TABLE if not exists books_table(id INTEGER PRIMARY KEY,title TEXT,descriptions TEXT, author TEXT,cost TEXT );",
                );

                tx.executeSql(
                    'INSERT INTO books_table(title,descriptions,author,cost) values (?,?,?,?)', [title, descriptions, author,cost],
                    (textObj, result) => (
                        console.log(result)
                    )
                    , (textObj, error) => (
                        console.log("error", error)
                    )
                )
            })
        }
    }
    return (
        <ScrollView style={styles.container}>
            <Text
                style={styles.text}
            >Book
            </Text>
            <View style={styles.userRequest}>
                <TextInput
                    onChangeText={(value) => setTitle(value)}
                    style={styles.requestText}
                    placeholder="Tittle"
                    value={title}
                />
                <TextInput
                    onChangeText={(value) => setDescriptions(value)}
                    style={styles.requestText}
                    placeholder="Description"
                    multiline
                    value={descriptions}
                />
                   <TextInput
                    onChangeText={(value) => setAuthor(value)}
                    style={styles.requestText}
                    placeholder="Author Name"
                    value={author}
                />
                <TextInput
                    onChangeText={(value) => setCost(value)}
                    style={styles.requestText}
                    placeholder="cost"
                    value={cost}
                />
                <TouchableOpacity
                    onPress={() => create()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AllBook")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default CreateBook


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
