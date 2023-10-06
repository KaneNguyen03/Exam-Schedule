import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import alluserTypes from "../../constants/alluserTypes";
import alluser from "../../apis/alluser";

export const getAllusers= createAsyncThunk(
    alluserTypes.GET_ALLUSERS,
    async (data)=>{
        try{
            const result = await alluser.getAllusers(data);
            return result;
        } catch (error){
            return isRejectedWithValue(error);
        }
    }
)
export const updateAlluser= createAsyncThunk(
    alluserTypes.UPDATE_ALLUSER,
    async (data)=>{
        try{
            const result = await alluser.updateAlluser(data);
            return result;
        } catch (error){
            return isRejectedWithValue(error);
        }
    }
)
export const deleteAlluser= createAsyncThunk(
    alluserTypes.DELETE_ALLUSER,
    async (data)=>{
        try{
            const result = await alluser.deleteAlluser(data);
            return result;
        } catch (error){
            return isRejectedWithValue(error);
        }
    }
)
export const createAlluser= createAsyncThunk(
    alluserTypes.CREATE_ALLUSER,
    async (data)=>{
        try{
            const result = await alluser.createAlluser(data);
            return result;
        } catch (error){
            return isRejectedWithValue(error);
        }
    }
)
