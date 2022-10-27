import { useState, useEffect, } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Text, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { colors } from "../Style/Colors";
import { getAllChampions } from "../Tools/Champions";
import { mapTags } from "../Tools/Champions";
import { ActivityIndicator } from "react-native-paper";

export default function Champions({ navigation }) {

    const [champions, setChampions] = useState([]);
    const [tags, setTags] = useState([]);
    const [version, setVersion] = useState("");

    useEffect(() => {

        getAllChampions().then(response => {

            setChampions(response.champions);
            setTags(response.tags);

        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            <Text style={[styles.titulo, styles.textWhite]}>Campeões</Text>

            <ScrollView style={styles.tagList}>


                {
                    champions.length === 0 ?
                        <ActivityIndicator animating={true} color={colors.white} />
                        : null
                }

                {
                    tags.map((tag, index) => {
                        return (
                            <TouchableOpacity style={styles.tag} key={index}
                                onPress={() => {
                                    navigation.navigate("Stack", {
                                        screen: "ChampList",
                                        params: {
                                            tag: tag,
                                            champs: champions
                                        }
                                    });
                                }}
                            >
                                <Text style={styles.textWhite}>{mapTags[tag]}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </ScrollView>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.primary,
    },
    titulo: {
        width: "100%",
        textAlign: "center",
        fontSize: 20,
        marginTop: 50,
        marginBottom: 40,
    },
    championsList: {
        width: "100%",
    },
    tagList: {
        width: "100%",
        flexDirection: "column",
    },
    tag: {
        width: "100%",
        alignItems: "center",
        backgroundColor: colors.secondary,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 25,
    },
    champion: {
        alignItems: "center",
        marginBottom: 20,
        marginRight: 10,
    },
    championImage: {
        width: Dimensions.get("window").width / 3 - 10,
        height: 100,
    },
    menu: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: colors.secondary,
    },
    menuItem: {
        paddingVertical: 30,
        marginBottom: 10,
    },
    textWhite: {
        color: colors.white,
        fontFamily: "ReadexPro",
    }
});