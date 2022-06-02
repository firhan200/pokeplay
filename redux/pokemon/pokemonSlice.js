import { createSlice } from '@reduxjs/toolkit'
import config from '../../helpers/config';

export const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState: {
		list: [],
	},
	reducers: {
		getAll: async (state) => {
			const res = await fetch('/api/pokemon');
            const data = await res.json();

            state.list = data.data.results;
		}
	},
})

// Action creators are generated for each case reducer function
export const { getAll } = pokemonSlice.actions

export default pokemonSlice.reducer