import { ChatGPTAPI } from 'chatgpt'

export default class ChatGPTService {

    constructor(key){
        this.api = new ChatGPTAPI({
            apiKey: key
        });
    }

    async request(req) {
        const res = await api.sendMessage(req)
        return res.text;
    }
}