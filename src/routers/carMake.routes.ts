import { createCarMake, deleteCarMake, getAllCarMakes, getCarMake, updateCarMake } from '../controllers/carMake.controller'
import { Router } from 'express'


const router = Router()

router.route('/')
.get(getAllCarMakes)
.post(createCarMake)

router.route('/:id')
.get(getCarMake)
.put(updateCarMake)
.delete(deleteCarMake)

export default router