import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCharacters = createAsyncThunk('getCharacters', async () => {
    try {
        const { data } = await axios.get('https://hp-api.onrender.com/api/characters')
        return data
    } catch (error) {
        console.log('err', error)
    }
})


export const getOneCharacter = createAsyncThunk('getOneCharacter', async (id: string) => {
    try {
        const { data } = await axios.get('https://hp-api.onrender.com/api/character/' + id)
        return data[0]
    } catch (error) {
        console.log('err', error)
    }
})