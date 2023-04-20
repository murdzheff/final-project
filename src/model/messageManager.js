import axios from "axios";

class MessageManager {
  constructor(ip) {
    this.ip = ip;
    this.api = axios.create({
      baseURL: `http://${this.ip}`,
    });
  }

  async getMessages(userId, correspondingUserId) {
    const url = `/users/${userId}/messages/${correspondingUserId}`;
    const response = await this.api.get(url);
    return response.data;
  }

  async sendMessage(from, to, content, timestamp) {
    const url = '/message';
    const data = { message: { from, to, content, timestamp } };
    const response = await this.api.post(url, data, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  }
}

const messageManager = new MessageManager("localhost:8080");

export default messageManager;