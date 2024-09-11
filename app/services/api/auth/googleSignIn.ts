import { GoogleSignin } from "@react-native-google-signin/google-signin"
import BaseConfig from "app/config/config.base"

GoogleSignin.configure({
  webClientId: BaseConfig.googleWebClientId,
})

export default GoogleSignin
