import { Dealer } from "../models/carDealer.model"
import { Request, Response } from "express"




export const getAllCarDealers = async (req: Request, res: Response): Promise<void> => {
    try {
    // const carDealerList = CarDealerStore.findAll()
    
    const carDealerList = await Dealer.find()
    res.status(200).json({success:true, data:carDealerList})
    return
    } catch (error) {
        res.status(400)
        .json({success:false, error: `Error in Get Car Dealer List: ${error instanceof Error ?error.message :''}`})
    }
}


export const createCarDealer = async (req: Request, res: Response):Promise<void> => {
    try {
        const { name, email, city } = req.body

        if(!name || !email || !city){
            res.status(400).json({success: false, error: ' Name, Email, City are Require Filed'});
            return;
        }
        
        // CarDealerStore.create({name, email, city})
        const carDealer = new Dealer({
            name,
            email,
            city
        })
        await carDealer.save();
        res.status(201).json({
            success:true,
            data:carDealer
        })

    } catch (error) {
        res.status(400)
        .json({success:false, error: `Error in Create Car Dealer: ${error instanceof Error ?error.message :''}`})
    }
}

export const getCarDealer = async (req: Request, res: Response):Promise<void> => {
    try {
    // CarDealerStore.findById(req.params.id)
    const carDealer = await Dealer.findById(req.params.id)

    if(!carDealer){
        res.status(404).json({success: false, error:'Not found'})
        return
    }
    res.status(200).json({success:true, data:carDealer})
    return
    } catch (error) {
        res.status(400)
        .json({success:false, error: `Error in Get Car Dealer: ${error instanceof Error ?error.message :''}`})
    }
}

export const updateCarDealer = async (req: Request, res: Response):Promise<void> => {
    try {
    //  CarDealerStore.update(req.params.id, req.body);
    const carDealer = await Dealer.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!carDealer) {
      res.status(404).json({
        success: false,
        error: 'Car Dealer not found',
      });
      return
    }

    res.status(200).json({
        success: true,
        data: carDealer,
    });
    
    } catch (error) {
         res.status(400)
        .json({success:false, error: `Error in Update Car Dealer: ${error instanceof Error ?error.message :''}`})
    }
    
}
export const deleteCarDealer = async (req: Request, res: Response):Promise<void> => {
    try {
    // Use delete func From listStore
    // CarDealerStore.delete(req.params.id);
    const deleted = await Dealer.findByIdAndDelete(req.params.id)
    // If id uncorrect or list not exist return success false
    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Dealer not found',
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
        .json({success:false, error: `Error in Delete Car Dealer: ${error instanceof Error ?error.message :''}`})
    }
}