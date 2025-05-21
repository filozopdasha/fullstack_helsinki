import axios from 'axios'
const baseUrl = 'https://fullstack-helsinki-uxzj.onrender.com/persons'

const getAll = () => axios.get(baseUrl).then((res) => res.data)

const create = (newObject) =>
    axios.post(baseUrl, newObject).then((res) => res.data)

const update = (id, newObject) =>
    axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data)

const deleteUser = (id) => axios.delete(`${baseUrl}/${id}`)

export default {
    getAll,
    create,
    update,
    deleteUser
}