import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native';


const GetAllVerse = () => {
    const db = SQLite.openDatabase('Books.db')
    const [data, setData] = useState([])
    const navigation = useNavigation()


    const deleteVerse = (id) => {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM books_table WHERE id=?", [id],
                (txObj, results) => {
                    // console.log('Results', results.rowsAffected);
                    alert("verse deleted successfully")
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
            <Text style={styles.toptext}>all Books Write</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card} >
                        <Text style={styles.text}>title:{item.title} </Text>
                        <Text style={styles.text1}>Description:{item.descriptions} </Text>
                        <Text style={styles.text1}>Author:{item.author} </Text>
                        <Text style={styles.text1}>Author:{item.author} </Text>
                        <Text style={styles.text1}>cost:{item.cost} </Text>
                        <View style={styles.iconContainer}> 
                            <EvilIcons name="pencil" style={styles.icon} size={24} color="white" onPress={() => navigation.navigate("EditVerse",{id:item.id})} />
                            <AntDesign name="delete" onPress={() => deleteVerse(item.id)} style={styles.icon} size={24} color="white" />
                        </View>
                    </View>
                )} />
        </View>
    )
}

export default GetAllVerse;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    head: {

    },
    card: {
        marginTop: 15,
        marginBottom: 20,
        backgroundColor: "grey",
        width: "100%",
        height: 300,
        // marginHorizontal: 10,
        borderRadius: 15,

    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 12,
        marginTop: 12
    },
    text1: {
        fontSize: 16,
        marginLeft: 12,
        marginTop: 25
    },
    toptext: {
        marginLeft: 120,
        color: "grey",
        fontSize: 20,
        fontWeight: '600'
    },
    icon: {
        left: 300,
        top: 0,
        bottom: 0,
        marginLeft: 15,
    },
    iconContainer: {
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 35

    }

})
