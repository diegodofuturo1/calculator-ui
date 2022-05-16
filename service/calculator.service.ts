import axios from 'axios'
import { Action } from '../entity/action.entity'
import info from './info'

const { path } = info
const url = `${path}/calculator`

const calculate = async (actionId: string): Promise<Action | undefined> => {
    try {
        const { data }: { data: Action } = await axios.get(`${url}/${actionId}`)
        return data
    }
    catch (exception: any) {
        console.log(exception.message)
    }
}

const calculatorService = {
    calculate
}

export default calculatorService