const axios = require("axios");

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
    this.things_url = things_url;
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
      url: `${this.things_url}/${this.thingsEndpoint}`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(thing),
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
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
      url: `${this.things_url}/${this.thingsEndpoint}/bulk`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(things),
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
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
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
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
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}/channels?${new URLSearchParams(query_params).toString()}`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
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
      url: `${this.things_url}/${this.thingsEndpoint}?${new URLSearchParams(query_params).toString()}`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
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
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}/disable`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
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
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(thing),
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
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
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}/secret`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(thing),
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
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
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}/tags`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(thing),
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
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
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}/owner`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(thing),
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }

  Connect(thing_id, channel_id, action, token) {
    //Connects thing to channel.
    /**
     * @method Connect - Connects thing to channel when provided with a valid token,
     * channel id and a thing id. The thing must have an action that it can perform over
     * the channel.
     * @param {string} thing_id - Thing ID.
     * @param {string} channel_id - Channel ID.
     * @param {list} action - Action for example: ["m_read", "m_write"].
     * @param {string} token - User token.
     *
     */
    if (typeof channel_id !== 'string' || channel_id === null) {
      throw new Error('Invalid channel_id parameter. Expected a string.');
    };

    if (!Array.isArray(action)) {
      throw new Error('Invalid parameter. Expected an array for action.');
    };

    this.ValidateThingIdThingAndToken(thing_id, {}, token);

    const payload = { subject: thing_id, object: channel_id, action: action };
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: `${this.things_url}/policies`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(payload),
    };
    return axios
      .request(options)
      .then((_response) => {
        return "Policy created.";
      })
      .catch((error) => {
        return error.response.data;
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
      url: `${this.things_url}/connect`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(payload),
    };
    return axios
      .request(options)
      .then((_response) => {
        return "Policy created.";
      })
      .catch((error) => {
        return error.response.data;
      });
  }

  Disconnect(thing_id, channel_id, token) {
    //Disconnects thing from channel.
    /**
     * @method Disconnect - Disconnects thing from channel when provided with a valid token,
     * channel id and a thing id.
     * @param {list} thing_id - Thing ID.
     * @param {list} channel_id - Channel ID.
     * @param {string} token - User token.
     *
     */

    if (typeof channel_id !== 'string' || channel_id === null) {
      throw new Error('Invalid channel_id parameter. Expected a string.');
    };

    this.ValidateThingIdThingAndToken(thing_id, {}, token);
    
    const payload = { "subjects": thing_id, "objects": channel_id }
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: `${this.things_url}/disconnect`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(payload),
    };
    return axios
      .request(options)
      .then((_response) => {
        return "Policy deleted.";
      })
      .catch((error) => {
        return error.response.data;
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
      url: `${this.things_url}/identify`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Thing ${thing_key}`,
      },
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
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
     * @param {string} entity_type - Type of the thing class for example: "client"
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
      subject: thing_id,
      object: channel_id,
      action: action,
      entity_type: entity_type,
    };
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: `${this.things_url}/channels/object/access`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(access_request),
    };
    return axios
      .request(options)
      .then((_response) => {
        return true;
      })
      .catch((_error) => {
        return false;
      });
  }
}

module.exports = Things;
