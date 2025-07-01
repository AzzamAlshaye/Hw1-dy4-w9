import mongoose, { Schema } from "mongoose";

export interface CarInterface {
    id: string,
    name: string,
    dealerId: string,
    carMakeId: string,
    color: string,
    year: number,
    price: number,
    createdAt: Date;
    updatedAt: Date;
}

const carSchema = new mongoose.Schema({
    name: {
        type:String,
         required:true
        },
    dealerId: {
        type:Schema.Types.ObjectId,
        ref: 'Dealer',
        required: true
    } ,
    carMakeId: {
        type:Schema.Types.ObjectId,
        ref: 'CarMake',
        required: true
    } ,
    color: String,
    year: Number,
    price: Number,

},{
     timestamps: true 
})


export const Car = mongoose.model("Car", carSchema)