const axios = require('axios');
const mfsdk = require("mainflux-sdk");

jest.mock('axios');

describe('Messages', () => {

    const httpadapter_url = 'http://localhost';
    const readers_url = 'http://localhost';
    const channel_id = "2b86beba-83dd-4b39-8165-4dda4e6eb4ad";
    const msg = '[{"bn":"demo", "bu":"V", "n":"voltage", "u":"V", "v":5}]';
    const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9";
    const thing_key = "fc68b31b-d7fd-4879-b3a7-0baf4580c5b1";
    const chan_name_parts = channel_id.split(".", 2);
    const chan_id = chan_name_parts[0];
    let subtopic = "";

    if (chan_name_parts.length == 2) {
        subtopic = chan_name_parts[1].replace(".", "/", -1);
    }

    test('Send should send a message and return success', () => {
        axios.request.mockResolvedValueOnce({ data: msg });

        const expectedUrl = `${httpadapter_url}/http/channels/${chan_id}/messages/${subtopic}`;

        const sdk = new mfsdk({ httpadapterUrl: httpadapter_url });
        return sdk.messages.Send(channel_id, msg, thing_key).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Thing ${thing_key}`,
                },
                data: new TextEncoder().encode(msg),
            });
            expect(result).toEqual('Message Sent!');
        });
    });

    test('Read should read a message and return success', () => {
        axios.request.mockResolvedValueOnce({ data: msg });

        const expectedUrl = `${readers_url}/channels/${chan_id}/messages`;

        const sdk = new mfsdk({ readersUrl: readers_url });
        return sdk.messages.Read(channel_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                params: {"subtopic": subtopic},
            });
            expect(result).toEqual(msg);
        });
    });

})
