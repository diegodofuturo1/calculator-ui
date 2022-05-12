import axios from 'axios'
import info from './info'

const { path } = info


const getAll = async () => {
    try {
        const { data } = await axios.get(`${path}/operation`)
        return data ?? []
    }
    catch {
        return []
    }
}

const operationService = {
    getAll
}

export default operationService