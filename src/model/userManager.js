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
        localStorage.setItem("token", JSON.stringify(response.data));
        return true;
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
        localStorage.setItem("token", JSON.stringify(response.data));
        return { userId: response.data.userId };
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      if (error.response.status === 400) {
        return error;
      } else {
        throw new Error('Internal server error');
      }
    }
  }


  async getUserById(userId) {


    try {
      const response = await axios.get(
        `${this.baseUrl}/user`,
        {
          params: {
            userId: userId
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to get users by IDs');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error('Invalid user IDs');
      } else {
        throw new Error('Internal server error');
      }
    }
  }

  async updateUser(formData) {
    try {
      const response = await axios.put(
        `${this.baseUrl}/user`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        return;
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      throw new Error('Internal server error');
    }
  }

  async getGenderedUsers(gender) {
    const config = {
      params: {
        'gender': `${gender}`
      }
    };

    try {
      const response = await axios.get(this.baseUrl + "/users", config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get gendered users');
    }
  }




  getUsersByIds = async (userIds) => {
    try {
      const response = await axios.get(`${this.baseUrl}/usersIds`, {
        params: {
          userIds: userIds
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


  async addMatch(userId, matchedUserId) {

    const response = await axios.put(`${this.baseUrl}/users/user=${userId}/matches/${matchedUserId}`, null, {
      headers: {
        'identity': userId,
      },
    })
      .then(response => {
        return response.data
      })
      .catch(error => {
        return new Error(error)
        // Handle any errors
      });
  }

  async logout(token) {
    const response = await axios.delete(`${this.baseUrl}/logout`, {
      data: {
        user_id: token
      }
    }).then(response => {
      return response.data
    }).catch(error => {
      return new Error(error)
    });
  }


  getSessionUserIds = async () => {
    try {
      const response = await axios.get(`${this.baseUrl}/sessions/userIds`);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

}



const userManager = new UserManager("http://localhost:8080");

export default userManager;


