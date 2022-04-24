import axios from 'axios'


const getAllOperations = async () => {
    try {
        const { data } = await axios.get('http://localhost:8081/operation')
        return data ?? []
    }
    catch {
        return []
    }
}

const operationService = {
    getAllOperations
}

export default operationService