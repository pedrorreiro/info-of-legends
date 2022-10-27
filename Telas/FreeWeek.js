import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Text, Image, FlatList, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { colors } from "../Style/Colors";
import { getFreeWeek } from "../Tools/Champions";
import { ActivityIndicator } from "react-native-paper";

export default function Freweek({ route, navigation }) {

    const [champions, setChampions] = useState([]);

    useEffect(() => {
        getFreeWeek().then((champions) => {
            setChampions(champions);
        });
    }, []);

    const goBack = () => {
        navigation.navigate("Menu");
    }

    return (
        <SafeAreaView style={styles.container}>

            <Text style={[styles.titulo, styles.textWhite]}>Rotação Semanal Grátis</Text>


            {
                champions.length === 0 ?
                    <ActivityIndicator animating={true} color={colors.white} />
                    : null
            }

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