import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Text, Image, FlatList, Dimensions } from "react-native";
import { colors } from "../Style/Colors";
import { getUserDataByName } from "../Tools/User";
import { TextInput } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { header } from "../Style/Header";

export default function Invocador({ navigation }) {

    const [invocador, setInvocador] = useState({});
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

    }, []);

    const handleSearch = async () => {

        try {
            setLoading(true);

            const response = await getUserDataByName(busca);

            setInvocador(response);

            if (response !== undefined) {

                navigation.navigate("Stack", {
                    screen: "InvocadorDetails",
                    params: {
                        invocador: response
                    }

                });
            }
        }
        catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <SafeAreaView style={[styles.container]}>

            <Text style={[header.titulo]}>Invocador</Text>

            <View style={styles.busca}>

                <TextInput
                    style={styles.input}
                    placeholder="Pesquise um invocador"
                    placeholderTextColor={'#727171'}
                    inputStyle={styles.textWhite}
                    value={busca}
                    onChangeText={text => setBusca(text)}
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />
            </View>

            <View style={styles.caixa}>
                {
                    !loading ?
                        <TouchableOpacity onPress={handleSearch} style={styles.button}><Text >Pesquisar</Text></TouchableOpacity>
                        :
                        <ActivityIndicator animating={true} color={colors.white} />
                }
            </View>

            {invocador === undefined ?
                <View style={styles.erro}>
                    <Text style={[styles.erroText, styles.textWhite]}>Invocador não encontrado</Text>
                </View> : null
            }


            <StatusBar style="light" />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 50,
    },
    titulo: {
        fontSize: 30,
        marginBottom: 50,
    },
    seta: {
        width:40,
        height: 40,
        resizeMode: "contain",
        position: "absolute",
        left: 20,
        transform: [{ rotate: '180deg' }]  
    },
    position: {
        position: "absolute",
        left: 0,
    },
    busca: {
        width: "100%",
        paddingHorizontal: 20,
    },
    caixa: {
        marginTop: 20,
    },
    button: {
        backgroundColor: colors.white,
        borderRadius: 4,
        padding: 10,
    },
    input: {},
    erro: {
        marginTop: 20,
        fontSize: 20,
    },
    erroText: {
        fontSize: 20,
    },
    dadosInvocador: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },
    profileIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    textWhite: {
        color: colors.white,
    }
});