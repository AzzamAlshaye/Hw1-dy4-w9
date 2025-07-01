import { Request, Response } from "express"
import { Car } from "../models/car.model"
import { Dealer } from "../models/carDealer.model"
import { CarMake } from "../models/carMake.model"




export const getAllCars = async (req: Request, res: Response): Promise<void> => {
    try {
    // const CarList = CarStore.findAll()
    const CarList = await Car.find()

    res.status(200).json({success:true, data:CarList})
    return
    } catch (error) {
        res.status(400)
        .json({success:false, error: `Error in Get Car List: ${error instanceof Error ?error.message :''}`})
    }
}
export const getCarsByDealerId = async (req: Request, res: Response): Promise<void> => {
    const { dealerId } = req.params
    try {
        if(!dealerId){
        res.status(400).json({success: false, error: 'Dealer Id is Require'})
        return
        }
        // Check if the dealer id correct 
        const dealerExist = await Dealer.findById(dealerId)
        
        if(!dealerExist){
            res.status(400).json({success: false, error: 'Dealer Not Found'})
            return
        }
        const carsByDealerId = await Car.find({dealerId: dealerId})

        
        if(!carsByDealerId || carsByDealerId.length == 0){
            res.status(404).json({success: false, error: 'Not Found Cars have This Dealer Id'})
            return
        }
        res.status(200).json({success:true, data:carsByDealerId})
        return
    } catch (error) {
        res.status(400)
        .json({success:false, error: `Error in Get Cars By Dealer ID: ${error instanceof Error ?error.message :''}`})
    }
}

export const getCarsByMakeId = async (req: Request, res: Response): Promise<void> => {
    const { carMakeId } = req.params
    try {
        if(!carMakeId ){
        res.status(400).json({success: false, error: 'Car Make Id is Require'})
        return
        }
        const carMakeExist = await CarMake.findById(carMakeId)
        if(!carMakeExist){
            res.status(400).json({success: false, error: 'Car Make Not Found'})
            return
        }

    // const carsByMakeId = CarStore.findByCarMakeId(carMakeId)
        const carsByMakeId = await Car.find({carMakeId: carMakeId})

    if(!carsByMakeId || carsByMakeId.length == 0){
        res.status(404).json({success: false, error: 'Not Found Cars have This Make Id'})
        return
    }
    res.status(200).json({success:true, data:carsByMakeId})
    return
    } catch (error) {
        res.status(400)
        .json({success:false, error: `Error in Get Cars By Make ID: ${error instanceof Error ?error.message :''}`})
    }
}

export const createCar = async (req: Request, res: Response):Promise<void> => {
    try {
        const { name, color, price, year, } = req.body
        const { carMakeId, dealerId } = req.params

        if(!name || !color || !price || !year){
            res.status(400).json({success: false, error: ' name, color, price, year, are Require Filed'});
            return;
        }

        if(!carMakeId || !dealerId){
            res.status(400).json({success: false, error: ' dealerId, carMakeId are Require Filed'});
            return;
        }

        // const Car = CarStore.create({name, color, price, year, carMakeId, dealerId})
        const car = new Car({
            name,
            color,
            price,
            year,
            carMakeId,
            dealerId
        })
       await car.save()
        res.status(201).json({
            success:true,
            data:car
        })

    } catch (error) {
        res.status(400)
        .json({success:false, error: `Error in Create Car : ${error instanceof Error ?error.message :''}`})
    }
}

export const getCar = async (req: Request, res: Response):Promise<void> => {
    const {id} = req.params
    try {
    // const Car = CarStore.findById(id)
    const car = await Car.findById(id)
    if(!car){
        res.status(404).json({success: false, error:'Not found'})
        return
    }
    res.status(200).json({success:true, data:car})
    return
    } catch (error) {
        res.status(400)
        .json({success:false, error: `Error in Get Car : ${error instanceof Error ?error.message :''}`})
    }
}

export const updateCar = async (req: Request, res: Response):Promise<void> => {
    try {

    // const Car = CarStore.update(req.params.id, req.body);
    const updateCar = await Car.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!updateCar) {
      res.status(404).json({
        success: false,
        error: 'Car not found',
      });
      return
    }

    res.status(200).json({
        success: true,
        data: updateCar,
    });
    
    } catch (error) {
         res.status(400)
        .json({success:false, error: `Error in Update Car : ${error instanceof Error ?error.message :''}`})
    }
    
}
export const deleteCar = async (req: Request, res: Response):Promise<void> => {
    try {
              // Use delete func From listStore
    // const deleted = CarStore.delete(req.params.id);
    const deleted = await Car.findByIdAndDelete(req.params.id)
    // If id uncorrect or list not exist return success false
    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Car not found',
      });
      return;
    }


    // Response
    res.status(200).json({
      success: true,
      data: {},
    });
    } catch (error) {
         res.status(400)
        .json({success:false, error: `Error in Delete Car : ${error instanceof Error ?error.message :''}`})
    }
}