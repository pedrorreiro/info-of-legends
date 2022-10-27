import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Menu from '../../Telas/Menu';
import MyStack from '../Stack/MyStack';
import { colors } from '../../Style/Colors';
import Invocador from '../../Telas/Invocador';
import ChampionsList from '../../Telas/ChampList';
import Champions from "../../Telas/ChampionsTags";
import Freweek from '../../Telas/FreeWeek';
import Info from '../../Telas/Info';

export default function MyTab() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName='Menu'
            screenOptions={{
                tabBarActiveTintColor: colors.yellow,
                tabBarInactiveTintColor: '#000',
                tabBarActiveBackgroundColor: colors.primary,
                tabBarStyle: {
                    backgroundColor: colors.primary,
                    paddingTop: 20,
                    borderTopWidth: 0,
                },
                unmountOnBlur: true,

            }}
        >
            <Tab.Screen name="Stack" component={MyStack}
                options={{
                    title: '',
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarButton: () => null,
                }} />

            <Tab.Screen name="Invocador" component={Invocador}
                options={{
                    title: '',
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../../assets/icons/searchSelected.png')
                                    : require('../../assets/icons/search.png')
                            }
                            style={{
                                width: size,
                                height: size,

                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen name="Menu" component={Menu}
                options={{
                    title: '',
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../../assets/icons/homeSelected.png')
                                    : require('../../assets/icons/home.png')
                            }
                            style={{
                                width: size,
                                height: size,

                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen name="Champions" component={Champions}
                options={{
                    title: '',
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../../assets/icons/championsSelected.png')
                                    : require('../../assets/icons/champions.png')
                            }
                            style={{
                                width: size,
                                height: size,

                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen name="Info" component={Info}
                options={{
                    title: '',
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../../assets/icons/championsSelected.png')
                                    : require('../../assets/icons/champions.png')
                            }
                            style={{
                                width: size,
                                height: size,

                            }}
                        />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

