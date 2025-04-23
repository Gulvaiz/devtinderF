import { createSlice } from "@reduxjs/toolkit"


const connectionsSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
       addConnection: (state, action) => {
           return action.payload
       },
       removeConnection: () => {
        return null
    },
    }
})

export const { addConnection, removeConnection } = connectionsSlice.actions
export default connectionsSlice.reducer 