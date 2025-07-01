import mongoose from "mongoose";

export interface CarDealer {
    id: string,
    name: string,
    email:string,
    city: string,
    createdAt: Date;
    updatedAt: Date;
}


const dealerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    }

},{
    timestamps:true
})


export const Dealer = mongoose.model('Dealer', dealerSchema)