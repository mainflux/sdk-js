const axios = require('axios');
const Errors = require("./errors");

class Users {
    // Users API client
    /**
     * @class Users -
     * Users API is used for creating and managing users.
     * It is used for creating new users, logging in, refreshing tokens,
     * getting user information, updating user information, disabling 
     * and enabling users.
     * @param {String} users_url - URL to the Users service.
     * @returns {Object} - Users object.
     */
    constructor(users_url) {
        this.users_url = new URL (users_url);
        this.content_type = "application/json";
        this.usersEndpoint = "users";
    }

    // Validation function
    ValidateUserAndToken(user, token) {
        if (typeof user !== 'object' || user === null || Array.isArray(user)) {
            throw new Error('Invalid user parameter. Expected an object.');
        }

        if (typeof token !== 'string') {
            throw new Error('Invalid token parameter. Expected a string.');
        }
    }

    userError = new Errors;

    Create(user, token) {
        // Creates a new user
        /**
         * @method Create - Creates a new user.
         * @param {Object} user - User object.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         * "credentials": {
         *    "identity": "admin@example.com",
         *   "password": "12345678"
         * }
         * }
         */

        this.ValidateUserAndToken(user, token);

        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: new URL (this.usersEndpoint, this.users_url),
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: user,
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.create,
                        error.response.status
                    );
                };
            });
    }

    Login(user) {
        // Issue Access and Refresh Token used for authenticating into the system
        /**
         * @method Login - Issue Access and Refresh Token used for authenticating into the system.
         * @param {Object} user - User object.
         * @returns {Object} - Access and Refresh Token.
         * @example
         * const user = {
         * "credentials": {
         *   "identity": "admin@example.com",
         *  "password": "12345678"
         * }
         * }
         */

        this.ValidateUserAndToken(user, '');

        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: new URL (`${this.usersEndpoint}/tokens/issue`, this.users_url),
            headers: {
                "Content-Type": this.content_type,
            },
            data: user,
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.login,
                        error.response.status
                    );
                };
            });
    }

    RefreshToken(user, refresh_token) {
        //provides a new access token and refresh token.
        /**
         * @method Refresh_token - Provides a new access token and refresh token.
         * @param {Object} user - User object.
         * @param {String} refresh_token - Refresh token.
         * @returns {Object} - Access and Refresh Token.
         * @example
         * const user = {
         *   "identity": "c52d-3b0d-43b9-8c3e-275c087d875af"
         * }
         * 
         */
        if (typeof user !== 'object' || user === null || Array.isArray(user)) {
            throw new Error('Invalid user parameter. Expected an object.');
        };

        if (typeof refresh_token !== 'string') {
            throw new Error('Invalid token parameter. Expected a string.');
        };

        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: new URL (`${this.usersEndpoint}/tokens/refresh`, this.users_url),
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${refresh_token}`,
            },
            data: user,
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.refreshtoken,
                        error.response.status
                    );
                };
            });
    }

    Update(user, user_id, token) {
        // Update a user
        /**
         * @method Update - Update a user. Updates a user's name and metadata.
         * @param {Object} user - User object.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
         * "name": "John Doe"
         * }
         * 
         */

        this.ValidateUserAndToken({}, token);

        if (typeof user_id !== 'string' || user_id === null) {
            throw new Error('Invalid user_id parameter. Expected a string.');
        }

        const options = {
            method: "patch",
            url: new URL (`${this.usersEndpoint}/${user_id}`, this.users_url),
            maxBodyLength: 2000,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: user,
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.update,
                        error.response.status
                    );
                };
            });
    }

    UpdateUserIdentity(user, user_id, token) {
        // Update a user identity
        /**
         * @method UpdateUserIdentity - Update a user identity for a currently logged in user.
         * The user Identity is updated using authorization user_token
         * @param {Object} user - User object.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
         * "credentials": {
         *  "identity": "fkatwigs@email.com"
         * }
         * 
         * }
         */

        this.ValidateUserAndToken(user, token);
        
        if (typeof user_id !== 'string' || user_id === null) {
            throw new Error('Invalid user_id parameter. Expected a string.');
        }

        const options = {
            method: "patch",
            url: new URL (`${this.usersEndpoint}/${user_id}/identity`, this.users_url),
            maxBodyLength: 2000,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: user,
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.updateuseridentity,
                        error.response.status
                    );
                };
            });
    }

    UpdateUserTags(user,user_id, token) {
        // Update a user's tags.
        /**
         *  Updates tags of the user with provided ID. Tags is updated using 
         * authorization user_tokeN.
         * @method UpdateUserTags - Update a user's tags.
         * @param {Object} user - User object.
         * @param{String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         *  "name": "example",
         *      "id": "886b4266-77d1-4258-abae-2931fb4f16de"
         *      "tags": [
         *          "back",
         *           "end"
         *       ]
         *       "metadata": {
         *          "foo": "bar"
         *       }
         *  }
         * 
         */

        this.ValidateUserAndToken(user, token);
        
        if (typeof user_id !== 'string' || user_id === null) {
            throw new Error('Invalid user_id parameter. Expected a string.');
        }

        const options = {
            method: "patch",
            url: new URL(`${this.usersEndpoint}/${user_id}/tags`, this.users_url),
            maxBodyLength: 2000,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: user,
        };

        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.updateusertags,
                        error.response.status
                    );
                };
            });
    }

    UpdateUserOwner(user, user_id, token) {
        // Update a user's owner.
        /**
        *  Updates owner of the user with provided ID. The owner is updated using 
        * authorization user_tokeN.
        * @method UpdateUserOwner - Update a user's owner.
        * @param {Object} user - User object.
        * @param{String} token - Access token.
        * @returns {Object} - User object.
        * @example
        * const user = {
        *  "name": "example",
        *      "id": "886b4266-77d1-4258-abae-2931fb4f16de"
        *      "tags": [
        *          "back",
        *           "end"
        *       ]
        *       "metadata": {
        *          "foo": "bar"
        *       }
        *  "owner":"886b4266-77d1-4258-abae-2931fb4f16de"
        *  }
        * 
        */

        this.ValidateUserAndToken(user, token);

        if (typeof user_id !== 'string' || user_id === null) {
            throw new Error('Invalid user_id parameter. Expected a string.');
        }

        const options = {
            method: "patch",
            url: new URL(`${this.usersEndpoint}/${user_id}/owner`, this.users_url),
            maxBodyLength: 2000,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: user,
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.updateuserowner,
                        error.response.status
                    );
                };
            });
    }

    UpdateUserPassword(old_secret, new_secret, token) {
        // Update a user's password.
        /**
         * Updates password of the user with provided valid token.
         * 
         * @method UpdateUserPassword - Update a user's password.
         * @param {String} old_secret - Old password.
         * @param {String} new_secret - New password.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * 
         */

        if (typeof old_secret !== 'string' || typeof new_secret !== 'string' || typeof token !== 'string') {
            throw new Error('Invalid parameter types. Expected strings for old_secret, new_secret, and token.');
        };

        const secret = { old_secret: old_secret, new_secret: new_secret }
        const options = {
            method: "patch",
            url: new URL (`${this.usersEndpoint}/secret`, this.users_url),
            maxBodyLength: 2000,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: secret,
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.updateuserpassword,
                        error.response.status
                    );
                };
            });
    }

    Get(user_id, token) {
        // Get a user
        /**
         * Provides information about the user with provided ID. The user is
         * retrieved using authorization user_token.
         * @method Get - Get a user.
         * @param {String} user_id - User ID.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user_id = "886b4266-77d1-4258-abae-2931fb4f16de"
         * 
         */

        if (typeof user_id !== 'string' || user_id === null) {
            throw new Error('Invalid user_id parameter. Expected a string.');
        };

        this.ValidateUserAndToken({}, token);

        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: new URL (`${this.usersEndpoint}/${user_id}`, this.users_url),
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
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.get,
                        error.response.status
                    );
                };
            });
    }

    GetAll(query_params, token) {
        // Gets all users with pagination.
        /**
         * Provides information about all users. The users are retrieved using
         * authorization user_token.
         * 
         * @method Get_all - Gets all users with pagination.
         * @param {Object} query_params - Query parameters.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
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

        this.ValidateUserAndToken({}, token);

        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: new URL (`${this.usersEndpoint}?${new URLSearchParams(query_params).toString()}`, this.users_url),
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            }
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.getall,
                        error.response.status
                    );
                };
            });
    }

    Disable(user, user_id, token) {
        // Disable a user
        /**
         * Disables a user with provided ID and valid token.
         * @method Disable - Disable a user.
         * @param {Object} user - User object.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
         * "status": "disabled"
         * }
         */

        this.ValidateUserAndToken(user, token);

        if (typeof user_id !== 'string' || user_id === null) {
            throw new Error('Invalid user_id parameter. Expected a string.');
        }

        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: new URL (`${this.usersEndpoint}/${user_id}/disable`, this.users_url),
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: user,
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.disable,
                        error.response.status
                    );
                };
            });
    }

    Enable(user, user_id, token) {
        // Enable a user.
        /**
         * Enables a previously disabled user when provided with token and valid ID.
         * @method Enable - Enable a user.
         * @params {Object} user - User object.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
         * "status": "enabled"
         * }
         * 
         */

        this.ValidateUserAndToken(user, token);

        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: new URL (`${this.usersEndpoint}/${user_id}/enable`, this.users_url),
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: user,
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.enable,
                        error.response.status
                    );
                };
            });
    }

    Memberships(member_id, query_params, token) {
        // Get memberships of a user.
        /**
         * Gets the various groups a user belongs to.
         * @method Memberships - Get memberships of a user.
         * @param {String} member_id - Member ID.
         * @param {Object} query_params - Query parameters for example offset and limit.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         */

        if (typeof query_params !== 'object' || query_params === null || Array.isArray(query_params)) {
            throw new Error('Invalid query parameters. Expected an object.');
        };

        if (typeof member_id !== 'string' || member_id === null) {
            throw new Error('Invalid member_id parameter. Expected a string.');
        }

        this.ValidateUserAndToken({}, token);

        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: new URL (`${this.usersEndpoint}/${member_id}/memberships?${new URLSearchParams(query_params).toString()}`, this.users_url),
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
                if (error.response) {
                    return this.userError.HandleError(
                        this.userError.users.memberships,
                        error.response.status
                    );
                };
            });
    }

    AuthoriseUser(user_id, group_id, action, entity_type, token) {
        //Authorises user to perform an action on an entity
        /**
         * Authorises user to perform an action on an entity. The user needs to be a member of the
         * group to be able to have authority over it.
         * @method AuthoriseUser - Authorises user to perform an action on an entity.
         * @param {String} user_id - User ID which is the Subject.
         * @param {String} group_id - Group ID which is the Object.
         * @param {String} action - Action to be performed on the entity.
         * @param {String} entity_type - Type of entity eg client.
         * @return {Boolean} - Returns true if the user is authorised to perform the action.
         */

        if (
            typeof user_id !== 'string' ||
            typeof group_id !== 'string' ||
            typeof action !== 'string' ||
            typeof entity_type !== 'string' ||
            typeof token !== 'string') {
            throw new Error('Invalid parameter types. Expected strings for user_id, group_id, action, entity_type, and token.');
        };

        const access_request = {
            "subject": user_id,
            "object": group_id,
            "action": action,
            "entity_type": entity_type
        }
        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: new URL(`authorize`, this.users_url),
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: access_request,
        };
        return axios.request(options)
            .then((_response) => {
                return true;
            })
            .catch((_error) => {
                return false;
            });
    }
}

module.exports = Users;
