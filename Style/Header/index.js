import { colors } from "../Colors"

export const header = {
    pai: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 50,
    },
    touchable: {
        position: "absolute",
        left: 0,
    },
    titulo: {
        fontSize: 24,
        marginTop: 50,
        marginBottom: 50,
        color: colors.white,
    },
    seta: {
        width:35,
        height: 40,
        resizeMode: "contain",
        position: "absolute",
        left: 25,
        transform: [{ rotate: '180deg' }]  
    },
}