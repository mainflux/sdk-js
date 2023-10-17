const axios = require("axios");
const mfsdk = require("mainflux-sdk");

jest.mock("axios");

describe("Channels", () => {
  const channels_url = "http://localhost";
  const channel = {
    name: "channelName",
    description: "long channel description",
    parent_id: "bb7edb32-2eac-4aad-aebe-ed96fe073879",
    metadata: {
      domain: "example.com",
    },
    status: "enabled",
    owner_id: "bb7edb32-2eac-4aad-aebe-ed96fe073879",
  };
  const channel_id = "290b0f49-7a57-4b8c-9e4e-fbf17c6ab7d9";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjU3OTMwNjksImlhdCI6";
  const query_params = {
    offset: 0,
    limit: 10,
  };
  const channels = [
    { name: "channelA", id: "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
    { name: "channelB", id: "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
  ];
  const things = [
    { name: "thing1", id: "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
    { name: "thing2", id: "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
  ];

  test("Create should create a channel and return success", () => {
    axios.request.mockResolvedValueOnce({ data: channel });

    const expectedUrl = `${channels_url}/channels`;

    const sdk = new mfsdk({ channelsUrl: channels_url });
    return sdk.channels.Create(channel, token).then((result) => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(channel),
      });
      expect(result).toEqual(channel);
    });
  });

  test("Create should handle a conflict error", () => {
    const errorResponse = {
      response: {
        status: 401,
      },
    };
    axios.request.mockRejectedValueOnce(errorResponse);

    const expectedUrl = `${channels_url}/channels`;

        const expectedUrl = `${channels_url}/channels`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Create(channel, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(channel),
            });
            expect(result).toEqual(channel);
        });
    });

    test('Create should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${channels_url}/channels`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Create(channel, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(channel),
            });
            console.log(result);
        });
    });

    test('Get should retrieve a channel and return success', () => {
        axios.request.mockResolvedValueOnce({ data: channel });

        const expectedUrl = `${channels_url}/channels/${channel_id}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Get(channel_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(channel);
        });
    });

    test('Get should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${channels_url}/channels/${channel_id}`;
        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Get(channel_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(result);
        });
    });

    test('Get_by_thing should retrieve things a channel is connected to and return success', () => {
        axios.request.mockResolvedValueOnce({ data: things });

        const expectedUrl = `${channels_url}/channels/${channel_id}/things?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.GetByThing(channel_id, query_params, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(things);
        });
    });

    test('Get by thing should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${channels_url}/channels/${channel_id}/things?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.GetByThing(channel_id, query_params, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(result);
        });
    });

    test('Get all should retrieve all channels and return success', () => {
        axios.request.mockResolvedValueOnce({ data: channels });

        const expectedUrl = `${channels_url}/channels?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.GetAll(query_params, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(channels);
        });
    });

    test('GetAll should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${channels_url}/channels?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.GetAll(query_params, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
      console.log(result);
    });
  });

  test("Get should retrieve a channel and return success", () => {
    axios.request.mockResolvedValueOnce({ data: channel });

    const expectedUrl = `${channels_url}/channels/${channel_id}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.CreateBulk(channels, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(channels),
            });
            expect(result).toEqual(channels);
        });
    });
  });

  test("Get should handle a conflict error", () => {
    const errorResponse = {
      response: {
        status: 401,
      },
    };
    axios.request.mockRejectedValueOnce(errorResponse);

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.CreateBulk(channels, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(channels),
            });
            console.log(result);
        });
    });
  });

  test("Get_by_thing should retrieve things a channel is connected to and return success", () => {
    axios.request.mockResolvedValueOnce({ data: things });

        const expectedUrl = `${channels_url}/channels/${channel_id}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Update(channel_id,channel, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'put',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(channel),
            });
            console.log(result);
        });
        expect(result).toEqual(things);
      });
  });

  test("Get by thing should handle a conflict error", () => {
    const errorResponse = {
      response: {
        status: 401,
      },
    };
    axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${channels_url}/channels/${channel_id}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Update(channel_id, channel, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'put',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(channel),
            });
            expect(result).toEqual(channel);
        });
        console.log(result);
      });
  });

  test("Get all should retrieve all channels and return success", () => {
    axios.request.mockResolvedValueOnce({ data: channels });

    const expectedUrl = `${channels_url}/channels?${new URLSearchParams(
      query_params,
    ).toString()}`;

    const sdk = new mfsdk({ channelsUrl: channels_url });
    return sdk.channels.GetAll(query_params, token).then((result) => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: "get",
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      expect(result).toEqual(channels);
    });
  });

  test("GetAll should handle a conflict error", () => {
    const errorResponse = {
      response: {
        status: 401,
      },
    };
    axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${channels_url}/channels/${channel_id}/disable`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Disable(channel_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(channel);
        });
    });
  });

  test("CreateBulk should create multiple channels and return success", () => {
    axios.request.mockResolvedValueOnce({ data: channels });

        const expectedUrl = `${channels_url}/channels/${channel_id}/disable`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Disable(channel_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(result);
        });
    });
  });

  test("CreateBulk should handle a conflict error", () => {
    const errorResponse = {
      response: {
        status: 401,
      },
    };
    axios.request.mockRejectedValueOnce(errorResponse);
    const expectedUrl = `${channels_url}/channels/bulk`;

    const sdk = new mfsdk({ channelsUrl: channels_url });
    return sdk.channels.CreateBulk(channels, token).then((result) => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(channels),
      });
      console.log(result);
    });
  });

  test("Update should handle a conflict error", () => {
    const errorResponse = {
      response: {
        status: 401,
      },
    };
    axios.request.mockRejectedValueOnce(errorResponse);

    const expectedUrl = `${channels_url}/channels/${channel["id"]}`;

    const sdk = new mfsdk({ channelsUrl: channels_url });
    return sdk.channels.Update(channel, token).then((result) => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: "put",
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(channel),
      });
      console.log(result);
    });
  });

  test("Update should update a channel and return success", () => {
    axios.request.mockResolvedValueOnce({ data: channel });

    const expectedUrl = `${channels_url}/channels/${channel["id"]}`;

    const sdk = new mfsdk({ channelsUrl: channels_url });
    return sdk.channels.Update(channel, token).then((result) => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: "put",
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(channel),
      });
      expect(result).toEqual(channel);
    });
  });

  test("Disable should delete a channel and return success", () => {
    axios.request.mockResolvedValueOnce({ data: channel });

    const expectedUrl = `${channels_url}/channels/${channel["id"]}/disable`;

    const sdk = new mfsdk({ channelsUrl: channels_url });
    return sdk.channels.Disable(channel, token).then((result) => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      expect(result).toEqual(channel);
    });
  });

  test("Disable should handle a conflict error", () => {
    const errorResponse = {
      response: {
        status: 401,
      },
    };
    axios.request.mockRejectedValueOnce(errorResponse);

    const expectedUrl = `${channels_url}/channels/${channel["id"]}/disable`;

    const sdk = new mfsdk({ channelsUrl: channels_url });
    return sdk.channels.Disable(channel, token).then((result) => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
    });
  });
});
