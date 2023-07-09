import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        dualRing: {
            isLoading: false
        }, 
        ellipsis: {
            isLoading: false
        }
    },
    reducers: {
        onDualRingLoading: (state) => {
            state.dualRing.isLoading = true;
        },
        offDualRingLoading: (state) => {
            state.dualRing.isLoading = false;
        }
    }
})

export const {onDualRingLoading, offDualRingLoading} = loadingSlice.actions
export default loadingSlice.reducer