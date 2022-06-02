import { createSlice } from '@reduxjs/toolkit'
import config from '../../helpers/config';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		name: null,
		pokemon: [],
	},
	reducers: {
		init: (state) => {
			//check if local storage contains user data
			const userData = localStorage.getItem(config.LOCAL_KEY);
			if(userData) {
				const user = JSON.parse(userData);
				state.name = user.name;
				state.pokemon = user.pokemon;
			}
		},
		addNewUser: (state, action) => {
			state.name = action.payload.name;
			state.pokemon = [];

			//save to localstorage
			localStorage.setItem(config.LOCAL_KEY, JSON.stringify(state));
		},
		addNewPokemon: (state, action) => {
			state.pokemon.push(action.payload);

			//save to localstorage
			localStorage.setItem(config.LOCAL_KEY, JSON.stringify(state));
		}
	},
})

// Action creators are generated for each case reducer function
export const { init, addNewUser, addNewPokemon } = userSlice.actions

export default userSlice.reducer