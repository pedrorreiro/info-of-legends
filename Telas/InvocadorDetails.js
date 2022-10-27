import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Text, Image, FlatList, Dimensions } from "react-native";
import { colors } from "../Style/Colors";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Invocador({ route, navigation }) {

    const invocador = route.params.invocador;

    useEffect(() => {

    }, []);

    return (
        <SafeAreaView style={[styles.container]}>

            <ScrollView
                contentContainerStyle={styles.widthCem}
            >

                <View style={[styles.dadosInvocador]}>
                    <Image style={styles.profileIcon} source={{ uri: invocador.profileIconImg }} />
                    <Text style={[styles.level]}>Nível {invocador.summonerLevel}</Text>

                    <Text style={[styles.nome, styles.titulo, styles.textWhite]}>{invocador.name}</Text>

                </View>

                <TouchableOpacity
                    onPress={() => navigation.push("Historico", {
                        invocador: invocador,
                    })}
                    style={styles.historico}
                >
                    <Text style={[styles.titulo, styles.textWhite]}>Ver histórico de partidas</Text>


                </TouchableOpacity>

                <View>
                    <Text style={styles.textWhite}>...</Text>
                </View>

            </ScrollView>


            <StatusBar style="light" />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: colors.primary,
    },
    widthCem: {
        alignItems: "center",
        

    },
    busca: {
        width: "100%",
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 22,
    },
    nome: {
        fontWeight: "bold",
    },
    dadosInvocador: {
        width: "100%",
        alignItems: "center",
        marginTop: 70,
    },
    profileIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    level: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: "bold",
        borderWidth: 1,
        backgroundColor: colors.white,
        color: colors.black,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
    historico: {

        width: "100%",
       
        alignItems: "center",
        marginVertical: 50,

    },
    textWhite: {
        color: colors.white,
    },

    textBlack: {
        color: colors.black,
    }
});