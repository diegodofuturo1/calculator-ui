import axios from 'axios'
import { Stage } from '../entity/stage.entity'
import info from './info'

const { path } = info
const url = `${path}/stage`


const getAll = async () => {
    try {
        const { data } = await axios.get(url)
        return data ?? []
    }
    catch {
        return []
    }
}

const getById = async (id: string) => {
    try {
        const { data } = await axios.get(`${url}/${id}`)
        return data
    }
    catch (exception: any) {
        console.log(exception.message)
    }
}

const getByLevel = async (level: number) => {
    try {
        const { data } = await axios.get(`${url}/level/${level}`)
        return data
    }
    catch (exception: any) {
        console.log(exception.message)
    }
}

const post = async (stage: Stage) => {
    try {
        const { data } = await axios.post(url, stage)
        return data
    }
    catch (exception: any) {
        console.log(exception.message)
    }
}

const put = async (stage: Partial<Stage>) => {
    try {
        const { data } = await axios.put(url, stage)
        return data
    }
    catch (exception: any) {
        console.log(exception.message)
    }
}

const newStage = async () => {
    try {
        const { data } = await axios.get(`${url}/new`)
        return data
    }
    catch (exception: any) {
        console.log(exception.message)
    }
}

const operationService = {
    getAll, post, getById, getByLevel, put, newStage
}

export default operationService