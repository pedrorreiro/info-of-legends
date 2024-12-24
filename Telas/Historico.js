import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getPartidas } from "../Tools/Partidas";
import { colors } from "../Style/Colors";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native-paper";

export default function Historico({ route, navigation }) {
  const [partidas, setPartidas] = useState([]);
  const invocador = route.params.invocador;

  useEffect(() => {
    getPartidas(invocador.puuid).then((partidas) => {
      setPartidas(partidas);
    });
  }, []);

  return (
    <SafeAreaView style={[styles.AndroidSafeArea, styles.container]}>
      {/* {partidas.length > 0 ? (
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    style={styles.voltar}
                >
                    <Text style={[styles.botao, styles.textWhite]}>Voltar</Text>


                </TouchableOpacity>
            ) : null} */}

      <ScrollView contentContainerStyle={styles.scrollView}>
        {partidas.length > 0 ? (
          partidas.map((partida) => {
            const styleWin = partida.me.win ? styles.win : styles.lose;

            return (
              <View style={[styleWin, styles.partida]} key={partida.gameId}>
                <View>
                  <Text style={[styles.gamemode, styles.textWhite]}>
                    {partida.gameMode}
                  </Text>
                  <Text
                    style={[styles.textWhite, styles.frag]}
                  >{`${partida.me.kills}/${partida.me.deaths}/${partida.me.assists}`}</Text>
                </View>

                <View>
                  <Image
                    style={styles.championImg}
                    source={{ uri: partida.me.championImg }}
                  />
                </View>

                <View style={[styles.spells]}>
                  {partida.me.spells.map((s, index) => {
                    return (
                      <Image
                        style={styles.spellImg}
                        key={index}
                        source={{ uri: s }}
                      />
                    );
                  })}
                </View>

                <View style={[styles.othersView]}>
                  <Text
                    style={[styles.textWhite, styles.other]}
                  >{`Nível: ${partida.me.champLevel}`}</Text>
                  <Text
                    style={[styles.textWhite, styles.other]}
                  >{`Farm: ${partida.me.totalMinionsKilled}`}</Text>
                </View>

                <View style={[styles.buildView]}>
                  <View style={[styles.buildLinha]}>
                    {partida.me.build.map((item, index) => {
                      if (index < 3) {
                        if (item.endsWith("/0.png")) {
                          return (
                            <Image
                              style={styles.itemVazio}
                              key={index}
                              source={{ uri: item }}
                            />
                          );
                        }

                        return (
                          <Image
                            style={styles.buildItem}
                            key={index}
                            source={{ uri: item }}
                          />
                        );
                      }
                    })}
                  </View>

                  <View style={[styles.buildLinha]}>
                    {partida.me.build.map((item, index) => {
                      if (index >= 3 && index < 6) {
                        if (item.endsWith("/0.png")) {
                          return (
                            <Image
                              style={styles.itemVazio}
                              key={index}
                              source={{ uri: item }}
                            />
                          );
                        }
                        return (
                          <Image
                            style={styles.buildItem}
                            key={index}
                            source={{ uri: item }}
                          />
                        );
                      }
                    })}
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <ActivityIndicator animating={true} color={colors.white} />
        )}
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    justifyContent: "center",
  },
  botao: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white,
    marginBottom: 15,
  },
  loading: {
    margin: "auto",
    fontSize: 20,
  },
  partida: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  win: {
    backgroundColor: colors.darkGreen,
  },
  lose: {
    backgroundColor: colors.red,
  },
  gamemode: {
    marginRight: 10,
    fontSize: 12,
  },
  championImg: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  spellImg: {
    width: 25,
    height: 25,
    marginBottom: 5,
    borderRadius: 50,
  },
  spells: {
    marginLeft: 10,
  },
  othersView: {
    marginLeft: 10,
    height: "100%",
  },
  fragView: {
    height: "100%",
  },
  frag: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 12,
  },
  other: {
    fontWeight: "bold",
    fontSize: 14,
  },
  buildView: {
    flexDirection: "column",
    marginLeft: 10,
  },
  buildLinha: {
    flexDirection: "row",
  },
  buildItem: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  itemVazio: {
    width: 29,
    height: 29,
    backgroundColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.white,
    opacity: 0.5,
  },
  textWhite: {
    color: colors.white,
  },
});
