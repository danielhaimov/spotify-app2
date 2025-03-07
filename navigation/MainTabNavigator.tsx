import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather, Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"

import HomeScreen from "../screens/HomeScreen"
import SearchScreen from "../screens/SearchScreen"
import LibraryScreen from "../screens/LibraryScreen"
import ProfileScreen from "../screens/ProfileScreen"
import PlayerScreen from "../screens/PlayerScreen"

const Tab = createBottomTabNavigator()

const MainTabNavigator = () => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="search" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Player"
        component={PlayerScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="musical-notes" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="list" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabNavigator

