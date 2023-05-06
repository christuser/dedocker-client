import { default as axios } from "axios"
import { SERVER_URL } from "../constants";

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
        const response = await axios.get(SERVER_URL + "/repository?name=" + name)
        if (response.status === 200) {
            return response.data.repositories;
        }
    } catch (error) {
        console.log(error.message);
    }
}


export const userRepositories = async function (user) {
    try {
        let token = localStorage.getItem("token");

        const response = await axios.get(SERVER_URL + "/repository/user/" + user, {
            headers: {
                "Content-Type": `application/json`,
                Authorization: "Bearer " + token
            }
        })
        if (response.status === 200) {
            return response.data.repositories;
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const getRepoTags = async function (name) {
    try {
        const response = await axios.get(SERVER_URL + "/repository/tags?name=" + name)
        if (response.status === 200) {
            return response.data.repositories;
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePrivateRepo = async function (img) {
    try {
        let token = localStorage.getItem("token");

        const response = await axios.post(SERVER_URL + `/repository/${img.private ? "public" : "private"}`, { id: img.id }, {
            headers: {
                "Content-Type": `application/json`,
                Authorization: "Bearer " + token
            }
        }).catch(er => {
            alert(er.response.data.message)
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error.message)
    }
}