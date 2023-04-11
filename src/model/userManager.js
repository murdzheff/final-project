import axios from "axios";

class UserManager {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async signup(email, password) {
        const url = `${this.baseURL}/signup`;
        const headers = {
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify({ email, password });
        const response = await axios.post(url, body, { headers });
        localStorage.setItem('token', JSON.stringify(response.data.token));
        return response.status;
    }

    async login(email, password) {
        const url = `${this.baseURL}/login`;
        const headers = {
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify({ email, password });
        const response = await axios.post(url, body, { headers });
        localStorage.setItem('token', JSON.stringify(response.data.token));
        return response.status;
    }

    async updateUser(formData) {
        const url = `${this.baseURL}/user`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        };
        const body = JSON.stringify({ formData });
        const response = await axios.put(url, body, { headers });
        return response.status;
    }

    async getGenderedUsers(gender) {
        const url = `${this.baseURL}/gendared-users?gender=${gender}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        };
        const response = await axios.get(url, { headers });
        return response.data;
    }

    async getUsersByIds(userIds) {
        const url = `${this.baseURL}/users?userIds=${JSON.stringify(userIds)}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        };
        const response = await axios.get(url, { headers });
        return response.data;
    }

    async addMatch(userId, matchedUserId) {
        const url = `${this.baseURL}/addmatch`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        };
        const body = JSON.stringify({ userId, matchedUserId });
        const response = await axios.put(url, body, { headers });
        return response.status;
    }
}

const userManager = new UserManager("http://localhost:8080");

export default userManager;


