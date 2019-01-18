
export const Types = {
    PARTICIPANTS_CLEAR: 'PARTICIPANTS_CLEAR',
    PARTICIPANT_ADDED: 'PARTICIPANT_ADDED',
    PARTICIPANT_UPDATED: 'PARTICIPANT_UPDATED',
    PARTICIPANT_STATUS_UPDATED: 'PARTICIPANT_STATUS_UPDATED',
    PARTICIPANT_JOINED: 'PARTICIPANT_JOINED',
    PARTICIPANT_LEFT: 'PARTICIPANT_LEFT',
    HANDLE_ON_CONNECT: 'HANDLE_ON_CONNECT',
    PARTICIPANTS_MOVES: 'PARTICIPANTS_MOVES',
    HANDLE_ON_LEAVE: 'HANDLE_ON_LEAVE',
    SAVE_USER_POSITION: "SAVE_USER_POSITION",
    PARTICIPANTS_SAVE: 'PARTICIPANTS_SAVE',
    WEBINAR_ACTIVATED: 'WEBINAR_ACTIVATED',
    PARTICIPANTS_RESET: 'PARTICIPANTS_RESET',
    TRIGGER_PARTICIPANTS_HANDLE_CONNECT: 'TRIGGER_PARTICIPANTS_HANDLE_CONNECT',
    PARTICIPANT_SPEAK: 'PARTICIPANT_SPEAK',
    SAVE_CURRENT_USER: 'SAVE_CURRENT_USER',
    PARTICIPANT_TOGGLE_MICROPHONE: 'PARTICIPANT_TOGGLE_MICROPHONE',
    SCREENSHARE_STARTED: 'SCREENSHARE_STARTED',
    SCREENSHARE_STOPPED: 'SCREENSHARE_STOPPED',
    PARTICIPANT_3D_MOVE: 'PARTICIPANT_3D_MOVE',
    PARTICIPANT_ADMIN: 'PARTICIPANT_ADMIN',
    PARTICIPANT_ADDED_UPDATED: 'PARTICIPANT_ADDED_UPDATED',
}

export class Actions {

    static clearParticipantsList() {
        return {
            type: Types.PARTICIPANTS_CLEAR
        }
    }

    static user3DMoved(userId, moved) {
        return {
          type: Types.PARTICIPANTS_MOVES,
          payload: {
            userId,
            moved
          }
        }
    }

    static webinarActivated() {
        return {
            type: Types.WEBINAR_ACTIVATED
        }
    }

    static triggerHandleOnConnect() {
        return {
            type: Types.TRIGGER_PARTICIPANTS_HANDLE_CONNECT
        }
    }

    static saveCurrentUser(name, avatarUrl, externalId) {
      return {
          type: Types.SAVE_CURRENT_USER,
          payload: {
            name,
            avatarUrl,
            externalId
          }
      }
    }

    static handleOnLeave(handleOnLeave) {
      return (dispatch) => {
          dispatch({
              type: Types.HANDLE_ON_LEAVE,
              payload: {
                handleOnLeave
              }
            })
        }
    }

    static handleOnConnect(handleOnConnect) {
      return (dispatch) => {
          dispatch({
              type: Types.HANDLE_ON_CONNECT,
              payload: {
                handleOnConnect
              }
            })
        }
    }

    static onParticipantReset() {
        return {
            type: Types.PARTICIPANTS_RESET
        }
    }

    static onParticipantAdmin() {
        return {
            type: Types.PARTICIPANT_ADMIN
        }
    }

    static onParticipantSave() {
        return {
            type: Types.PARTICIPANTS_SAVE
        }
    }

    static onParticipantAdded(userId, userInfo) {
        return {
            type: Types.PARTICIPANT_ADDED,
            payload: {
                userId,
                userInfo,
            }
        }
    }

    static onParticipantJoined(userId, stream) {
        return {
            type: Types.PARTICIPANT_JOINED,
            payload: {
                userId,
                stream
            }
        }
    }

    static onParticipantSpeak(userId, isSpeaking) {
        return {
            type: Types.PARTICIPANT_SPEAK,
            payload: {
                userId,
                isSpeaking
            }
        }
    }

    static onParticipantUpdated(userId, stream) {
        return {
            type: Types.PARTICIPANT_UPDATED,
            payload: {
                userId,
                stream
            }
        }
    }

    static onParticipantStatusUpdated(userId, userInfo, status) {
        return {
            type: Types.PARTICIPANT_STATUS_UPDATED,
            payload: {
                userId,
                userInfo,
                status
            }
        }
    }

    static onParticipantAddedOrUpdated(userId, participantInfo) {
        return {
            type: Types.PARTICIPANT_ADDED_UPDATED,
            payload: {
                userId,
                participantInfo
            }
        }
    }

    static onParticipantLeft(userId) {
        return {
            type: Types.PARTICIPANT_LEFT,
            payload: { userId }
        }
    }

    static onScreenShareStarted(userId, stream) {
        return {
            type: Types.SCREENSHARE_STARTED,
            payload: { userId, stream }
        }
    }

    static onScreenShareStopped() {
        return {
            type: Types.SCREENSHARE_STOPPED
        }
    }

    static onParticipant3DMoves(userId, x, y) {
        return {
            type: Types.PARTICIPANT_3D_MOVE,
            payload: {userId, x, y}
        }
    }

    static onToogleMicrophone(userId, status) {
        return {
            type: Types.PARTICIPANT_TOGGLE_MICROPHONE,
            payload: { userId, status }
        }
    }

    static saveUserPosition(userId, relativePosition, position) {
        return {
            type: Types.SAVE_USER_POSITION,
            payload: { userId, relativePosition, position }
        }
    }
}
