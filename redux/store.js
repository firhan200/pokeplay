import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import pokemonReducer from './pokemon/pokemonSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        pokemon: pokemonReducer,
    },
})