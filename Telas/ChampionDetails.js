import { useState, useEffect, } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Text, Image } from "react-native";
import { colors } from "../Style/Colors";
import { getChampInfo } from "../Tools/Champions";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native-paper";

export default function Champions({ route, navigation }) {

    const [champion, setChampion] = useState({});
    const [version, setVersion] = useState("");
    const [passivaImg, setPassivaImg] = useState({});

    const c = route.params.champion;

    async function getChamp() {
        const champ = await getChampInfo(c.id);
        setChampion(champ);
        // console.log(champ)
    }

    useEffect(() => {
        getChamp();
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            {
                Object.keys(champion).length !== 0 ?
                    <ScrollView
                        contentContainerStyle={styles.championDetails}
                    >

                        <Text style={[styles.titulo, styles.textWhite]}>{champion.name}</Text>

                        <Image style={styles.img} source={{ uri: champion.img }} />

                        <Text style={[styles.title, styles.textWhite]}>{champion.title}</Text>

                        <Text style={[styles.titulo2, styles.textWhite]}>História</Text>

                        <Text style={[styles.historia, styles.textWhite]}>{champion.lore}</Text>

                        <Text style={[styles.titulo2, styles.textWhite]}>Habilidades</Text>

                        <View style={styles.habilidades}>

                            {
                                champion.passive && passivaImg ?
                                    <View style={styles.habilidade}>

                                        <Text style={[styles.habilidadeTitulo, styles.textWhite]}>{champion.passive.name}</Text>
                                        <Image style={styles.habilidadeImg} source={{ uri: champion.passive.image.full }} />
                                        <Text style={[styles.habilidadeDescricao, styles.textWhite]}>{champion.passive.description}</Text>
                                    </View>
                                    : null
                            }


                            {
                                champion.spells ?
                                    champion.spells.map((spell, index) => {

                                        return (
                                            <View key={index} style={styles.habilidade}>
                                                <Text style={styles.textWhite}>{spell.name}</Text>
                                                <Image style={styles.habilidadeImg} source={{ uri: spell.image.full }} />
                                                <Text style={[styles.textJustify, styles.textWhite]}>{spell.description}</Text>

                                                <Text style={[styles.cooldown, styles.textWhite]}>Tempo de recarga: {spell.cooldownBurn}</Text>
                                            </View>
                                        );
                                    }) : null
                            }
                        </View>



                        <View style={[styles.tips]}>

                            {
                                champion.allytips?.length > 0 ?
                                    <View>

                                        <Text style={[styles.historia, styles.textGreen]}>Dicas para jogar com {champion.name} no seu time</Text>

                                        {
                                            champion.allytips.map((tip, index) => {
                                                return (
                                                    <Text style={[styles.allyTips, styles.historia, styles.textWhite]} key={index}>{tip}</Text>
                                                )
                                            })

                                        }
                                    </View>
                                    : null
                            }

                        </View>

                        <View style={[styles.tips]}>

                            {
                                champion.enemytips?.length > 0 ?
                                    <View>

                                        <Text style={[styles.historia, styles.textRed]}>Dicas para jogar com {champion.name} no time adversário</Text>

                                        {
                                            champion.enemytips.map((tip, index) => {
                                                return (
                                                    <Text style={[styles.enemyTips, styles.historia, styles.textWhite]} key={index}>{tip}</Text>
                                                )
                                            })

                                        }
                                    </View>
                                    : null
                            }

                        </View>

                    </ScrollView>
                    : <ActivityIndicator animating={true} color={colors.white} />
            }
            <StatusBar style="light" />

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    teste: {
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "transparent"
    },
    AndroidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.primary,
    },
    titulo: {
        fontSize: 30,
        marginTop: 50,
        marginBottom: 30,
    },
    titulo2: {
        fontSize: 20,
        marginTop: 30,
    },
    championDetails: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    img: {
        width: 120,
        height: 120,
    },
    title: {
        fontSize: 14,
        marginTop: 10,
    },
    historia: {
        fontSize: 16,
        marginTop: 20,
        textAlign: "justify",
    },
    habilidades: {

    },
    habilidade: {
        marginTop: 20,
        flexDirection: "column",
        alignItems: "center",
        padding: 25,
        borderRadius: 10,
        backgroundColor: colors.secondary,
    },
    habilidadeImg: {
        width: 50,
        height: 50,
        marginVertical: 15,
    },
    cooldown: {
        fontSize: 12,
        marginTop: 20,
        fontWeight: "bold",
    },
    tips: {
        marginTop: 10,
    },
    allyTips: {
        backgroundColor: colors.darkGreen,
        padding: 15,
        borderRadius: 20,
        overflow: "hidden",

    },
    enemyTips: {
        backgroundColor: colors.red,
        padding: 15,
        borderRadius: 20,
        overflow: "hidden",
    },
    textJustify: {
        textAlign: "justify",
    },
    textWhite: {
        color: colors.white,
    },
    textGreen: {
        color: colors.green,
    },
    textRed: {
        color: colors.red,
    }
});