import * as React from 'react';
import { View, SafeAreaView, Button, ToastAndroid } from 'react-native';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import { SignInWithGoole, SignOutWithGoole } from "../Auth/GoogleAuth";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GroupChatStackScreens, GroupChatStackParamList } from "../App";

type GroupChatSignInScreenRouteProp = RouteProp <GroupChatStackParamList, GroupChatStackScreens.GroupChatSignIn>;
type GroupChatSignInScreenNavigationProp = StackNavigationProp <GroupChatStackParamList, GroupChatStackScreens.GroupChatSignIn>;
type Props = {
  route: GroupChatSignInScreenRouteProp;
  navigation: GroupChatSignInScreenNavigationProp;
};

const GroupChatSignIn: React.FunctionComponent<Props> = ( {navigation, route} ) => {
  const [processingSignIn, changeProcessingSignIn] = React.useState <boolean>(false);

  React.useEffect(() => {
    const user:FirebaseAuthTypes.User | null = auth().currentUser
    if(user){        
      navigation.navigate('GroupChat',{user:user});
    }
    
  }, []);
  
  return(
    <SafeAreaView>
      <View style={{
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
      }}>

        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          disabled={processingSignIn}
          onPress={()=> {
            changeProcessingSignIn(true);
            SignInWithGoole().then(()=>{
              const user:FirebaseAuthTypes.User | null = auth().currentUser
              if(user){
                navigation.navigate('GroupChat',{user:user});
              } else {
                ToastAndroid.show("Sign In failed please try again",ToastAndroid.LONG);
              }
            });
            changeProcessingSignIn(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default GroupChatSignIn;