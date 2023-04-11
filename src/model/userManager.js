import axios from "axios";


class UserManager {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async signup(email, password) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/signup`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 201) {
        return 'User created successfully';
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      if (error.response.status === 409) {
        throw new Error('User already exists');
      } else {
        throw new Error('Internal server error');
      }
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        return { userId: response.data.userId };
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      if (error.response.status === 400) {
        throw new Error('Invalid credentials');
      } else {
        throw new Error('Internal server error');
      }
    }
  }

  async updateUser(formData) {
    try {
      const response = await axios.put(
        `${this.baseUrl}/user`,
        { formData },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        return 'User updated successfully';
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      throw new Error('Internal server error');
    }
  }

  async getGenderedUsers(gender) {
    try {
      const response = await axios.get(`${this.baseUrl}/gendared-users?gender=${gender}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to get gendered users');
      }
    } catch (error) {
      throw new Error('Internal server error');
    }
  }

  async getUsersByIds(userIds) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/users?userIds=${JSON.stringify(userIds)}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to get users by IDs');
      }
    } catch (error) {
      if (error.response.status === 400) {
        throw new Error('Invalid user IDs');
      } else {
        throw new Error('Internal server error');
      }
    }
  }

  async addMatch(userId, matchedUserId) {
    try {
      const response = await axios.put(
        `${this.baseUrl}/addmatch`,
        { userId, matchedUserId },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        return 'Match added successfully';
      } else {
        throw new Error('Failed to add match');
      }
    } catch (error) {
      if (error.response.status === 404) {
        throw new Error('User not found');
      } else {
        throw new Error('Internal server error');
      }
    }
  }
}




const userManager = new UserManager("http://localhost:8080");

export default userManager;


