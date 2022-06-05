import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './screens/Home';
import GroupChat from './screens/GroupChat';
import GroupChatSignIn from './screens/GroupChatSignIn';
// import ChatBot from "./screens/Chatbot";
import ChatBot from "./screens/Chatbot-SlackUI/App";

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from './shared/Header';
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { LogBox } from 'react-native';
import MarketPrices from './screens/MarketPrices';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export enum HomeStackScreens {
  Home = 'Home'
}
export type HomeStackParamList = {
  Home: undefined,
};
const homeStack = createStackNavigator<HomeStackParamList>();
function HomeStack() {
  return (
    <homeStack.Navigator headerMode="screen" >
      <homeStack.Screen 
        name={HomeStackScreens.Home} 
        component={Home}
        options={({navigation})=>({
          header: () => <Header title='Farming Tips'/>
        })}
      />
    </homeStack.Navigator>
  );
}


export enum MarketPricesStackScreens {
  MarketPrices = 'MarketPrices'
}
export type MarketPricesStackParamList = {
  MarketPrices: undefined,
};
const marketPricesStack = createStackNavigator<MarketPricesStackParamList>();
function MarketPricesStack() {
  return (
    <marketPricesStack.Navigator headerMode="screen" >
      <marketPricesStack.Screen 
        name={MarketPricesStackScreens.MarketPrices} 
        component={MarketPrices}
        options={({navigation})=>({
          header: () => <Header title='Daily Market Prices'/>
        })}
      />
    </marketPricesStack.Navigator>
  );
}


export enum GroupChatStackScreens {
  GroupChatSignIn = 'GroupChatSignIn',
  GroupChat = 'GroupChat'
}
export type GroupChatStackParamList = {
  GroupChatSignIn: undefined,
  GroupChat: { user: FirebaseAuthTypes.User | null }
};
const groupChatStack = createStackNavigator<GroupChatStackParamList>();
function GroupChatStack() {
  return (
    <groupChatStack.Navigator>
      <groupChatStack.Screen 
        name={GroupChatStackScreens.GroupChatSignIn} 
        component={GroupChatSignIn} 
        options={({navigation})=>({
          header: () => <Header title='Group Chat Signin'/>
        })}
      />
      <groupChatStack.Screen 
        name={GroupChatStackScreens.GroupChat}
        component={GroupChat} 
        options={({navigation})=>({
          header: () => <Header title='Group Chat'/>
        })}
      />
    </groupChatStack.Navigator>
  );
}


export enum ChatBotStackScreens {
  ChatBot = "Chatbot"
}
export type ChatbotStackParamList = {
  Chatbot: undefined
};
const chatbot = createStackNavigator<ChatbotStackParamList>();
function ChatBotStack() {
  return (
    <chatbot.Navigator>
      <chatbot.Screen 
        name={ChatBotStackScreens.ChatBot} 
        component={ChatBot} 
        options={({navigation})=>({
          header: () => <Header title='Chat Bot'/>
        })}
      />
    </chatbot.Navigator>
  );
}

export enum BottomTabScreens {
  FarmingTipsStack = 'FarmingTipsStack',
  MarketPricesStack = 'MarketPricesStack',
  GroupChatStack = 'GroupChatStack',
  ChatbotStack = 'ChatbotStack'
}
export type BottomTabParamList = {
  FarmingTipsStack: undefined,
  MarketPricesStack: undefined,
  GroupChatStack: undefined,
  ChatbotStack: undefined,
};
const Tab = createBottomTabNavigator<BottomTabParamList>();
function TabNaivgation() {
  return (
    <Tab.Navigator
      initialRouteName={BottomTabScreens.FarmingTipsStack}
      tabBarOptions={{
        activeTintColor: '#e91e63',
        activeBackgroundColor: '#0984e3',
        inactiveBackgroundColor: '#74b9ff',
        style: {
          alignItems: 'center',
          justifyContent: 'center',
          height: 60,
        }
      }}
    >
      <Tab.Screen
        name={BottomTabScreens.FarmingTipsStack}
        component={HomeStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="news" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabScreens.MarketPricesStack}
        component={MarketPricesStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="price-tag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabScreens.GroupChatStack}
        component={GroupChatStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabScreens.ChatbotStack}
        component={ChatBotStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="robot" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNaivgation/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}