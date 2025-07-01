import { createCar, deleteCar, getAllCars, getCar, getCarsByDealerId, getCarsByMakeId, updateCar } from '../controllers/car.controller'
import { Router } from 'express'


const router = Router()

router.route('/')
.get(getAllCars);

router.get('/getCarsByDealer/:dealerId', getCarsByDealerId)

router.get('/getCarsByMake/:carMakeId', getCarsByMakeId)
router.route('/:id')
.get(getCar)
.put(updateCar)
.delete(deleteCar);

router.post('/:dealerId/:carMakeId', createCar)




export default router