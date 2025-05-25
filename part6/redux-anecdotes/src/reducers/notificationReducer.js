import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        settingNot(state, action) {

            return action.payload
        },
        clearingNot() {

            return ''
        }
    }
})

export const { settingNot, clearingNot } = notificationSlice.actions

export const showNotification = (message, timeInSeconds) => {
    return dispatch => {
        dispatch(settingNot(message))
        setTimeout(() => {

            dispatch(clearingNot())
        }, timeInSeconds * 1000)
    }
}

export default notificationSlice.reducer