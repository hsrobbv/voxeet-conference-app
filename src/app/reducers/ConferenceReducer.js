import { Types } from '../actions/ConferenceActions'
import AudioConferenceLeave from '../../static/sounds/voxeet_conference_exit.mp3'

const defaultState = {
    conferenceId: null,
    conferencePincode: null,
    initialized: false,
    connecting: false,
    isLive: false,
    isReplaying: false,
    isElectron: false,
    isDemo: false,
    webinarLive: false,
    conferenceReplayId: null,
    time:0,
    isJoined: false,
}

const ConferenceReducer = (state = defaultState, action) => {
    switch (action.type) {
        case Types.CONFERENCE_ELECTRON:
          return {
              ...state,
              isElectron: true
          }
        case Types.CONFERENCE_WEBINAR_LIVE:
          return {
              ...state,
              webinarLive: true
          }
        case Types.INCREMENT_TIME:
            return {
                ...state,
                time: action.payload.time
            }
        case Types.CONFERENCE_CONNECTING:
            return {
                ...state,
                connecting: true,
                isReplaying: false,
            }
        case Types.CONFERENCE_DEMO:
            return {
              ...state,
              isDemo: true
            }
        case Types.CONFERENCE_REPLAYING:
            return {
              ...state,
              connecting: true,
              conferenceReplayId: action.payload.conferenceReplayId,
              isReplaying: true,
            }
        case Types.CONFERENCE_JOINED: {
            return {
                ...state,
                conferenceId: action.payload.conferenceId,
                conferencePincode: action.payload.conferencePincode,
                connecting: false,
                isJoined: true
            }
        }
        case Types.CONFERENCE_LEAVE: {
            const audio = new Audio(AudioConferenceLeave)
            audio.play()
            return {
                ...state,
                conferenceId: null,
                conferencePincode: null,
                initialized: false,
                connecting: false,
                isLive: false,
                isReplaying: false,
                isElectron: false,
                isDemo: false,
                webinarLive: false,
                conferenceReplayId: null,
                time:0,
                isJoined: false
            }
        }
        case Types.REPLAY_ENDED: {
          return {
              ...state,
              initialized: true,
              time:0,
              conferenceReplayId: null,
              isReplaying: false,
              isElectron: false,
              isJoined: false,
          }
        }
        case Types.CONFERENCE_STATUS_UPDATED:
            return {
                ...state,
                connecting: false,
                initialized: true,
                isLive: action.payload.status.isLive
            }
        case Types.INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
                userId: action.payload.userId
            }
        default:
            return state
    }
}

export default ConferenceReducer
