import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View, KeyboardAvoidingView, Text, BackHandler } from 'react-native';
import { GiftedChat, Send, Bubble, User } from "react-native-gifted-chat";
import { GroupChatStackParamList, GroupChatStackScreens } from '../App';
import database, { firebase } from '@react-native-firebase/database';
import { SignOutWithGoole } from '../Auth/GoogleAuth';

// import { IconButton } from 'react-native-paper'

type GroupChatScreenRouteProp = RouteProp <GroupChatStackParamList, GroupChatStackScreens.GroupChat>;
type GroupChatScreenNavigationProp = StackNavigationProp <GroupChatStackParamList, GroupChatStackScreens.GroupChat>;
type Props = {
  route: GroupChatScreenRouteProp;
  navigation: GroupChatScreenNavigationProp;
};

const db = database().ref('messages');

export const parse = (message:any) =>{
  const {user, text, timestamp} = message.val();
  const {key: _id} = message;
  const createAt = new Date(timestamp)
  return { _id, createAt, text, user };
}

const get = (callback:any) =>{
  db.on('child_added', snapshot => {
    callback(parse(snapshot));
  })      
};

const send = (messages:any) =>{
  messages.forEach((item:any) =>{
    const message = {
      text: item.text,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: item.user
    }
    db.push(message)
  })
};

const off = () =>{
  db.off()
};

const GroupChat:React.FunctionComponent<Props> = ({navigation,route}) => {
  const [ messages, updateMessages ] = React.useState([]);
  const [ userData, updateUserData ] = React.useState<User | undefined>()

  React.useEffect(() => {
    let newUser = route.params.user;
    let newUserObj = {
      _id: newUser?.uid,
      name: newUser?.displayName,
      avatar: newUser?.photoURL,
    } as User;
    updateUserData(newUserObj);
    get((message:any) => updateMessages( previous => GiftedChat.append(previous, message)))      

    return ()=>{
      off();
    }
  },[]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        SignOutWithGoole();
        navigation.pop();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    },[])
  );

  return(
    <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={10} enabled>
      <GiftedChat 
        messages={messages} 
        onSend={send} 
        user={userData}
        placeholder="Type here..."
        showUserAvatar
        alwaysShowSend
        scrollToBottom
        renderUsernameOnMessage={true}
        />
    </KeyboardAvoidingView>
  )
}

export default GroupChat;