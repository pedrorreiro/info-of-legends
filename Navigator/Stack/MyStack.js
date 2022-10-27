import { createStackNavigator } from "@react-navigation/stack";
import ChampList from "../../Telas/ChampList";
import Champions from "../../Telas/ChampionsTags";
import Historico from "../../Telas/Historico";
import ChampionDetails from "../../Telas/ChampionDetails";
import InvocadorDetails from "../../Telas/InvocadorDetails";
import Freweek from "../../Telas/FreeWeek";
import Invocador from "../../Telas/Invocador";
import { Text } from "react-native";
import { colors } from "../../Style/Colors";

export default function MyStack() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Invocador" component={Invocador}
                options={{
                    title: '',
                    headerShown: false,
                }}
            />

            <Stack.Screen name="InvocadorDetails" component={InvocadorDetails}
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                        borderBottomWidth: 0,
                    }
                }}
            />

            <Stack.Screen name="Historico" component={Historico}
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                        borderBottomWidth: 0,
                    }
                }}
            />

            <Stack.Screen name="Champions" component={Champions}
                options={{
                    title: '',
                    headerShown: false,
                }}
            />

            <Stack.Screen name="ChampList" component={ChampList}
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                        borderBottomWidth: 0,
                    }
                }}
            />

            <Stack.Screen name="ChampionDetails" component={ChampionDetails}
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                        borderBottomWidth: 0,
                    }
                }}
            />

            <Stack.Screen name="FreeWeek" component={Freweek}
                options={{
                    title: '',
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )
}