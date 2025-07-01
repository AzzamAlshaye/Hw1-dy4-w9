import { Request, Response } from "express"
import { CarMake } from "../models/carMake.model"




export const getAllCarMakes = async (req: Request, res: Response): Promise<void> => {
    try {
    // const CarMakeList = CarMakeStore.findAll()
    const carMakes = await CarMake.find()
    res.status(200).json({success:true, data:carMakes})
    return
    } catch (error) {
        res.status(400)
        .json({success:false, error: `Error in Get Car Make List: ${error instanceof Error ?error.message :''}`})
    }
}

export const createCarMake = async (req: Request, res: Response):Promise<void> => {
    try {
        const { brand, country } = req.body

        if(!brand || !country){
            res.status(400).json({success: false, error: ' brand, country are Require Filed'});
            return;
        }

        // const CarMake = CarMakeStore.create({brand, country})
        const carMake = new CarMake({
            brand,
            country
        })
        await carMake.save()
        res.status(201).json({
            success:true,
            data:carMake
        })

    } catch (error) {
        res.status(400)
        .json({success:false, error: `Error in Create Car Make: ${error instanceof Error ?error.message :''}`})
    }
}

export const getCarMake = async (req: Request, res: Response):Promise<void> => {
    try {

    // const CarMake = CarMakeStore.findById(req.params.id)
        const carMake = await CarMake.findById(req.params.id)
        if(!carMake){
        res.status(404).json({success: false, error:'Not found'})
        return
        }
        res.status(200).json({success:true, data:carMake})
        return
    } catch (error) {
        res.status(400)
        .json({success:false, error: `Error in Get Car Make: ${error instanceof Error ?error.message :''}`})
    }
}

export const updateCarMake = async (req: Request, res: Response):Promise<void> => {
    try {
    // const CarMake = CarMakeStore.update(req.params.id, req.body);
    const updateCarMake = await CarMake.findByIdAndUpdate(req.params.id, req.body, {new: true})

    if (!updateCarMake) {
      res.status(404).json({
        success: false,
        error: 'Car Make not found',
      });
      return
    }

    res.status(200).json({
        success: true,
        data: updateCarMake,
    });
    
    } catch (error) {
         res.status(400)
        .json({success:false, error: `Error in Update Car Make: ${error instanceof Error ?error.message :''}`})
    }
    
}
export const deleteCarMake = async (req: Request, res: Response):Promise<void> => {
    try {
    // Use delete func From listStore
    // const deleted = CarMakeStore.delete(req.params.id);
    const deleted = await CarMake.findByIdAndDelete(req.params.id)
    // If id uncorrect or list not exist return success false
    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Car Make not found',
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
        .json({success:false, error: `Error in Delete Car Make: ${error instanceof Error ?error.message :''}`})
    }
}