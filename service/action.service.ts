import axios from 'axios'
import info from './info'

const { path } = info

const getAll = async () => {
    try {
        const { data } = await axios.get(`${path}/action`)
        return data ?? []
    }
    catch {
        return []
    }
}

const actionService = {
    getAll
}

export default actionService