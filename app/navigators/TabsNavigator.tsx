import React from "react"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors, spacing, typography } from "app/theme"
import { TextStyle, ViewStyle } from "react-native"
import { QuizNavigator, QuizNavigatorParamList } from "./QuizNavigator"
import { Icon } from "app/components"
import * as Screens from "app/screens"

export type TabsNavigatorParamList = {
  QuizNavigator: QuizNavigatorParamList
  Profile: undefined
  Settings: undefined
  FriendList: undefined
}

export type TabScreenProps<T extends keyof TabsNavigatorParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabsNavigatorParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabsNavigatorParamList>()

export const TabsNavigator = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="QuizNavigator"
        component={QuizNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="check" color={focused ? colors.tint : undefined} size={30} />
          ),
          tabBarLabel: "Quiz",
        }}
      />

      <Tab.Screen
        name="FriendList"
        component={Screens.FriendListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="lock" color={focused ? colors.tint : undefined} size={30} />
          ),
          tabBarLabel: "Friends",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Screens.ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="view" color={focused ? colors.tint : undefined} size={30} />
          ),
          tabBarLabel: "Profile",
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Screens.SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="settings" color={focused ? colors.tint : undefined} size={30} />
          ),
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
