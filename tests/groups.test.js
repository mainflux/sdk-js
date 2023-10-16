const axios = require('axios');
const mfsdk = require("mainflux-sdk")

jest.mock('axios');

describe('Groups', () => {
    const groups_url = "http://localhost";
    const group = {
        "name": "group_test",
        "id": "290b0f49-7a57-4b8c-9e4e-fbf17c6ab7d9",
        "parent_id": "290b0f49-7a57-4b8c-9e4e-fbf17c6ab7d9",
        "status": "enabled",
        "owner_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879"
    };
    const group_id = "290b0f49-7a57-4b8c-9e4e-fbf17c6ab7d9";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjU3OTMwNjksImlhdCI6";
    const query_params = {
        "offset": 0, "limit": 10
    };
    const groups = [
        { "name": "groupA", "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
        { "name": "groupB", "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879" }
    ];
    const member_id = "bb7edb32-2eac-4aad-aebe-ed96fe073879";
    const member_type = "m_read";
    const members_ids = ["bb7edb32-2eac-4aad-aebe-ed96fe073879", "bb7edb32-2eac-4aad-aebe-ed96fe073879"];


    test('Create should create a group and return success', () => {
        axios.request.mockResolvedValueOnce({ data: group });

        const expectedUrl = `${groups_url}/groups`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Create(group, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(group),
            });
            expect(result).toEqual(group);
        });
    });

    test('Create should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${groups_url}/groups`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Create(group, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(group),
            });
            console.log(result);
        });
    });

    test('Get should retrieve a group and return success', () => {
        axios.request.mockResolvedValueOnce({ data: group });

        const expectedUrl = `${groups_url}/groups/${group_id}`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Get(group_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(group);
        });
    });

    test('Get should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${groups_url}/groups/${group_id}`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Get(group_id, token).then(result => {
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


    test('Get all should retrieve all groups and return success', () => {
        axios.request.mockResolvedValueOnce({ data: groups });

        const expectedUrl = `${groups_url}/groups?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.GetAll(query_params, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(groups);
        });
    });

    test('Get all should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${groups_url}/groups?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.GetAll(query_params, token).then(result => {
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

    test('Update should update a group and return success', () => {
        axios.request.mockResolvedValueOnce({ data: group });

        const expectedUrl = `${groups_url}/groups/${group_id}`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Update(group_id, group, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'put',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(group),
            });
            expect(result).toEqual(group);
        });
    });

    test('Update should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${groups_url}/groups/${group_id}`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Update(group_id, group, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'put',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(group),
            });
            console.log(result);
        });
    });

    test('Children should retrieve all of a groups children and return success', () => {
        axios.request.mockResolvedValueOnce({ data: groups });

        const expectedUrl = `${groups_url}/groups/${group_id}/children?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Children(group_id, query_params, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(groups);
        });
    });

    test('Children should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${groups_url}/groups/${group_id}/children?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Children(group_id, query_params, token).then(result => {
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

    test('Parents should retrieve all of a groups children and return success', () => {
        axios.request.mockResolvedValueOnce({ data: groups });

        const expectedUrl = `${groups_url}/groups/${group_id}/parents?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Parents(group_id, query_params, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(groups);
        });
    });

    test('Parents should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${groups_url}/groups/${group_id}/parents?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Parents(group_id, query_params, token).then(result => {
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

    test('Assign should assign a group and return success', () => {
        axios.request.mockResolvedValueOnce("Policy created");

        const expectedUrl = `${groups_url}/policies`;
        const payload = { "object": group_id, "subject": member_id, "actions": member_type };

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Assign(group_id, member_id, member_type, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(payload),
            });
            expect(result).toEqual("Policy created");
        });
    });

    test('Assign should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${groups_url}/policies`;
        const payload = { "object": group_id, "subject": member_id, "actions": member_type };

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Assign(group_id, member_id, member_type, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(payload),
            });
            console.log(result);
        });
    });

    test('Unassign should unassign a group and return success', () => {
        axios.request.mockResolvedValueOnce("Policy deleted");

        const expectedUrl = `${groups_url}/policies/${member_id}/${group_id}`;
        const payload = { "object": group_id, "subject": member_id };

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Unassign(member_id, group_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'delete',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(payload),
            });
            expect(result).toEqual("Policy deleted");
        });
    });

    test('Unassign should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${groups_url}/policies/${member_id}/${group_id}`;
        const payload = { "object": group_id, "subject": member_id };

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Unassign(member_id, group_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'delete',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(payload),
            });
            console.log(result);
        });
    });

    test('Disable should delete a group and return success', () => {
        axios.request.mockResolvedValueOnce({ data: group });

        const expectedUrl = `${groups_url}/groups/${group_id}/disable`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Disable(group_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(group);
        });
    });

    test('Disable should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${groups_url}/groups/${group_id}/disable`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Disable(group_id, token).then(result => {
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

    test('Members should provide members of a group and return success', () => {
        axios.request.mockResolvedValueOnce({ data: group });

        const expectedUrl = `${groups_url}/groups/${group_id}/members?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Members(group_id, query_params, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(group);
        });
    });

    test('Members should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${groups_url}/groups/${group_id}/members?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ groupsUrl: groups_url });
        return sdk.groups.Members(group_id, query_params, token).then(result => {
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
            // expect(result.error.status).toBe(1);
            // expect(result.error.message).toBe('Missing or invalid access token provided.');
        });
    });
});
