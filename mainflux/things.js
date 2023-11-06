const axios = require("axios");
const Errors = require("./errors");

class Things {
  // Things service client.
  /**
   * @class Things - 
   * Things API is used for creating and managing things.
   * It is used for creating, updating, deleting and retrieving things.
   * @param {string} things_url - Things service URL.
   * @returns {Object} - Things service client.  
   */
  constructor(things_url) {
    this.things_url = new URL (things_url);
    this.content_type = "application/json";
    this.thingsEndpoint = "things";
  }

  ValidateThingIdThingAndToken(thing_id, thing, token) {
    // Validate thing_id
    if (typeof thing_id !== 'string' || thing_id === null) {
        throw new Error('Invalid parameter. Expected a string for the "thing_id" parameter.');
    }

    // Validate thing
    if (typeof thing !== 'object' || thing === null || Array.isArray(thing)) {
        throw new Error('Invalid parameter. Expected an object for the "thing" parameter.');
    }

    // Validate token
    if (typeof token !== 'string' || token === null) {
        throw new Error('Invalid parameter. Expected a string for the "token" parameter.');
    }
  }

  thingError = new Errors;

  Create(thing, token) {
    //Creates a new thing.
    /**
     * @method Create - Creates a new thing when provided with 
     * the things information and a valid token.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "string",
     * "tags": [
     * "tag1",
     * "tag2"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret": "bb7edb32-2eac-4aad-aebe-ed96fe073879"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "metadata": {
     * "domain": "example.com"
     * },
     * "status": "enabled"
     * }
     */

    this.ValidateThingIdThingAndToken('', thing, token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(this.thingsEndpoint, this.things_url),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: thing,
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.create,
            error.response.status
          );
        };
      });
  }

  CreateBulk(things, token) {
    //Creates multiple things.
    /**
     * @method Create_bulk - Creates multiple things when provided with a valid
     * token and an array of things information such as names. 
     * @param {list} things - An array of things information.
     * @param {string} token - User token.
     * @returns {list} - Things list.
     * @example
     * const things = [
     * {
     * "name": "thing1"
     * },
     * {
     * "name": "thing2"
     * }
     * ]
     */

    if (!Array.isArray(things)) {
      throw new Error('Invalid parameter. Expected an array for the "things" parameter.');
    }

    this.ValidateThingIdThingAndToken('', {}, token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL (`${this.thingsEndpoint}/bulk`, this.things_url),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: things,
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.createbulk,
            error.response.status
          );
        };
      });
  }

  Get(thing_id, token) {
    //Retrieves thing information.
    /**
     * @method Get - Retrieves thing information when provided with a valid token
     * and thing ID.
     * @param {string} thing_id - Thing ID.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing_id = "bb7edb32-2eac-4aad-aebe-ed96fe073879"
     * 
     */

    this.ValidateThingIdThingAndToken(thing_id, {}, token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(`${this.thingsEndpoint}/${thing_id}`, this.things_url),
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
          return this.thingError.HandleError(
            this.thingError.things.get,
            error.response.status
          );
        };
      });
  }

  GetByChannel(thing_id, query_params, token) {
    //Retrieves list of channels connected to specified thing with pagination metadata.
    /**
     * @method GetByChannel - Retrieves list of channels connected to specified thing 
     * with pagination metadata.
     * @param {string} thing_id - Thing ID.
     * @param {Object} query_params - Query parameters such as offset and limit.
     * @returns {Object} - Channels list.
     */

    if (typeof query_params !== 'object' || query_params === null || Array.isArray(query_params)) {
      throw new Error('Invalid query parameters. Expected an object.');
    };

    this.ValidateThingIdThingAndToken(thing_id, {}, token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL (`${this.thingsEndpoint}/${thing_id}/channels?${new URLSearchParams(query_params).toString()}`, this.things_url),
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
          return this.thingError.HandleError(
            this.thingError.things.getbychannel,
            error.response.status
          );
        };
      });
  }

  GetAll(query_params, token) {
    //Retrieves list of things with pagination metadata.
    /**
     * @method GetAll - Retrieves list of things with pagination metadata when provided with a 
     * valid token and correct query parameters such as offset and limit.
     * @param {Object} query_params - Query parameters.
     * @param {string} token - User token.
     * @returns {Object} - Things list.
     */

    if (typeof query_params !== 'object' || query_params === null || Array.isArray(query_params)) {
      throw new Error('Invalid query parameters. Expected an object.');
    };

    this.ValidateThingIdThingAndToken('', {}, token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL (`${this.thingsEndpoint}?${new URLSearchParams(query_params).toString()}`, this.things_url),
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
          return this.thingError.HandleError(
            this.thingError.things.getall,
            error.response.status
          );
        };
      });
  }

  Disable(thing_id, token) {
    //Disables thing.
    /**
     * @method Disable - Deletes a thing when provided with a valid token and thing ID.
     * @param {string} thing_id - Thing ID.
     * @param {string} token - User token.
     * @returns {Object} - Thing object with statys disabled. 
     */

    this.ValidateThingIdThingAndToken(thing_id, {}, token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL (`${this.thingsEndpoint}/${thing_id}/disable`, this.things_url),
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
          return this.thingError.HandleError(
            this.thingError.things.disable,
            error.response.status
          );
        };
      });
  }

  Update(thing_id, thing, token) {
    //Updates thing.
    /**
     * @method Update - Updates thing when provided with a valid token, 
     * thing ID and thing object.
     * @param {string} thing_id - Thing ID.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "thing3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret":"12345678"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    this.ValidateThingIdThingAndToken(thing_id, thing, token);

    const options = {
      method: "patch",
      maxBodyLength: 2000,
      url: new URL (`${this.thingsEndpoint}/${thing_id}`, this.things_url),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: thing,
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.update,
            error.response.status
          );
        };
      });
  }

  UpdateThingSecret(thing_id, thing, token) {
    //Updates thing secret.
    /**
     * @method UpdateThingSecret - Updates thing secret when provided with a valid token,
     * thing ID and thing object.
     * @param {string} thing_id - Thing ID.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "thing3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret":"56788912"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    this.ValidateThingIdThingAndToken(thing_id, thing, token);

    const options = {
      method: "patch",
      maxBodyLength: 2000,
      url: new URL (`${this.thingsEndpoint}/${thing_id}/secret`, this.things_url),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: thing,
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.updatethingsecret,
            error.response.status
          );
        };
      });
  }

  UpdateThingTags(thing_id, thing, token) {
    //Updates thing tags.
    /**
     * @method UpdateThingTags - Updates thing tags when provided with a valid token,
     * thing ID and thing object.
     * 
     * @param {string} thing_id - Thing ID.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "thing3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret":"56788912"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    this.ValidateThingIdThingAndToken(thing_id, thing, token);

    const options = {
      method: "patch",
      maxBodyLength: 2000,
      url: new URL (`${this.thingsEndpoint}/${thing_id}/tags`, this.things_url),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: thing,
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.updatethingtags,
            error.response.status
          );
        };
      });
  }

  UpdateThingOwner(thing_id, thing, token) {
    //Updates thing owner.
    /**
     * @method UpdateThingOwner - Updates thing owner when provided with a valid token,
     * thing ID and thing object.
     * @param {string} thing_id - Thing ID.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "thing3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret":"56788912"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    this.ValidateThingIdThingAndToken(thing_id, thing, token);

    const options = {
      method: "patch",
      maxBodyLength: 2000,
      url: new URL (`${this.thingsEndpoint}/${thing_id}/owner`, this.things_url),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: thing,
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.updatethingowner,
            error.response.status
          );
        };
      });
  }

  Connect(thing_id, channel_id, actions, token) {
    //Connects thing to channel.
    /**
     * @method Connect - Connects thing to channel when provided with a valid token,
     * channel id and a thing id. The thing must have an action that it can perform over 
     * the channel.
     * @param {string} thing_id - Thing ID.
     * @param {string} channel_id - Channel ID.
     * @param {list} actions - Action for example: ["m_read", "m_write"].
     * @param {string} token - User token.
     * 
     */
    if (typeof channel_id !== 'string' || channel_id === null) {
      throw new Error('Invalid channel_id parameter. Expected a string.');
    };

    if (!Array.isArray(actions)) {
      throw new Error('Invalid parameter. Expected an array for action.');
    };

    this.ValidateThingIdThingAndToken(thing_id, {}, token);

    const payload = { "subject": thing_id, "object": channel_id, "actions": actions }
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL (`connect`, this.things_url.toString()),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    };
    console.log(options.url.toString())
    return axios.request(options)
      .then((_response) => {
        return "Policy created.";
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.connect,
            error.response.status
          );
        };
      });
  }

  Connects(thing_ids, channel_ids, actions, token) {
    //Connects multiple things to multiple channels.
    /**
     * @method Connects - Connects multiple things to multiple channels when provided with a valid token,
     * arrays of channel ids, thing ids and actions.
     * @param {list} thing_ids - Array of thing IDs.
     * @param {list} channel_ids - Array of channel IDs.
     * @param {list} actions - Array of actions for example: ["m_read", "m_write"].
     * @param {string} token - User token.
     * @returns {Object} - Policy object.
     * 
     */

    if (!Array.isArray(thing_ids) || !Array.isArray(channel_ids) || !Array.isArray(actions)) {
      throw new Error('Invalid parameters. Expected arrays for actions, things_ids and channel_ids.');
    };

    this.ValidateThingIdThingAndToken('', {}, token);

    const payload = { "subjects": thing_ids, "objects": channel_ids, "actions": actions }
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL (`connect`, this.things_url),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    };
    console.log(options.url.toString());
    return axios.request(options)
      .then((_response) => {
        return "Policy created.";
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.connects,
            error.response.status
          );
        };
      });
  }

  Disconnect(thing_ids, channel_ids, token) {
    //Disconnects thing from channel.
    /**
     * @method Disconnect - Disconnects thing from channel when provided with a valid token,
     * channel id and a thing id.
     * @param {list} thing_ids - Thing ID.
     * @param {list} channel_ids - Channel ID.
     * @param {string} token - User token.
     * 
     */

    if (!Array.isArray(channel_ids)) {
      throw new Error('Invalid parameter. Expected an array for channel_id.');
    };

    if (!Array.isArray(thing_ids)) {
      throw new Error('Invalid parameter. Expected an array for thing_id.');
    };

    this.ValidateThingIdThingAndToken('', {}, token);
    
    const payload = { "subjects": thing_ids, "objects": channel_ids }
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL (`disconnect`, this.things_url),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    };
    return axios.request(options)
      .then((_response) => {
        return "Policy deleted.";
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.disconnect,
            error.response.status
          );
        };
      });
  }

  IdentifyThing(thing_key) {
    //Validates thing's key and returns it's ID if key is valid
    /**
     * @method IdentifyThing - Validates thing's key and returns it's ID if key is valid. The method
     * does not require a token.
     * @param {string} thing_key - Thing secret.
     * @returns {Object} - Thing object.
     * 
     */

    if (typeof thing_key !== 'string' || thing_key === null) {
      throw new Error('Invalid thing_key parameter. Expected a string.');
    };

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(`identify`, this.things_url.toString()),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Thing ${thing_key}`,
      },
    };
    console.log(options.url.toString());
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.identifything,
            error.response.status
          );
        };
      });
  }

  AuthoriseThing(thing_id, channel_id, action, entity_type, token) {
    //Authorises thing
    /**
     * @method AuthoriseThing - Authorises a thing to perform an action on a channel 
     * when provided with a valid token, thing ID, channel ID, action and entity type.
     * @param {string} thing_id - Thing ID.
     * @param {string} channel_id - Channel ID.
     * @param {string} action - Action for example: ["m_read", "m_write"].
     * @param {string} entity_type - Type of the thing class for example: "group".
     * @param {string} token - User token.
     * @return {Object} - True if thing is authorised, false if not.
     */

    if (
      typeof thing_id !== 'string' || 
      typeof channel_id !== 'string' || 
      typeof action !== 'string' || 
      typeof entity_type !== 'string' || 
      typeof token !== 'string') {
      throw new Error('Invalid parameter types. Expected strings for thing_id, channel_id, action, entity_type, and token.');
    };
    const access_request = {
      "subject": thing_id,
      "object": channel_id,
      "action": action,
      "entity_type": entity_type
    }
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL (this.things_url + `channels/object/access`),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: access_request,
    };
    console.log(options.url.toString());
    return axios.request(options)
      .then((_response) => {
        return true;
      })
      .catch((_error) => {
        return false;
      })
  }

}

module.exports = Things;
