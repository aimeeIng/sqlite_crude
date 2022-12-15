import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Dimensions, TouchableOpacity ,ScrollView} from "react-native";
import * as SQLite from 'expo-sqlite'
import { useNavigation } from "@react-navigation/native";


const CreateVerse = () => {
    const db = SQLite.openDatabase('Books.db')
    const [title, setTitle] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [author, setAuthor] = useState('')
    const [cost, setCost] = useState("")
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
                    placeholder="Descriptions"
                    multiline
                    value={descriptions}
                />
                   <TextInput
                    onChangeText={(value) => setAuthor(value)}
                    style={styles.requestText}
                    placeholder="author"
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
                    onPress={() => navigation.navigate("AllVerse")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default CreateVerse


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8cd98c",
        width: "100%",
        height: "100%"
    },
    userRequest: {
        marginVertical: 100,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#339933",
        borderRadius: 23,
        marginHorizontal: 10,
        width: Dimensions.get('screen').width - 20,
    },
    requestText: {
        width: "60%",
        height: 40,
        margin: 20,
        borderRadius: 15,
        backgroundColor: "white",
        color: "black",
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    button: {
        width: "60%",
        height: 30,
        margin: 20,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: "#66cc66"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    text: {
        color: "white",
        textAlign: "center",
        marginTop: 100,
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
