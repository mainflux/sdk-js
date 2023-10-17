class Errors {
    HandleError(error_dict, status_code) {
        if (error_dict.hasOwnProperty(status_code)) {
            return error_dict[status_code];
        } else {
            return this.errors[status_code];
        }
    }

    errors = {
        400: "Failed due to malformed JSON.",
        401: "Missing or invalid access token provided.",
        403: "Missing or invalid access token provided.",
        404: "A non-existent entity request.",
        409: "Entity already exists.",
        415: "Missing or invalid content type.",
        422: "Database can't process the request.",
        500: "Unexpected server-side error occurred.",
    };

    users = {
        get : {
            401: "Missing or invalid access token provided.",
            404: "A non-existent entity request.",
            400: "Failed due to malformed query parameters.",
        },
        create: {
            409: "Entity already exists.",
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
        },
        login: {
            404: "A non-existent entity request.",
        },
        refreshtoken: {
            404: "A non-existent entity request.",
        },
        update: {
            404: "Failed due to a non-existing user.",
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
        },
        updateusertags:{
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
        },
        updateuserpassword:{
            500: "Unexpected server-side error occurred.",
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
        },
        updateuseridentity:{
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
        },
        updateuserowner:{
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
            404: "A non-existent entity request.",
        },
        getall: {
            400: "Failed due to malformed query parameters.",
            500: "Unexpected serverside error occurred.",
            401: "Missing or invalid access token provided.",
        },
        disable: {
            401: "Missing or invalid access token provided.",
        },
        enable: {
            401: "Missing or invalid access token provided.",
        },
        memberships:{
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed query parameters.",
        },
        authoriseuser: {
            401: "Failed to perform authorisation.",
            400: "Failed due to malformed JSON.",
        },
    }

    groups= {
        get : {
            401: "Missing or invalid access token provided.",
            404: "Group does not exist.",
            400: "Failed due to malformed query parameters.",
        },
        getall : {
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed query parameters.",
        },
        create : {
            401: "Missing or invalid access token provided.",
            404: "A non-existent entity request.",
            400: "Failed due to malformed query parameters.",
        },
        children : {
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed query parameters.",
        },
        parents : {
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed query parameters.",
        },
        update : {
            401: "Missing or invalid access token provided.",
            404: "Group does not exist.",
        },
        assign : {
            500: "Unexpected server-side error occurred.",
        },
        unassign : {
            401: "Missing or invalid access token provided.",
            500: "Unexpected server-side error occurred.",
        },
        disable: {
            401: "Missing or invalid access token provided.",
        },
        members:{
            401: "Missing or invalid access token provided.",
        },

    }

    things ={
        create : {
            500: "Unexpected server-side error occurred.",
            401: "Missing or invalid access token provided.",
        },
        createbulk : {
            500: "Unexpected server-side error occurred.",
            400: "Failed due to malformed JSON.",
            401: "Missing or invalid access token provided.",
            },
        getbychannel : {
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed query parameters.",    
            },
        disable : {
            500: "Unexpected server-side error occurred.",
            400: "Failed due to malformed JSON.",
            401: "Missing or invalid access token provided.",       
            },
        connect : {
            400: "Failed due to malformed JSON.",
            401: "Missing or invalid access token provided.",             
            },
        disconnect : {
            400: "Failed due to malformed JSON.",
            401: "Missing or invalid access token provided.",                      
            },
        update : {
            500: "Unexpected server-side error occurred.",
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
            404: "Failed due to a non-existing thing.",
        },
        updatethingsecret : {
            409: "Entity already exists.",
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
            404: "Failed due to a non-existing thing.", 
            },
        updatethingtags : {
            500: "Unexpected server-side error occurred.",
            404: "Failed due to a non-existing thing.",
        },
        updatethingowner : {
            500: "Unexpected server-side error occurred.",
            404: "Failed due to a non-existing thing.",
        },
        connects : {
            500: "Unexpected server-side error occurred.",
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
        },
        identifything : {
            404: "A non-existent entity request.",
            415: "Missing or invalid content type.",
        },
        get :{
            401: "Missing or invalid access token provided.",
        },
        getall :{
            500: "Unexpected server-side error occurred.",
            400: "Failed due to malformed query parameters.",
            401: "Missing or invalid access token provided.",
        },
    }

    certs ={
        issue : {
            500: "Unexpected server-side error occurred.",
            401: "Missing or invalid access token provided.",
        },
        viewbyserial :{
            500: "Unexpected server-side error occurred.",
            401: "Missing or invalid access token provided.",
        },
        viewbything :{
            500: "Unexpected server-side error occurred.",
            401: "Missing or invalid access token provided.",
        },
        revoke : {
            500: "Unexpected server-side error occurred.",
            404: "Failed to revoke corresponding certificate.",
            401: "Missing or invalid access token provided.",
        }    
    }

    channels = {
        create : {
            401: "Missing or invalid access token provided.",
            409: "Entity already exists.",
        },
        get : {
            401: "Missing or invalid access token provided.",
            404: "Channel does not exist.",
        },
        getall : {
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed query parameters.",
        },
        createbulk : {
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
            409: "Entity already exists.",
        },
        getbything : {
            500: "Unexpected server-side error occurred.",
        },
        update : {
            401: "Missing or invalid access token provided.",
            400: "Failed due to malformed JSON.",
            404: "Failed due to a non-existing channel.",
        },
        disable : {
            401: "Missing or invalid access token provided.",
            404: "Failed due to a non-existing channel.",
        },
    }

    messages = {
        send : {
            400 : "Message discarded due to its malformed content.",
            401 : "Missing or invalid access token provided.",
            404 :  "Message discarded due to invalid channel id.",
        },
        read : {
            401 : "Missing or invalid access token provided.",
            400 : "Failed due to malformed query parameters.",
        }
    }

    bootstraps = {
        create : {
            401 : "Missing or invalid access token provided.",
            400 : "Failed due to malformed JSON.",
        },
        whitelist : {
            401 : "Missing or invalid access token provided.",
            404 : "A non-existent entity request.",
            400 : "Failed due to malformed query parameters.",
        },
        update : {
            401 : "Missing or invalid access token provided.",
            404 : "Config does not exist.",
        },
        remove : {
            401 : "Missing or invalid access token provided.",
            400 : "Failed due to malformed config ID",
        },
        view : {
            401 : "Missing or invalid access token provided.",
            400 : "Failed due to malformed query parameters.",
        },
        updatecerts : {
            401 : "Missing or invalid access token provided.",
            404 : "Config does not exist",
            400 : "Failed due to malformed JSON.",
        },
        bootstrap : {
            401 : "Missing or invalid external key provided.",
        },
    }
}

module.exports = Errors;
