import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
// import { useStores } from "app/models"

interface QuizGeneratorScreenProps extends AppStackScreenProps<"QuizGenerator"> {}

const questions = [
  {
    Q: "¿Cuál es el número de serie completo de Bender?",
    A: ["2716057", "00100100", "3370318", "2716055"],
  },
  {
    Q: "¿Cómo se llama el clon del profesor Farnsworth?",
    A: ["Cubert", "Hubert", "Dwight", "Qubert"],
  },
  {
    Q: "¿Qué ingrediente secreto contiene la bebida Slurm?",
    A: [
      "Excremento de un gusano",
      "Veneno alienígena",
      "Sangre de Nibloniano",
      "Extracto de Omicron Persei 8",
    ],
  },
  {
    Q: "¿Cuál es el nombre del planeta natal de Kif Kroker?",
    A: ["Amphibios 9", "Decapod 10", "Omicron Persei 8", "Chapek 9"],
  },
  {
    Q: "¿Cómo se llama el emperador del planeta Trisol?",
    A: ["Emperador Plon", "Emperador Bont", "Emperador Zog", "Emperador Lon"],
  },
  {
    Q: "¿Qué deporte futurista juega Fry en el episodio 'A Leela of Her Own'?",
    A: ["Blernsball", "Holophonor", "Bolos espaciales", "Basketball espacial"],
  },
  {
    Q: "¿Qué criatura marina gigante es adorada como un dios por los Decapodianos?",
    A: [
      "El Ser del Mar",
      "El Cangrejo Enorme",
      "El Gran Calamar",
      "El Monstruo de las Profundidades",
    ],
  },
  {
    Q: "¿Cuál es el eslogan de MomCorp?",
    A: [
      "'Amor maternal en cada producto'",
      "'Nos importa tu bienestar'",
      "'Tu madre te ama'",
      "'Tecnología con corazón'",
    ],
  },
  {
    Q: "¿Cómo se llama la nave espacial de Planet Express?",
    A: ["Planet Express Ship", "Nimbus", "USS Enterprise", "Eagle 5"],
  },
  {
    Q: "¿Cuál es el trabajo de Hermes Conrad en Planet Express?",
    A: ["Burócrata", "Contador", "Ingeniero", "Repartidor"],
  },
]

export const QuizGeneratorScreen: FC<QuizGeneratorScreenProps> = observer(
  function QuizGeneratorScreen(_props) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const { navigation } = _props

    return (
      <Screen style={$root} preset="fixed">
        <Text text="Choose theme..." size="xl" />
        <TextField />
        <Button
          text="Generate"
          onPress={() => {
            navigation.navigate("Quiz", { questions })
          }}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: 20,
}
