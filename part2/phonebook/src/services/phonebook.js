import axios from "axios"

const baseUrl = 'http://localhost:3001/persons';

const getPersons = () =>
    axios
        .get(baseUrl)
        .then(response => response.data)
        .catch((err) => {
            console.log(`Error getting response: ${err.code}`);
            return [];
        })

const addPerson = (person) => {
    return axios
        .post(baseUrl, person)
        .then(response => response.data)
        .catch((err) => {
            console.log(`Error add new person: ${err.code}`);
        })
}

const deleteEntry = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data)
        .catch((err) => {
            console.log(`Entry already removed: ${err.code}`);
        })
}

const updatePerson = async (person, id) => {
    return axios
        .put(`${baseUrl}/${id}`, person)
        .then(response => response.data)
        .catch((err) => {
            console.log(`Update error: ${err.code}`);
            return Promise.reject("Update error");
        })
}

export default { getPersons, addPerson, deleteEntry, updatePerson }