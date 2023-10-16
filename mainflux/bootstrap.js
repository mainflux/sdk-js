const axios = require('axios');

class  Bootstrap{
    //Bootstraps API Client
    /**
     * @class Bootstrap
     * Bootstrap is used to manage bootstrap configurations.
     * It is used to create, update, view and remove bootstrap configurations.
     * It is also used to bootstrap a thing.
     * @param {string} bootstraps_url - The url of the bootstraps service.
     * @returns {Bootstrap} - Returns a Bootstrap object.
     * 
     */
    constructor(bootstraps_url){
        this.bootstraps_url = bootstraps_url;
        this.content_type = "application/json";
        this.bootstrapsEndpoint = "configs";
    }

    ValidateConfigAndToken(config, token){
    //Validate config
        if (typeof config !== "object" || config === null) {
            throw new Error('Invalid config parameter. Expected an object.');
        }

        // Validate token
        if (typeof token !== "string" || token === null) {
            throw new Error('Invalid token parameter. Expected a string.');
        }    
    }

    Create(config, token){
        //Create a bootstrap configuration
        /**
         * @method Create - Create a new bootstrap configuration. 
         * Some of the key data needed include the external_key and external_id which must be
         * specific to the thing provided with the thing_id. Mind that every configuration 
         * must have a specific thing_id.
         * @param {object} config - The configuration object.
         * @param {string} token - The token to be used for authentication.
         * @example
         * const config = {
         *      "external_id": "345",
         *      "external_key": "012",
         *      "thing_id": "3d49a42f-63fd-491b-9784-adf4b64ef347",
         *      "name": "thing_name"
         *   } 
         */

        this.ValidateConfigAndToken(config, token);

        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: `${this.bootstraps_url}/things/${this.bootstrapsEndpoint}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(config),
        };
        return axios.request(options)
            .then((_response) => {
                return "Configuration added";
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Whitelist(config, token){
        //Update a bootstrap configuration
        /**
         * @method Whitelist - Allows a logged in user to update a bootstrap configuration.
         * This changes the status of the config to whitelisted.
         * @param {object} config - The configuration object.
         * @param {string} token - The token to be used for authentication.
         * @example
         * const config = {
         *      "external_id": "345",
         *      "external_key": "012",
         *      "thing_id": "3d49a42f-63fd-491b-9784-adf4b64ef347",
         *      "name": "thing_name"
         * }
         */

        this.ValidateConfigAndToken(config, token);

        const options = {
            method: "put",
            maxBodyLength: 2000,
            url: `${this.bootstraps_url}/things/state/${config["thing_id"]}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(config),
        };
        return axios.request(options)
            .then((_response) => {
                return "Configuration updated";
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Update(config, token){
        //Update a bootstrap configuration
        /**
         * @method Update - Allows a logged in user to update a bootstrap configuration.
         * This can change the name of the config and metadata. 
         * @param {object} config - The configuration object.
         * @param {string} token - The token to be used for authentication.
         * @example
         * const config = {
         *      "external_id": "345",
         *      "external_key": "012",
         *      "thing_id": "3d49a42f-63fd-491b-9784-adf4b64ef347",
         *      "name": "thing_name"
         * }
         */

        this.ValidateConfigAndToken(config, token);

        const options = {
            method: "put",
            maxBodyLength: 2000,
            url: `${this.bootstraps_url}/things/configs/${config["thing_id"]}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(config),
        };
        return axios.request(options)
            .then((_response) => {
                return "Configuration updated";
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    View(thing_id, token){
        //View a bootstrap configuration
        /**
         * @method View - Allows a logged in user to view a bootstrap configuration.
         * Once provided with the thing_id and a valid token, it returns the configuration object.
         * @param {string} thing_id - The thing_id of the configuration to be viewed.
         * @param {string} token - The token to be used for authentication.
         */

        if (typeof thing_id !== "string" || thing_id === null) {
            throw new Error('Invalid thing_id parameter. Expected a string.');
        }

        this.ValidateConfigAndToken({}, token);

        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: `${this.bootstraps_url}/things/${this.bootstrapsEndpoint}/${thing_id}`,
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
                return error.response.data;
            })
    }

    UpdateCerts(config_id,client_cert,client_key, ca, token){
        //Update certs of a bootstrap configuration
        /**
         * @method UpdateCerts - Allows a logged in user to update the certs of a bootstrap configuration.
         * Update is performed by replacing the current certificate data with values provided in a request payload.
         * @param {string} config_id - The config_id of the configuration to be updated. This can also mean the thing_id.
         * @param {string} client_cert - The client certificate to be used.
         * @param {string} client_key - The client key to be used.
         * @param {string} ca - The certificate authority to be used.
         * @param {string} token - The token to be used for authentication.
         * 
         */

        if (typeof config_id !== "string" ||
            typeof client_cert !== "string" ||
            typeof client_key !== "string" ||
            typeof ca !== "string" ||
            typeof token !== "string" ) {
            throw new Error('Invalid parameter types. Expected strings for config_id, client_cert, client_key, ca and token.');
        };

        const payload = {
            "client_cert": client_cert,
            "client_key": client_key,
            "ca_cert": ca,
        }
        const options = {
            method: "patch",
            maxBodyLength: 2000,
            url: `${this.bootstraps_url}/configs/certs/${config_id}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(payload),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Remove(config_id, token){
        //Remove a bootstrap configuration
        /**
         * @method Remove - Allows a logged in user to delete a bootstrap configuration.
         * @param {string} config_id - The config_id of the configuration to be deleted. 
         * This can also mean the thing_id.
         * @param {string} token - The token to be used for authentication.
         * 
         */

        if (typeof config_id !== "string" || config_id === null) {
            throw new Error('Invalid config_id parameter. Expected a string.');
        }

        this.ValidateConfigAndToken({}, token);

        const options = {
            method: "delete",
            maxBodyLength: 2000,
            url: `${this.bootstraps_url}/things/${this.bootstrapsEndpoint}/${config_id}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.request(options)
            .then((_response) => {
                return "Configuration removed";
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Bootstrap(external_id, external_key){
        //Retrive a bootstrap configuration
        /**
         * @method Bootstrap - Retrieves a configuration with given external ID and encrypted external key.
         * @param {string} external_id - The external ID of the configuration to be retrieved.
         * @param {string} external_key - The encrypted external key of the configuration to be retrieved.
         * @return {object} - Returns a config object.
         */

        if (typeof external_id !== "string" || typeof external_key !== "string") {
            throw new Error('Invalid type of parameters. Expected strings for external_key and external_id.');
        }
        
        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: `${this.bootstraps_url}/things/bootstrap/${external_id}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Thing ${external_key}`,
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

module.exports = Bootstrap;
