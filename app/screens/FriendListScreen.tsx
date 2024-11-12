import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, Modal, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { FriendsStackScreenProps } from "app/navigators"
import { Button, Icon, ListView, Screen, Text, TextField } from "app/components"
import { dbApi } from "app/services/api/supabase/db/supabaseDBApi"
import { useAuth } from "app/services/api/supabase/auth/useAuth"
import { TouchableOpacity } from "react-native-gesture-handler"
import { FriendList, FriendRequest } from "app/services/api"

interface FriendListScreenProps extends FriendsStackScreenProps<"FriendList"> {}

export const FriendListScreen: FC<FriendListScreenProps> = observer(function FriendListScreen(
  _props: FriendListScreenProps,
) {
  const { user } = useAuth()
  const [friendListData, setFriendListData] = useState<FriendList | undefined>(undefined)
  const [requestListData, setRequestListData] = useState<FriendRequest[] | undefined>(undefined)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [friendNameToAdd, setFriendNameToAdd] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const friendListResult = await dbApi.getFriendList(user?.id)

        if (friendListResult.friendList) {
          setFriendListData(friendListResult.friendList)
        } else if (friendListResult.error) {
          console.log(friendListResult.error)
        }

        const friendRequestResult = await dbApi.getFriendRequest(user?.id)

        if (friendRequestResult.friendRequest) {
          setRequestListData(friendRequestResult.friendRequest)
        } else if (friendRequestResult.error) {
          console.log(friendRequestResult.error)
        }
      }
    }

    fetchData()
  }, [])

  const deleteFriend = async function (friendId: string) {
    if (user) {
      const response = await dbApi.deleteFriend(user?.id, friendId)
      if (response.error) {
        console.log(response.error)
      }
    }
  }

  const acceptFriendRequest = async function (friendId: string) {
    if (user) {
      const response = await dbApi.acceptFriendRequest(user.id, friendId)
      if (response.error) {
        console.log(response.error)
      }
    }
  }

  const cancelFriendRequest = async function (requestId: string) {
    if (user) {
      const response = await dbApi.cancelFriendRequest(requestId)
      if (response.error) {
        console.log(response.error)
      }
    }
  }

  const sendFriendRequest = async function (friendName: string) {
    if (user) {
      const response = await dbApi.sendFriendRequest(user.id, friendName)
      if (response.error) {
        console.log(response.error)
      }
    }
  }

  const closeModal = function () {
    setModalVisible(false)
    setFriendNameToAdd("")
  }

  return (
    <Screen style={$root} preset="fixed">
      <View style={$listViewContainer}>
        <Icon icon={"menu"} size={30} onPress={() => setModalVisible(true)} />
        <Text preset="subheading" text="Friends" />
        {friendListData ? (
          <ListView
            data={friendListData}
            renderItem={({ item }) => {
              return (
                <View style={$row}>
                  <TouchableOpacity
                    onPress={() =>
                      _props.navigation.navigate("FriendProfile", {
                        uid: item.friend_id,
                      })
                    }
                  >
                    <View style={$friendItem}>
                      <Text>{item.profile.nickname}</Text>
                    </View>
                  </TouchableOpacity>
                  <Icon
                    icon={"x"}
                    onPress={() => {
                      deleteFriend(item.friend_id)
                    }}
                    size={50}
                  />
                </View>
              )
            }}
            estimatedItemSize={200}
          />
        ) : (
          <Text text="No data found" />
        )}

        <Text preset="subheading" text="Requests" />
        {requestListData ? (
          <ListView
            data={requestListData}
            renderItem={({ item }) => {
              return (
                <View style={$requestItem}>
                  <Text>{item.profile.nickname}</Text>
                  <Icon icon={"check"} onPress={() => acceptFriendRequest(item.sender_id)} />
                  <Icon icon={"x"} onPress={() => cancelFriendRequest(item.id)} />
                </View>
              )
            }}
            estimatedItemSize={200}
          />
        ) : (
          <Text text="No data found" />
        )}
      </View>
      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={$modalBackground}>
            {/* Área interna del modal */}
            <TouchableWithoutFeedback>
              <View style={$modalContent}>
                <Text text="Invite friend" size="xl" />
                <TextField
                  value={friendNameToAdd}
                  onChangeText={(value) => setFriendNameToAdd(value)}
                />
                <Button
                  text="Invite"
                  onPress={() => {
                    sendFriendRequest(friendNameToAdd)
                    closeModal()
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $listViewContainer: ViewStyle = {
  flex: 1,
  width: Dimensions.get("screen").width,
  marginTop: 20,
}

const $friendItem: ViewStyle = {
  borderWidth: 2,
  padding: 10,
  paddingHorizontal: 150,
}

const $row: ViewStyle = { flexDirection: "row" }

const $requestItem: ViewStyle = {
  borderWidth: 2,
  padding: 10,
  paddingHorizontal: 150,
  flexDirection: "row",
  justifyContent: "space-between",
}

const $modalBackground: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro semitransparente
}
const $modalContent: ViewStyle = {
  width: "100%",
  padding: 20,
  backgroundColor: "white",
  borderRadius: 10,
  elevation: 5, // Sombra en Android
  shadowColor: "#000", // Sombra en iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
}
