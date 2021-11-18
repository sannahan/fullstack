import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = newObject => {
  return axios
    .post(baseUrl, newObject)
    .then(response => response.data)
}

const deleteContact = deleteId => {
  return axios
    .delete(`${baseUrl}/${deleteId}`)
    .then(response => response.data)
}

const replace = (replaceId, replaceInfo) => {
  return axios
    .put(`${baseUrl}/${replaceId}`, replaceInfo)
    .then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deleteContact, replace }