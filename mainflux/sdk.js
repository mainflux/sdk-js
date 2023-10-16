const Users = require("./users");
const Things = require("./things");
const Groups = require("./groups");
const Channels = require("./channels");
const Certs = require("./certs");
const Bootstrap = require("./bootstrap");
const Messages = require("./messages");

const defaultUrl = "http://localhost";

class SDK {
  constructor({
    usersUrl = defaultUrl,
    thingsUrl = defaultUrl,
    groupsUrl = defaultUrl,
    channelsUrl = defaultUrl,
    certsUrl = defaultUrl,
    bootstrapsUrl = defaultUrl,
    readersUrl = defaultUrl,
    httpadapterUrl = defaultUrl,
  } = {}) {
    this.users = new Users(usersUrl);
    this.things = new Things(thingsUrl);
    this.groups = new Groups(groupsUrl);
    this.channels = new Channels(channelsUrl);
    this.certs = new Certs(certsUrl);
    this.bootstrap = new Bootstrap(bootstrapsUrl);
    this.messages = new Messages(readersUrl, httpadapterUrl);
  }
}

// module.exports = SDK;
// Export the SDK class for use in a web browser
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = SDK; // For Node.js
} else {
  window.SDK = SDK; // For browsers
}
