import { View, Text, StyleSheet } from "react-native"
import { colors } from "../Style/Colors";

export default function Info(){
    return(
        <View style={styles.container}>
            <Text style={[styles.titulo, styles.textWhite]}>Últimas Atualizações</Text>

            <View>
                <Text style={styles.textWhite}>1.1.0 - Design do aplicativo reformado.</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
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
    textWhite: {
        color: colors.white,
    },
});