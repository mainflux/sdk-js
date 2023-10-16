// import Errors from "./errors.js";

const axios = require("axios");

class Certs {
    //Certs API Client
    /**
     *@class Certs - Certs is used to manage certificates.
     *It is used to issue, view and revoke certificates.
     * @param {string} certs_url - The url of the certs service.
     * @returns {Certs} - Returns a Certs object. 
     */
    constructor(certs_url) {
        this.certs_url = certs_url;
        this.content_type = "application/json";
        this.certsEndpoint = "certs";
    }
    ValidateThingIDAndToken(thing_id, token) {
        if (typeof thing_id !== "string" || thing_id === null) {
            throw new Error('Invalid thing_id parameter. Expected a string.');
        }
        if (typeof token !== "string" || token === null) {
            throw new Error('Invalid token parameter. Expected a string.');
        }
    }

    Issue(thing_id , valid, token) {
        //Issue a certificate
        /**
         * @method Issue - Issue a certificate to a thing.
         * Requires a thing_id and a valid time in hours as well as a token.
         * @param {string} thing_id - The thing_id of the thing to be issued a certificate.
         * @param {string} valid - The time in hours for which the certificate is valid such as '10h'
         * @example 
         * const certs = {
         * "cert_serial": "22:16:df:60:c2:99:bc:c4:9b:1d:fd:71:5e:e9:07:d9:1b:3c:85:1d",
         *  "client_cert": "-----BEGIN CERTIFICATE-----\nMIIEATCCAumgAwIBAgIUIhbfYMKZvMSbHf1xXukH2Rs8hR0wDQYJKoZIhvcNAQEL1k\n-----END CERTIFICATE-----",
         * "client_key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEoQIBAAKCAQEAy9gF84a5s6jlX6hkAPXrLYqvdhe6uygdr6eHfd5erdcdxfgc\n-----END RSA PRIVATE KEY-----",
         * "expiration": "2023-09-20T10:02:48Z",
         * "thing_id": "3d49a42f-63fd-491b-9784-adf4b64ef347"
         *  }
         */

        this.ValidateThingIDAndToken(thing_id, token);

        const payload= {"thing_id": thing_id, "ttl": valid};
        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: `${this.certs_url}/${this.certsEndpoint}`,
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

    ViewByThing(thing_id, token) {
        
        //View certificates by thing_id
        /**
         * @method ViewByThing - Allows a logged in user to view a certificate serial once they
         * provide a valid connected thing-id and token.
         * @param {string} thing_id - The thing_id of the thing whose certificate is to be viewed.
         * @param {string} token - The token to be used for authentication. 
         * 
         */

        this.ValidateThingIDAndToken(thing_id, token);

        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: `${this.certs_url}/serials/${thing_id}`,
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

    ViewBySerial(cert_id, token) {
        //View certificate by cert_id
        /**
         * @method ViewBySerial - Allows a logged in user to view a certificate once they
         * provide a valid cert-id and token.
         * @param {string} cert_id - The cert_id of the certificate to be viewed.
         * @param {string} token - The token to be used for authentication. 
         * 
         */

        if (typeof cert_id !== "string" || cert_id === null) {
            throw new Error('Invalid cert_id parameter. Expected a string.');
        }

        this.ValidateThingIDAndToken('', token);

        const options = {
            method: "get",
            maxBodyLength: 2000,
            url: `${this.certs_url}/${this.certsEndpoint}/${cert_id}`,
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

    Revoke(thing_id, token) {
        //Revoke a certificate
        /**
         * @method Revoke - Allows a logged in user to delete a certificate once they
         * provide a valid thing-id and token.
         * @param {string} thing_id - The thing_id of the certificate to be revoked.
         * @param {string} token - The token to be used for authentication. 
         */

        this.ValidateThingIDAndToken(thing_id, token);

        const options = {
            method: "delete",
            maxBodyLength: 2000,
            url: `${this.certs_url}/${this.certsEndpoint}/${thing_id}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.request(options)
            .then((_response) => {
                return "DELETED";
            })
            .catch((error) => {
                return error.response.data;
            })
    }

}

module.exports = Certs;
