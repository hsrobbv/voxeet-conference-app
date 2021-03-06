import { Types } from '../actions/InputManagerActions'

const defaultState = {
    currentAudioDevice: "",
    currentOutputDevice: "",
    currentVideoDevice: ""
}

const InputManagerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case Types.INPUT_AUDIO_CHANGE:
            return {
                ...state,
                currentAudioDevice: action.payload.deviceId
            }
        case Types.OUTPUT_AUDIO_CHANGE:
            return {
              ...state,
              currentOutputDevice: action.payload.deviceId
            }
        case Types.INPUT_VIDEO_CHANGE:
            return {
                ...state,
                currentVideoDevice: action.payload.deviceId
            }
        default:
            return state
    }
}

export default InputManagerReducer
