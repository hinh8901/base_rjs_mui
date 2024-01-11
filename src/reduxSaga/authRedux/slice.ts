import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
    isSignedIn: boolean
}

const initialState: AuthState = {
    isSignedIn: false
}

const authReducer = createSlice({
    name: 'AuthRedux',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isSignedIn = true
        },
        logoutSuccess: (state) => {
            state.isSignedIn = false
        }
    }
})

export const AuthActions = authReducer.actions

export default authReducer.reducer