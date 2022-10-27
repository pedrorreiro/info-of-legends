import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, ScrollView, SafeAreaView, View, Text, Image, FlatList, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { colors } from "../Style/Colors";
import { mapTags } from "../Tools/Champions";

export default function ChampListTag({ route, navigation }) {

    const tag = route.params.tag;
    const champs = route.params.champs;

    const [champions, setChampions] = useState([]);

    useFocusEffect(
        React.useCallback(() => {

            const c = [];

            Object.keys(champs).forEach((item) => {
                c.push(champs[item]);
            });

            setChampions(c.filter(champ => champ.tags.includes(tag)));
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>

            <Text style={[styles.titulo, styles.textWhite]}>{mapTags[tag]}</Text>

            <FlatList
                contentContainerStyle={styles.championsList}
                data={Object.keys(champions)}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Stack",
                                {
                                    screen: "ChampionDetails",
                                    params: {
                                        champion: champions[item]
                                    }
                                }
                            );
                        }}
                        key={item} style={styles.champion}>
                        <Image style={styles.championImage} source={{ uri: champions[item].img }} />
                        <Text style={styles.textWhite}>{champions[item].name}</Text>
                    </TouchableOpacity>
                )}
                numColumns={2}
            >

            </FlatList>

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
        fontSize: 20,
        marginTop: 50,
        marginBottom: 50,
    },
    championsList: {
        width: "100%",
    },
    champion: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.secondary,
        padding: 15,
        borderRadius: 15,
        margin: 10,
    },
    championImage: {
        width: Dimensions.get("window").width / 3 - 10,
        height: 120,
        marginBottom: 10,
        borderRadius: 15,
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