
export const Types = {
    TOGGLE_WIDGET: 'TOGGLE_WIDGET',
    TOGGLE_FULLSCREEN: 'TOGGLE_FULLSCREEN',
    TOGGLE_MODE: 'TOGGLE_MODE',
    TOGGLE_MICROPHONE: 'TOGGLE_MICROPHONE',
    TOGGLE_VIDEO: 'TOGGLE_VIDEO',
    DISPLAY_MODES_ALLOWED: 'DISPLAY_MODES_ALLOWED',
    DISPLAY_ACTIONS_ALLOWED: 'DISPLAY_ACTIONS_ALLOWED',
    TOGGLE_MODAL: 'TOGGLE_MODAL',
    FORCE_MODE: 'FORCE_MODE',
    TOGGLE_LIVE_EXTERNAL: 'TOGGLE_LIVE_EXTERNAL',
    ELECTRON_MODE_ACTIVATED: 'ELECTRON_MODE_ACTIVATED',
    TOGGLE_SCREEN_SHARE_MODE: 'TOGGLE_SCREEN_SHARE_MODE',
    TOGGLE_AUDIO3D: 'TOGGLE_AUDIO3D',
    SET_CHROME_EXTENSION_ID: 'SET_CHROME_EXTENSION_ID',
    SET_VIDEO_RATIO: 'SET_VIDEO_RATIO',
    TOGGLE_RECORDING: 'TOGGLE_RECORDING',
    TOGGLE_MODAL_WIDGET: 'TOGGLE_MODAL_WIDGET',
    SAVE_CONSTRAINTS: "SAVE_CONSTRAINTS",
    ADMIN_ACTIVED: 'ADMIN_ACTIVED',
    KICK_ON_HANG_UP: 'KICK_ON_HANG_UP',
    RESET_WIDGET_CONTROLS: 'RESET_WIDGET_CONTROLS',
    TOGGLE_ATTENDEES_LIST: 'TOGGLE_ATTENDEES_LIST',
    TOGGLE_ATTENDEES_CHAT: 'TOGGLE_ATTENDEES_CHAT',
    UNLOCK_RECORDING: 'UNLOCK_RECORDING',
    LOCK_RECORDING: 'LOCK_RECORDING'
}

export class Actions {

    static toggleWidget() {
        return {
            type: Types.TOGGLE_WIDGET
        }
    }

    static toggleFullScreen() {
        return {
            type: Types.TOGGLE_FULLSCREEN
        }
    }

    static setChromeExtensionId(chromeExtensionId) {
      return {
        type: Types.SET_CHROME_EXTENSION_ID,
        payload: {
          chromeExtensionId: chromeExtensionId
        }
      }
    }

    static saveConstraints(constraints) {
        return {
            type: Types.SAVE_CONSTRAINTS,
            payload: {
              constraints: constraints
            }
        }
    }

    static setVideoRatio(videoRatio) {
      return {
        type: Types.SET_VIDEO_RATIO,
        payload: {
          videoRatio: videoRatio
        }
      }
    }

    static forceMode(mode) {
        return {
            type: Types.FORCE_MODE,
            payload: {
              mode: mode
            }
        }
    }

    static toggleLiveExternal() {
        return {
            type: Types.TOGGLE_LIVE_EXTERNAL
        }
    }

    static toggleScreenShareMode(isScreenshare) {
        return {
            type: Types.TOGGLE_SCREEN_SHARE_MODE,
            payload: {
              isScreenshare
            }
        }
    }

    static toggleMode() {
        return {
            type: Types.TOGGLE_MODE
        }
    }

    static toggleAudio3D() {
        return {
            type: Types.TOGGLE_AUDIO3D
        }
    }

    static adminActived() {
        return {
            type: Types.ADMIN_ACTIVED,
        }
    }

    static isKickOnHangUpActived() {
        return {
            type: Types.KICK_ON_HANG_UP,
        }
    }

    static electronModeActivated() {
        return {
            type: Types.ELECTRON_MODE_ACTIVATED,
        }
    }

    static displayModesAllowed(displayModes) {
        return {
            type: Types.DISPLAY_MODES_ALLOWED,
            payload: {
              displayModes: displayModes
            }
        }
    }

    static displayActionsAllowed(displayActions) {
        return {
            type: Types.DISPLAY_ACTIONS_ALLOWED,
            payload: {
              displayActions: displayActions
            }
        }
    }

    static toggleMicrophone() {
        return {
            type: Types.TOGGLE_MICROPHONE
        }
    }

    static toggleVideo(state) {
        return {
            type: Types.TOGGLE_VIDEO,
            payload: {
              state: state
            }
        }
    }

    static toggleModal() {
        return {
            type: Types.TOGGLE_MODAL
        }
    }

    static toggleRecording() {
        return {
            type: Types.TOGGLE_RECORDING
        }
    }

    static lockRecording() {
        return {
            type: Types.LOCK_RECORDING
        }
    }

    static unlockRecording() {
        return {
            type: Types.UNLOCK_RECORDING
        }
    }

    static toggleModalWidget() {
        return {
            type: Types.TOGGLE_MODAL_WIDGET
        }
    }

    static resetWidgetControls() {
      return {
          type: Types.RESET_WIDGET_CONTROLS
      }
    }

    static toggleAttendeesList(){
        return {
            type: Types.TOGGLE_ATTENDEES_LIST
        }
    }

    static toggleAttendeesChat(){
        return {
            type: Types.TOGGLE_ATTENDEES_CHAT
        }
    }

}
