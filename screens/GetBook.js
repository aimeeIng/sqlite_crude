import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native';


const GetBook = () => {
    const db = SQLite.openDatabase('Books.db')
    const [data, setData] = useState([])
    const navigation = useNavigation()


    const deleteVerse = (id) => {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM books_table WHERE id=?", [id],
                (txObj, results) => {
                    // console.log('Results', results.rowsAffected);
                    alert("the book has been deleted successfully")
                    // navigation.navigate("CreateVerse")
                }
            )
        })
    }

    useEffect(() => {
        db.transaction(
            tx => {
                tx.executeSql(
                    "select * from books_table",
                    [],
                    (_, { rows }) => {
                        // console.log(JSON.stringify(rows._array));
                        setData(rows._array)
                    },
                    (txObj, error) => console.log('Error ', error)

                );
            }
        );
    }, [deleteVerse])


    return (
        <View style={styles.container}>
            <Text style={styles.toptext}>Books information</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card} >
                        <Text style={styles.text}>title:{item.title} </Text>
                        <Text style={styles.text1}>Description:{item.descriptions} </Text>
                        <Text style={styles.text1}>Author:{item.author} </Text>
                        <Text style={styles.text1}>cost:{item.cost} </Text>
                        <View style={styles.iconContainer}> 
                            <EvilIcons name="pencil" style={styles.icon} size={24} color="white" onPress={() => navigation.navigate("EditBook",{id:item.id})} />
                            <AntDesign name="delete" onPress={() => deleteVerse(item.id)} style={styles.icon} size={24} color="white" />
                        </View>
                    </View>
                )} />
        </View>
    )
}

export default GetBook;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    head: {

    },
    card: {
        marginTop: 15,
        marginBottom: 20,
        backgroundColor: "#0D0D28",
        width: "95%",
        height: 300,
        marginHorizontal: 10,
        borderRadius: 5,

    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 12,
        marginTop: 12
    },
    text1: {
        color: "white",
        fontSize: 16,
        marginLeft: 12,
        marginTop: 25
    },
    toptext: {
        marginLeft: 120,
        color: "black",
        fontSize: 20,
        fontWeight: '600'
    },
    icon: {
        left: 270,
        top: -200,
        bottom: 0,
        marginLeft: 15,
    },
    iconContainer: {
        flexDirection: "row",
        marginLeft: 5,
        marginTop: 35

    }

})
