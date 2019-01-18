import React, { Component } from 'react';
import 'core-js/es6/';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import thunkMidleware from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'

import VoxeetSdk from '@voxeet/voxeet-web-sdk'
import { ConferenceRoom, reducer as voxeetReducer } from './app/VoxeetReactComponents'

class VoxeetConference extends Component {

  componentDidMount() {
    let conferenceName = this.props.conferenceName.trim().toLowerCase().replace(/ /g,'')
    let name = this.props.userName
    let photoURL = this.props.photoURL

    const settings = {
      conferenceAlias: conferenceName,
      consumerKey: 'CONSUMER_KEY',
      consumerSecret: 'CONSUMER_SECRET'
    };

    const reducers = combineReducers({
      voxeet: voxeetReducer
    });

    if (this.props.userName.length == 0) {
      name = 'Guest ' + Math.floor((Math.random() * 100) + 1)
    }

    const userInfo = {
      name: name,
      externalId: this.props.externalId,
      avatarUrl: photoURL
    };

    var constraints = {
      audio: true,
      video: false
    };

    var videoRatio = {
      width: 1280,
      height: 720
    }

    const configureStore = () => createStore(
      reducers,
      applyMiddleware(thunkMidleware)
    );

    let displayModes = ["tiles", "speaker"]

    ReactDOM.render(
      <Provider store={configureStore()}>
        <ConferenceRoom
          autoJoin
          sdk={this.props.sdk}
          userInfo={userInfo}
          //preConfig
          //isWebinar
          //isAdmin
          liveRecordingEnabled
          videoCodec={"H264"}
          chromeExtensionId={"ENTER YOUR CHROME STORE ID FOR SCREENSHARE"}
          displayModes={displayModes}
          videoRatio={videoRatio}
          handleOnLeave={this.props.handleOnLeave}
          isWidget={false}
          constraints={constraints}
          consumerKey={settings.consumerKey}
          consumerSecret={settings.consumerSecret}
          conferenceAlias={settings.conferenceAlias}
        />
      </Provider>,
      document.getElementById('voxeet-widget')
    )
  }

  render() {
    return (
      <div id="voxeet-widget">
      </div>
    )
  }
}

VoxeetConference.propTypes = {
    conferenceName: PropTypes.string,
    photoURL: PropTypes.string,
    sdk: PropTypes.object,
    externalId: PropTypes.string,
    userName: PropTypes.string,
    handleOnLeave: PropTypes.func.isRequired
}

VoxeetConference.defaultProps = {
    conferenceName: 'conference_name',
    userName: 'Guest ' + Math.floor((Math.random() * 100) + 1)
}

export default VoxeetConference;
