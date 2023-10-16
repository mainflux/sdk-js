const axios = require('axios');

class Messages{
    //Messages API Client
    /**
     * @method Messages - Messages is used to manage messages.
     * It provides methods for sending and reading messages.
     * @param {string} readers_url - The url of the readers service.
     * @returns {Messages} - Returns a Messages object.
     */
    constructor(readers_url, httpadapter_url){
        this.readers_url = readers_url;
        this.httpadapter_url = httpadapter_url;
        this.content_type = 'application/json';
    }

    Send(channel_id, msg, thing_key){
        //Send a message
        /**
         * @method Send- Sends message to a given channel via HTTP protocol. Message is sent
         * through a writer add-on such as timescale. Message is sent to a
         * http port specific to the writer add-on. The thing and channel must be
         * created before sending the message and connected. 
         * @param {string} channel_id - The channel_id of the channel to send the message to.
         * @param {string} msg -message to send to the channel that should be in encoded into
         *       bytes format for example: 
         *       [{"bn":"demo", "bu":"V", "n":"voltage", "u":"V", "v":5}]
         * @param {string} thing_key - The secret of the thing sending the message.
         */

        if (typeof channel_id !== "string" || channel_id === null) {
            throw new Error('Invalid channel_id parameter. Expected a string.');
        }

        if (typeof thing_key !== "string" || thing_key === null) {
            throw new Error('Invalid thing_key parameter. Expected a string.');
        }

        if (!Array.isArray(msg)) {
            throw new Error('Invalid msg parameter. Expected an array.');
        }

        const chan_name_parts = channel_id.split(".", 2);
        const chan_id = chan_name_parts[0];
        let subtopic = "";

        if (chan_name_parts.length == 2) {
            subtopic = chan_name_parts[1].replace(".", "/", -1);
        }

        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: `${this.httpadapter_url}/http/channels/${chan_id}/messages/${subtopic}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Thing ${thing_key}`,
            },
            data: new TextEncoder().encode(msg),
        };
        return axios.request(options)
            .then((_response) => {
                return "Message Sent!";
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Read(channel_id, token){
        //Read messages
        /**
         * 
         * @method Read - Read messages from a given channel. Messages are read from a reader
         * add-on such as timescale. Messages are read from a http port specific to the reader
         * @param {string} channel_id - The channel_id of the channel to read the message from.
         * @param {string} token - The token to be used for authentication.
         */

        if (typeof channel_id !== "string" || channel_id === null) {
            throw new Error('Invalid channel_id parameter. Expected a string.');
        }

        if (typeof token !== "string" || token === null) {
            throw new Error('Invalid token parameter. Expected a string.');
        }
        
        const chan_name_parts = channel_id.split(".", 2);
        const chan_id = chan_name_parts[0];
        let subtopic = "";

        if (chan_name_parts.length == 2) {
            subtopic = chan_name_parts[1].replace(".", "/", -1);
        }

        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: `${this.readers_url}/channels/${chan_id}/messages`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            params: {"subtopic": subtopic},
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }
}

module.exports = Messages;
