import Sdk from '../sdk'
import { Types } from '../actions/ParticipantActions'
import { getOrganizedPosition, getRelativePosition } from '../libs/position';

import { STATUS_CONNECTING, STATUS_LEFT } from '../constants/ParticipantStatus'

const defaultState = {
    participants: [],
    replayParticipantTmp: [],
    userStream: {
      stream: null
    },
    currentUser: null,
    userStreamScreenShare: null,
    userIdStreamScreenShare: null,
    screenShareEnabled: false,
    isSpeaking:false,
    isReplaying:false,
    isAdmin: false,
    isWebinar: false,
    handleOnConnect: null,
    handleOnLeave: null,
}

const ParticipantReducer = (state = defaultState, action) => {
    switch (action.type) {
        case Types.PARTICIPANTS_CLEAR: {
            return {
              ...state,
              participants: [],
              currentUser: null,
              userStreamScreenShare: null,
              userIdStreamScreenShare: null,
              userStream: {
                stream: null
              },
              screenShareEnabled: false,
              isSpeaking:false,
              isReplaying:false
            }
        }
        case Types.WEBINAR_ACTIVATED: {
            return {
              ...state,
              isWebinar: true
            }
        }
        case Types.PARTICIPANTS_MOVES: {
          let participants = state.participants
          const index = participants.findIndex(p => p.participant_id === action.payload.userId)
          participants[index].isMoved = action.payload.moved;
          return {
            participants: [...participants],
            ...state
          }
        }
        case Types.SAVE_CURRENT_USER: {
          let currentUser = state.currentUser
          currentUser = {
            name: action.payload.name,
            participant_id: Sdk.instance.userId,
            avatarUrl: action.payload.avatarUrl,
            externalId: action.payload.externalId,
            isConnected: true,
            isMuted: false,
            isPresenter: false,
            isMyself: true,
            ...currentUser
          }
          return {
            ...state,
            currentUser: currentUser
          }
        }
        case Types.HANDLE_ON_CONNECT:
        return {
            ...state,
            handleOnConnect: action.payload.handleOnConnect
        }
        case Types.HANDLE_ON_LEAVE:
          return {
              ...state,
              handleOnLeave: action.payload.handleOnLeave
          }
        case Types.PARTICIPANTS_RESET: {
            const replayParticipantTmp = state.replayParticipantTmp
            return {
              ...state,
              participants: replayParticipantTmp,
              userStream: null,
              screenShareEnabled: false,
              isSpeaking:false,
              isReplaying: false,
            }
        }
        case Types.TRIGGER_PARTICIPANTS_HANDLE_CONNECT: {
          if (state.handleOnConnect != null) state.handleOnConnect()
          return {
              ...state,
          }
        }
        case Types.PARTICIPANT_ADMIN:
          return {
              ...state,
              isAdmin: true,
          }
        case Types.PARTICIPANTS_SAVE: {
            const participants = state.participants
            return {
              ...state,
              replayParticipantTmp: participants,
              isReplaying: true,
            }
        }
        case Types.PARTICIPANT_SPEAK: {
          const userId = action.payload.userId
          const participants = state.participants
          const index = participants.findIndex(p => p.participant_id === action.payload.userId);
          if (index === -1) return state;
          participants[index].isSpeaking = action.payload.isSpeaking;
          return {
              ...state,
              participants: [...participants]
          }
        }
        case Types.PARTICIPANT_ADDED: {
            const userInfo = action.payload.userInfo
            if (Sdk.instance.userId != action.payload.user) {
                let participants = state.participants
                const index = participants.findIndex(p => p.participant_id === action.payload.userId)
                if (index === -1) {
                    participants.push({
                        'participant_id': action.payload.userId,
                        'name': userInfo.name,
                        'isMoved': false,
                        'avatarUrl': userInfo.avatarUrl,
                        'externalId': userInfo.externalId,
                        'metadata': userInfo.metadata,
                        'isAdmin': (userInfo.metadata.admin === 'true'),
                        'isConnected': userInfo.status,
                        'status': STATUS_CONNECTING,
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
            return state;
          }
          case Types.PARTICIPANT_ADDED_UPDATED : {
                const participantInfo = action.payload.participantInfo
                let participants = state.participants
                if (Sdk.instance.userId != action.payload.userId) {
                    let replayParticipantTmp = state.replayParticipantTmp
                    const index = participants.findIndex(p => p.participant_id === action.payload.userId)
                    if (state.isReplaying) {
                      if (participantInfo.status == "LEFT" || participantInfo.status != "RESERVED" || participantInfo.status == "CANCELED" || participantInfo.status == "ATTENDED" || participantInfo.status == 'DECLINE') {
                        const tmpParticipants = [];
                        replayParticipantTmp.map((el, i) => {
                          if (el.participant_id != action.payload.userId) {
                            tmpParticipants.push(el)
                          }
                        })
                        return {
                            ...state,
                            replayParticipantTmp: [...tmpParticipants]
                        }
                      }
                      let exist = false;
                      replayParticipantTmp.map((el, i) => {
                          if (el.participant_id == action.payload.userId) {
                            exist = true
                          }
                      })
                      if (!exist) {
                          replayParticipantTmp.push({
                              'participant_id': action.payload.userId,
                              'name': participantInfo.name,
                              'isAdmin' : participantInfo.isAdmin,
                              'avatarUrl': participantInfo.avatarUrl,
                              'externalId': participantInfo.externalId,
                              'isConnected': true,
                              'status': STATUS_CONNECTING,
                              'isMuted': false,
                              'x' : -1,
                              'y' : -1
                          })
                      }
                  } else {
                    if (index === -1 && participantInfo.status != "LEFT" && participantInfo.status != "RESERVED" && participantInfo.status != "CANCELED" && participantInfo.status != "ATTENDED" && participantInfo.status != 'DECLINE') {
                        participants.push({
                            'participant_id': action.payload.userId,
                            'name': participantInfo.name,
                            'isAdmin' : participantInfo.isAdmin,
                            'avatarUrl': participantInfo.avatarUrl,
                            'externalId': participantInfo.externalId,
                            'isConnected': true,
                            'status': STATUS_CONNECTING,
                            'isMuted': false,
                            'x' : -1,
                            'y' : -1
                        })
                    } else if (participantInfo.status == "LEFT" || participantInfo.status == "ATTENDED" || participantInfo.status == "RESERVED" || participantInfo.status == "CANCELED" || participantInfo.status == "DECLINE") {
                      const tmpParticipants = [];
                      participants.map((el, i) => {
                        if (i != index) {
                          tmpParticipants.push(el)
                        }
                      })
                      return {
                          ...state,
                          participants: [...tmpParticipants]
                      }
                    } else {
                      participants[index].status = participantInfo.status;
                      participants[index].name = participantInfo.name;
                      participants[index].avatarUrl = participantInfo.avatarUrl;
                      participants[index].externalId = participantInfo.externalId;
                    }
                    return {
                        ...state,
                        participants: [...participants]
                    }
                }
            }

            return state;
        }

        case Types.PARTICIPANT_JOINED: {
              const { userId } = action.payload;
              if (Sdk.instance.userId === action.payload.userId) {
                let currentUser = state.currentUser
                  if (action.payload.stream && action.payload.stream.getVideoTracks().length > 0) {
                      currentUser = {
                        ...currentUser,
                        stream: action.payload.stream
                      }
                      return {
                          ...state,
                          currentUser: currentUser,
                          userStream: action.payload.stream
                      }
                  }
                  if (currentUser != null) {
                    currentUser.stream = null
                    return {
                        ...state
                    }
                  }
                  return state
              }
              const participants = state.participants
              const index = participants.findIndex(p => p.participant_id === action.payload.userId)
              if (index === -1) {
                return state
              }
              participants[index].isConnected = true
              participants[index].stream = null
              if (action.payload.stream && action.payload.stream.getVideoTracks().length > 0) {
                  participants[index].stream = action.payload.stream
              }
              const size = participants.filter(participant => (participant.isConnected === true)).length
              const participantsConnect = participants.filter(participant => (participant.isConnected === true))
              for(var i = 0; i < participantsConnect.length; i++) {
                if (!participantsConnect[i].isMoved) {
                    const height = window.innerHeight - 85;
                    const width = window.innerWidth;
                    const index = i
                    const position = getOrganizedPosition({
                        width: width,
                        height: height,
                        size: size,
                        index: index
                    })
                    const relativePosition = getRelativePosition(
                      width,
                      height,
                      position.posX,
                      position.posY
                    )
                    Sdk.instance.setUserPosition(participantsConnect[i].participant_id, relativePosition.x, relativePosition.y)
                    participantsConnect[i].x = position.posX
                    participantsConnect[i].y = position.posY
                }
              }

              return {
                  ...state,
                  participants: [...participants]
              }
            }
        case Types.PARTICIPANT_UPDATED:
            const { userId } = action.payload;
            const participants = state.participants
            if (Sdk.instance.userId === action.payload.userId) {
              let currentUser = state.currentUser
                if (action.payload.stream && action.payload.stream.getVideoTracks().length > 0) {
                    currentUser = {
                      ...currentUser,
                      stream: action.payload.stream
                    }
                    return {
                        ...state,
                        currentUser: currentUser,
                        userStream: action.payload.stream
                    }
                }
                if (currentUser != null) {
                  currentUser.stream = null
                  return {
                      ...state
                  }
                }
                return state
            }

            const index = participants.findIndex(p => p.participant_id === action.payload.userId)
            if (index === -1) {
              return state
            }
            participants[index].isConnected = true
            participants[index].stream = null
            if (action.payload.stream && action.payload.stream.getVideoTracks().length > 0) {
                participants[index].stream = action.payload.stream
            }
            return {
                ...state,
                participants: [...participants]
            }
        case Types.PARTICIPANT_STATUS_UPDATED: {
            const userInfo = action.payload.userInfo
            const status = action.payload.status
            if (Sdk.instance.userId != action.payload.userId) {
                let participants = state.participants
                const index = participants.findIndex(p => p.participant_id === action.payload.userId)
                if (index === -1) {
                  participants.push({
                      'participant_id': action.payload.userId,
                      'name': userInfo.name,
                      'isMoved': false,
                      'avatarUrl': userInfo.avatarUrl,
                      'externalId': userInfo.externalId,
                      'metadata': userInfo.metadata,
                      'isAdmin': (userInfo.metadata.admin === 'true'),
                      'isConnected': true,
                      'status': status,
                      'stream': null,
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
        case Types.PARTICIPANT_LEFT: {
            const participants = state.participants
            const index = participants.findIndex(p => p.participant_id === action.payload.userId);

            if (Sdk.instance.userId === action.payload.userId) return { ...state, participants: [] }

            if (index === -1) return state
            participants[index].isConnected = false
            participants[index].isMoved = false
            participants[index].status = STATUS_LEFT
            participants[index].x = -1
            participants[index].y = -1


            const size = participants.filter(participant => (participant.isConnected === true)).length
            const participantsConnect = participants.filter(participant => (participant.isConnected === true))

            for(var i = 0; i < participantsConnect.length; i++) {
              if (!participantsConnect[i].isMoved) {
                  const height = window.innerHeight - 85;
                  const width = window.innerWidth;
                  const index = i
                  const position = getOrganizedPosition({
                      width: width,
                      height: height,
                      size: size,
                      index: index
                  })
                  const relativePosition = getRelativePosition(
                    width,
                    height,
                    position.posX,
                    position.posY
                  )
                  Sdk.instance.setUserPosition(participantsConnect[i].participant_id, relativePosition.x, relativePosition.y)
                  participantsConnect[i].x = position.posX
                  participantsConnect[i].y = position.posY
                }
            }


            return {
                ...state,
                participants: [...participants]
            }
        }
        case Types.PARTICIPANT_3D_MOVE: {
          const participants = state.participants
          const index = participants.findIndex(p => p.participant_id === action.payload.userId);
          if (index === -1) return state
          participants[index].x = action.payload.x
          participants[index].y = action.payload.y
          return {
              ...state,
              participants: [...participants]
          }
        }
        case Types.PARTICIPANT_TOGGLE_MICROPHONE: {
            const userId = action.payload.userId
            const participants = state.participants
            const index = participants.findIndex(p => p.participant_id === action.payload.userId);
            if (index === -1) return state;
            participants[index].isMuted = !participants[index].isMuted;
            return {
                ...state,
                participants: [...participants]
            }
        }
        case Types.SCREENSHARE_STARTED: {
            return {
                ...state,
                screenShareEnabled: true,
                userIdStreamScreenShare: action.payload.userId,
                userStreamScreenShare: action.payload.stream
            }
        }
        case Types.SCREENSHARE_STOPPED: {
            return {
                ...state,
                screenShareEnabled: false,
                userIdStreamScreenShare: null,
                userStreamScreenShare: null
            }
        }
        case Types.SAVE_USER_POSITION: {
            const { userId, relativePosition, position } = action.payload
            const participants = state.participants;
            const index = participants.findIndex(p => p.participant_id === userId);
            if (index !== -1) {
                participants[index].x = position.posX;
                participants[index].y = position.posY;
                participants[index].relativeX = relativePosition.x;
                participants[index].relativeY = relativePosition.y;
            }
            return {
                ...state,
                participants: [...participants]
            }
        }
        default:
            return state
    }
}

export default ParticipantReducer
