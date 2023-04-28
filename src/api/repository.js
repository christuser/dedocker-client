import { default as axios } from "axios"
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getRepositories = async function () {
    try {
        const response = await axios.get(SERVER_URL + "/repository")
        if (response.status === 200) {
            return response.data.repositories;
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const searchRepositories = async function (name) {
    try {
        const response = await axios.get(SERVER_URL + "/repository/" + name)
        if (response.status === 200) {
            return response.data.repositories;
        }
    } catch (error) {
        console.log(error.message);
    }
}


export const userRepositories = async function (user) {
    try {
        const response = await axios.get(SERVER_URL + "/repository/user/" + user)
        if (response.status === 200) {
            return response.data.repositories;
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const getRepoTags = async function (name) {
    try {
        const response = await axios.get(SERVER_URL + "/repository/tags/" + name)
        if (response.status === 200) {
            return response.data.repositories;
        }
    } catch (error) {
        console.log(error.message);
    }
}