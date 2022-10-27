import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, SafeAreaView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { getUserDataByName } from '../Tools/User';
import { colors } from '../Style/Colors';

export default function Menu({ navigation }) {

  const menuOptions = {
    "Rotação Semanal Grátis": {
      screen: "FreeWeek",
      img: require("../assets/icons/freeweek.png"),
      color: "#464234"
    },
    "Procurar Invocador": {
      screen: "Invocador",
      img: require("../assets/icons/search.png"),
      color: "#472e2e"
    },
    "Lista de Campeões": {
      screen: "Champions",
      img: require("../assets/icons/freeweek.png"),
      color: "#2f3144"
    },

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.titulo, styles.textWhite]}>Menu</Text>
      <Text style={[styles.smallText, styles.textWhite]}>App - Versão 1.0</Text>

      <View style={styles.menu}>

        <FlatList
          contentContainerStyle={styles.menuList}
          data={Object.keys(menuOptions)}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {

            const img = menuOptions[item].img;

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Stack", {
                    screen: menuOptions[item].screen
                  });
                }}
                key={item} style={styles.menuOption}>
                <View style={[{
                  backgroundColor: menuOptions[item].color,
                },styles.fundoImg]}>
                  <Image style={styles.optionImg} source={img} />
                </View>

                <Text style={styles.textWhite}>{item}</Text>
              </TouchableOpacity>
            )
          }}
          numColumns={2}
        >

        </FlatList>


      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.primary,
  },
  titulo: {
    fontSize: 30,
    marginTop: 50,
    marginBottom: 20,
  },
  smallText: {
    fontSize: 12,
    marginBottom: 30,
  },
  menu: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  menuList: {
    width: "100%",
  },
  menuOption: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 15,
    margin: 10,
    width: Dimensions.get("window").width / 3,

  },
  fundoImg: {
    width: '100%',
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 15,
    borderRadius: 15,
  },
  optionImg: {
    width: 50,
    height: 50,
  },
  menuItem: {
    padding: 30,
    paddingBottom: 0,
  },
  textWhite: {
    color: colors.white,
    fontFamily: "ReadexPro",
    textAlign: "center",
  }
});
