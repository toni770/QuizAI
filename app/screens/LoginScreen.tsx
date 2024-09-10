import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { colors, spacing } from "app/theme"
import { useAuth } from "app/services/api/auth/useAuth"

const logo = require("../../assets/images/logo.png")

interface LogInScreenProps extends AppStackScreenProps<"Login"> {}

export const LogInScreen: FC<LogInScreenProps> = observer(function SignInScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { signIn, signUp } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSignIn = () => {
    // Sign In Flow
    signIn({ email, password })
  }

  const onSignUp = () => {
    // Sign Up Flow
    signUp({ email, password })
  }

  const onForgotPassword = () => {
    // Forgot Password Flow
    console.log("Forgot Password Flow")
  }

  return (
    <Screen contentContainerStyle={$root} preset="auto" safeAreaEdges={["top"]}>
      <View style={$container}>
        <View style={$topContainer}>
          <Image style={$logo} source={logo} resizeMode="contain" />
        </View>
        <View style={[$bottomContainer, $bottomContainerInsets]}>
          <View>
            <TextField
              containerStyle={$textField}
              label="Email"
              autoCapitalize="none"
              defaultValue={email}
              onChangeText={setEmail}
            />
            <TextField
              containerStyle={$textField}
              label="Password"
              autoCapitalize="none"
              defaultValue={password}
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>
          <View>
            <Button onPress={onSignIn}>Sign In</Button>
            <Pressable style={$forgotPassword} onPress={onForgotPassword}>
              <Text preset="bold">Forgot Password?</Text>
            </Pressable>
            <Text style={$buttonDivider}>- or -</Text>
            <Button preset="reversed" onPress={onSignUp}>
              Sign Up
            </Button>
          </View>
          <View style={$cap} />
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  minHeight: "100%",
  backgroundColor: colors.palette.neutral100,
}

const $container: ViewStyle = {
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  height: 200,
  justifyContent: "center",
  alignItems: "center",
}

const $bottomContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  paddingBottom: spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $cap: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  height: spacing.xl,
  position: "absolute",
  top: -spacing.xl,
  left: 0,
  right: 0,
}

const $textField: ViewStyle = {
  marginBottom: spacing.md,
}

const $forgotPassword: ViewStyle = {
  marginVertical: spacing.md,
}

const $buttonDivider: TextStyle = {
  textAlign: "center",
  marginVertical: spacing.md,
}

const $logo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}
