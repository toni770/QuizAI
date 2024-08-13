import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Icon, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface QuizScreenProps extends AppStackScreenProps<"Quiz"> {}

const dumpData = [
  { Q: "¿En qué año se congela Fry?", A: ["1999", "2000", "2010", "2020"] },
  {
    Q: "¿Cómo se llama el robot mejor amigo de Fry?",
    A: ["Bender", "Flexo", "Calculon", "Roberto"],
  },
  {
    Q: "¿Qué título ostenta el profesor Farnsworth?",
    A: ["Profesor", "Doctor", "Señor", "Capitán"],
  },
  {
    Q: "¿Cuál es el nombre completo de Leela?",
    A: ["Turanga Leela", "Leela Turanga", "Leela Fry", "Leela Wong"],
  },
  {
    Q: "¿Qué planeta es la sede de Planet Express?",
    A: ["Tierra", "Marte", "Omicron Persei 8", "Chapek 9"],
  },
  {
    Q: "¿Quién es el presidente de la Tierra en Futurama?",
    A: ["Richard Nixon", "George Washington", "Abraham Lincoln", "Thomas Jefferson"],
  },
  {
    Q: "¿Cómo se llama el asistente del Capitán Zapp Brannigan?",
    A: ["Kif Kroker", "Hermes Conrad", "Morbo", "Lrrr"],
  },
  {
    Q: "¿Qué tipo de mascota es Nibbler?",
    A: ["Nibloniano", "Terrícola", "Amphibiosano", "Neptuniano"],
  },
  { Q: "¿Qué es Slurm?", A: ["Una bebida", "Un robot", "Una nave espacial", "Un planeta"] },
  {
    Q: "¿Qué equipo de béisbol sigue Fry?",
    A: ["New New York Mets", "New York Yankees", "Boston Red Sox", "Chicago Cubs"],
  },
]
export const QuizScreen: FC<QuizScreenProps> = observer(function QuizScreen() {
  const [current, setCurrent] = useState(0)
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      <Text text={dumpData[current].Q} size="xl" />
      {dumpData[current].A.map((item, index) => {
        return <Button style={$buttons} key={index} text={item} />
      })}

      <Icon
        icon={"caretRight"}
        size={50}
        onPress={() => {
          setCurrent(current + 1)
        }}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $buttons: ViewStyle = {
  marginVertical: 5,
}
