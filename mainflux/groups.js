// import Errors from "./errors.js";
const axios = require("axios");

class Groups {
    //Groups API client.
    /**
     * @class Groups - 
     * Groups API client is used for managing groups. It is used for
     * creating, updating, deleting, and retrieving groups.
     * @param {string} groups_url - The URL of the Groups service.
     * @returns {Groups} - Returns a Groups object.
     */
    constructor(groups_url) {
        this.groups_url = groups_url;
        this.content_type = "application/json";
        this.groupsEndpoint = "groups";
    }
    // groupError = new Errors;
    //Validation function

    ValidateGroupAndToken(group, token) {
        if (typeof group !== 'object' || group === null || Array.isArray(group)) {
            throw new Error('Invalid group parameter. Expected an object.');
        }

        if (typeof token !== 'string') {
            throw new Error('Invalid token parameter. Expected a string.');
        }
    }

    Create(group, token) {
        // Create a new group.
        /**
         * @method Create - Creates a new group once the user is authenticated.
         * and a valid token is provided. The group's parent or child status in the 
         * heirarchy can also be established.
         * @param {object} group - The group object to be created.
         * @param {string} token - The user's token.
         * @example
         * const group = {
         * "name": "groupName",
         * "description": "long group description",
         * "parent_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
         * "metadata": {
         *   "domain": "example.com"
         * },
         * "status": "enabled",
         * "owner_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879"
         * }
         */

        this.ValidateGroupAndToken(group, token);

        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: `${this.groups_url}/${this.groupsEndpoint}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(group),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
    }

    Get(group_id, token) {
        //Get a group.
        /**
         * @method Get - Provide a group's information once given the group ID and a valid token.
         * @param {string} group_id - The group's ID.
         * @param {string} token - The user's access token.
         * @returns {object} - Returns a group object.
         * @example
         * const group_id = "bb7edb32-2eac-4aad-aebe-ed96fe073879" 
         * 
         */

        if (typeof group_id !== 'string' || group_id === null) {
            throw new Error('Invalid group_id parameter. Expected a string.');
        };

        this.ValidateGroupAndToken({}, token);

        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: `${this.groups_url}/${this.groupsEndpoint}/${group_id}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    GetAll(query_params, token) {
        //Get all groups.
        /**
         * @method Get_all - Provides a list of all the groups in the database once given a valid token.
         * @param {string} token - The user's access token.
         * @param {Object} query_params - Query parameters.
         * @returns {object} - Returns a list of all the groups in the database.
         * @example
         * const query_params = {
         * "offset": 0,
         * "limit": 10
         * }
         * 
         */

        if (typeof query_params !== 'object' || query_params === null || Array.isArray(query_params)) {
            throw new Error('Invalid query parameters. Expected an object.');
        };

        this.ValidateGroupAndToken({}, token);

        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: `${this.groups_url}/${this.groupsEndpoint}?${new URLSearchParams(query_params).toString()}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Update(group_id, group, token) {
        //Updates a group's information such a name and metadata.
        /**
         * @method Update - Updates a group's information such a name and metadata when given a
         * valid token and group ID.
         * @param {object} group - The group object to be updated.
         * @param {string} token - The user's access token.
         * @returns {object} - Returns the updated group object.
         * @example
         * const group = {
         * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
         * "name": "groupName"
         * }
         * 
         */

        if (typeof group_id !== 'string' || group_id === null) {
            throw new Error('Invalid group_id parameter. Expected a string.');
        };

        this.ValidateGroupAndToken(group, token);

        const options = {
            method: "put",
            maxBodyLength: 2000,
            url: `${this.groups_url}/${this.groupsEndpoint}/${group_id}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(group),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Children(group_id, query_params, token) {
        //Get a group's children.
        /**
         * @method Children - Provides a list of a groups' children.
         * @param {string} group_id - The group's ID.
         * @param {string} token - The user's access token.
         * @param {object} query_params - The query parameters such as offset and limit.
         * @returns {object} - Returns a list of a group's children.
         * 
         */

        if (typeof group_id !== 'string' || group_id === null) {
            throw new Error('Invalid group_id parameter. Expected a string.');
        };

        if (typeof query_params !== 'object' || query_params === null || Array.isArray(query_params)) {
            throw new Error('Invalid query parameters. Expected an object.');
        };

        this.ValidateGroupAndToken({}, token);

        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: `${this.groups_url}/${this.groupsEndpoint}/${group_id}/children?${new URLSearchParams(query_params).toString()}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Parents(group_id, query_params, token) {
        //Get a group's parents.
        /**
         * @method Parents - Provides a list of a groups' parents when provided with 
         * a valid token and group ID.
         * @param {string} group_id - The group's ID.
         * @param {string} token - The user's access token.
         * @param {object} query_params - The query parameters such as offset and limit.
         * @returns {object} - Returns a list of a group's parents. 
         * 
         */

        if (typeof group_id !== 'string' || group_id === null) {
            throw new Error('Invalid group_id parameter. Expected a string.');
        };

        if (typeof query_params !== 'object' || query_params === null || Array.isArray(query_params)) {
            throw new Error('Invalid query parameters. Expected an object.');
        };

        this.ValidateGroupAndToken({}, token);

        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: `${this.groups_url}/${this.groupsEndpoint}/${group_id}/parents?${new URLSearchParams(query_params).toString()}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Assign(group_id, member_id, member_type, token) {
        //Assign a member to a group.
        /**
         * @method Assign -Assigns a user to a group when given a valid token, group ID, 
         * member ID, and member type. This allows the user to perform
         * some action on the group.
         * @param {string} group_id - The group's ID.
         * @param {string} member_id - The member's ID.
         * @param {Array} member_type - The member's actions that they can perform over the group.
         * @param {string} token - The user's access token.
         * @returns {string} - "Policy created".
         * 
         */

        if (typeof group_id !== 'string' || typeof member_id !== 'string' ) {
            throw new Error('Invalid parameters. Expected strings for group_id and member_id.');
        };

        if (!Array.isArray(member_type)) {
            throw new Error('Invalid parameter. Expected an array for member_type.');
        };

        this.ValidateGroupAndToken({}, token);

        const payload = { "object": group_id, "subject": member_id, "actions": member_type };
        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: `${this.groups_url}/policies`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(payload),
        };
        return axios.request(options)
            .then((_response) => {
                return "Policy created";
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Unassign(member_id, group_id, token) {
        //Unassign a member from a group.
        /**
         * @method Unassign - Deletes a user's policy over a group through unassigning them. 
         * Requires a valid token, ID's of members of the group and the group ID.
         * @param {String} member_id - The member's ID.
         * @param {string} group_id - The group's ID.
         * @param {string} token - The user's access token.
         * @returns {string} - "Policy deleted"
         */

        if (typeof group_id !== 'string' || typeof member_id !== 'string' ) {
            throw new Error('Invalid parameters. Expected strings for group_id and member_id.');
        }

        this.ValidateGroupAndToken({}, token);

        const payload = { "object": group_id, "subject": member_id };
        const options = {
            method: "delete",
            maxBodyLength: 2000,
            url: `${this.groups_url}/policies/${member_id}/${group_id}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(payload),
        };
        return axios.request(options)
            .then((_response) => {
                return "Policy deleted";
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Disable(group_id, token) {
        //Disable a group.
        /**
         * @method Disable - Deletes a group when given a valid token and group ID.
         * @param {string} group_id - The group's ID.
         * @param {string} token - The user's access token.
         * @returns {object} - Returns a group object with the status reading 'Disabled'.
         * 
         */

        if (typeof group_id !== 'string' || group_id === null) {
            throw new Error('Invalid group_id parameter. Expected a string.');
        };

        this.ValidateGroupAndToken({}, token);

        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: `${this.groups_url}/${this.groupsEndpoint}/${group_id}/disable`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Members(group_id, query_params, token) {
        //Retrieves a list of the members of a group.
        /**
         * @method Members - Retrieves a list of the members of a group.
         * @param {string} group_id - The group's ID.
         * @param {string} token - The user's access token.
         * @param {object} query_params - The query parameters such as offset and limit.
         * @returns {list} - Returns a list of the members of a group.
         * 
         */

        if (typeof group_id !== 'string' || group_id === null) {
            throw new Error('Invalid group_id parameter. Expected a string.');
        };

        if (typeof query_params !== 'object' || query_params === null || Array.isArray(query_params)) {
            throw new Error('Invalid query parameters. Expected an object.');
        }

        this.ValidateGroupAndToken({}, token);

        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: `${this.groups_url}/${this.groupsEndpoint}/${group_id}/members?${new URLSearchParams(query_params).toString()}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
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

module.exports = Groups;
