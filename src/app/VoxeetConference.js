import React, { Component } from 'react';
import logo from '../static/images/logo.svg';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import thunkMidleware from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'

import VoxeetSdk from '@voxeet/voxeet-web-sdk'
import { ConferenceRoom, reducer as voxeetReducer } from './VoxeetReactComponents.js'

class VoxeetConference extends Component {

  componentDidMount() {
    let conferenceName = this.props.conferenceName.trim().toLowerCase().replace(/ /g,'')
    const settings = {
      conferenceAlias: conferenceName,
      consumerKey: 'CONSUMER_KEY',
      consumerSecret: 'CONSUMER_SECRET'
    };
    const reducers = combineReducers({
      voxeet: voxeetReducer
    });


    let name = this.props.userName
    let photoURL = this.props.photoURL
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
    if (this.props.isDemo && VoxeetSdk.isElectron) {
      displayModes = ["list", "tiles", "speaker"]
    } else if (VoxeetSdk.isElectron) {
      displayModes = ["tiles", "speaker", "list"]
    }
    ReactDOM.render(
      <Provider store={configureStore()}>
        <ConferenceRoom
          autoJoin
          userInfo={userInfo}
          isListener={this.props.isListener}
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
    isListener: PropTypes.bool,
    userName: PropTypes.string,
    handleOnLeave: PropTypes.func.isRequired
}

VoxeetConference.defaultProps = {
    conferenceName: 'conference_name',
    userName: 'Guest ' + Math.floor((Math.random() * 100) + 1)
}

export default VoxeetConference;
