import mongoose from "mongoose";

export interface CarMakeInterface {
    id: string,
    brand: string,
    country: string,
    createdAt: Date;
    updatedAt: Date;
}


const carMakeSchema = new mongoose.Schema({
     brand:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

export const CarMake = mongoose.model('CarMake', carMakeSchema)