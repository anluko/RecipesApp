import ApiManager from './apiManager'

export const userLogin = async data => {
    try {
        const result = await ApiManager('/login', {
            method: "POST",
            headers: {
                'Content-Type':"application/json"
            },
            data: data,
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
}

export const userAdd = async data => {
    try {
        const result = await ApiManager('/addUser', {
            method: "POST",
            headers: {
                'Content-Type':"application/json"
            },
            data: data,
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
}

export const userFind  = async (id) => {
    try {
        const result = await ApiManager(`/user/${id}`, {
            method: "GET",
            headers: {
                'Content-Type':"application/json"
            }
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
}