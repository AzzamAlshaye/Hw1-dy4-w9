import { Router } from 'express'
import { createCarDealer, deleteCarDealer, getAllCarDealers, getCarDealer, updateCarDealer } from '../controllers/carDealer.controller'


const router = Router()

router.route('/')
.get(getAllCarDealers)
.post(createCarDealer)

router.route('/:id')
.get(getCarDealer)
.put(updateCarDealer)
.delete(deleteCarDealer)

export default router