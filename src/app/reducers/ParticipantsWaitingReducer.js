import { Types } from '../actions/ParticipantWaitingActions'
import Sdk from '../sdk'
import { STATUS_CONNECTING, STATUS_LEFT, STATUS_INACTIVE, STATUS_CONNECTED } from '../constants/ParticipantStatus'

const defaultState = {
  participants: []
}

const ParticipantsWaitingReducer = (state = defaultState, action) => {
    switch (action.type) {
        case Types.PARTICIPANT_WAITING_ADDED: {
          const userInfo = action.payload.userInfo
          if (Sdk.instance.userId != action.payload.userId) {
              let participants = state.participants
              const index = participants.findIndex(p => p.participant_id === action.payload.userId)
              if (index === -1) {
                participants.push({
                    'participant_id': action.payload.userId,
                    'name': userInfo.name,
                    'avatarUrl': userInfo.avatarUrl,
                    'externalId': userInfo.externalId,
                    'stream': null,
                    'metadata': userInfo.metadata,
                    'isAdmin': (userInfo.metadata.admin === 'true'),
                    'isConnected': true,
                    'status': userInfo.status,
                    'isMuted': false,
                    'x' : -1,
                    'y' : -1
                })
              }
              return {
                  ...state,
                  participants: [...participants]
              }
          }
          return state
        }
        case Types.PARTICIPANT_WAITING_UPDATED: {
          const participants = state.participants
          const index = participants.findIndex(p => p.participant_id === action.payload.userId);

          if (Sdk.instance.userId === action.payload.userId) return { ...state }

          if (index === -1) return state
          participants[index].status = action.payload.status
          if (action.payload.status == "Connected" || action.payload.status == "Connecting") {
            participants[index].isConnected = true
          } else {
            participants[index].isConnected = false
          }
          return {
              ...state,
              participants: [...participants]
          }
        }
        case Types.PARTICIPANT_WAITING_LEFT: {
            const participants = state.participants
            const index = participants.findIndex(p => p.participant_id === action.payload.userId);

            if (Sdk.instance.userId === action.payload.userId) return { ...state, participants: [] }

            if (index === -1) return state
            participants[index].isConnected = false
            participants[index].status = STATUS_LEFT

            return {
                ...state,
                participants: [...participants]
            }
        }
        default:
            return state
    }
}

export default ParticipantsWaitingReducer
