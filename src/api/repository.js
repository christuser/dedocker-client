import { default as axios } from "axios"

export const getRepositories = async function () {
    try {
        const response = await axios.get("http://localhost:3000/repository")
        if (response.status === 200) {
            return response.data.repositories;
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const searchRepositories = async function (name) {
    try {
        const response = await axios.get("http://localhost:3000/repository/" + name)
        if (response.status === 200) {
            return response.data.repositories;
        }
    } catch (error) {
        console.log(error.message);
    }
} 


export const userRepositories = async function (user) {
    try {
        const response = await axios.get("http://localhost:3000/repository/user/" + user)
        if (response.status === 200) {
            return response.data.repositories;
        }
    } catch (error) {
        console.log(error.message);
    }
} 