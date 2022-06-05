import React from 'react'
import { Platform } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import emojiUtils from 'emoji-utils'

import SlackMessage from './SlackMessage'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BOT_USER = {
  _id: 2,
  name: 'Chat Bot',
  avatar: 'https://i.imgur.com/fz5WLbE.png'
};

export default class App extends React.Component {
  state = {
    messages: [
      {
        _id: 1,
        text: `How may I help you with today?`,
        createdAt: new Date(),
        user: BOT_USER
      }
    ],
    user: {
      _id: 1,
      name: "Sanket Valani",
      avatar: ""
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("@USER").then(( value )=>{
      if(value != undefined){
        let updateUser = JSON.parse(value);
        this.setState({
          user: {
            _id: updateUser.id,
            name: updateUser.name,
            avatar: updateUser.photo
          }
        })
      }
    })
  }

  async requestToBridge(message){
    // localhost servers network ip/port [ifconfig]
    let url = "http://192.168.42.74:9090/?q="+message;
    try {
      fetch(url,{
        method: 'GET'
      })
      .then((response)=>response.json())
      .then((responseJSON)=>{
        this.sendBotResponse(responseJSON.response);
      });
    } catch (error) {
      console.log('error in fetch api'+error);
    }      
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))

    this.requestToBridge( messages[0].text );
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  renderMessage(props) {
    const {
      currentMessage: { text: currText },
    } = props

    let messageTextStyle

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      }
    }

    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.user._id,
          name: this.state.user.name,
          avatar: this.state.user.avatar
        }}
        renderMessage={this.renderMessage}
      />
    )
  }
}