import express from 'express'
import {
    getBaseline
} from '../controllers/language.js'

const router = express.Router()

router.route('/api/baseline').post(getBaseline)

export default router