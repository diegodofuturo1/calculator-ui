import axios from 'axios'
import { Operation } from '../entity/operation.entity'
import info from './info'

const { path } = info
const url = `${path}/operation`


const getAll = async () => {
    try {
        const { data } = await axios.get(url)
        return data ?? []
    }
    catch {
        return []
    }
}

const getByStage = async (stageId: string) => {
    try {
        const { data } = await axios.get(`${url}/stage/${stageId}`)
        return data ?? []
    }
    catch {
        return []
    }
}

const post = async (operation: Operation, stageId: string) => {
    try {
        const body = { ...operation, stageId }
        const { data } = await axios.post(url, body)
        return data 
    }
    catch (exception: any) {
        console.log(exception.message)
    }
}

const operationService = {
    getAll, getByStage, post
}

export default operationService