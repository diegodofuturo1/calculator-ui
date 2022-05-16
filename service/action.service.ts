import axios from 'axios'
import info from './info'

const { path } = info
const url = `${path}/action`

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

const post = async (stageId: string) => {
    try {
        const { data } = await axios.post(url, { stageId })
        return data
    }
    catch (exception: any) {
        console.log(exception.message)
    }
}

const actionService = {
    getAll, post, getByStage
}

export default actionService