[{
    id: "asdfgeregegerg",
    name: "heinrich",
    room: "Cool Room"
}]

var _ = require("lodash");

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            _.remove(this.users, x => x.id === id);
        }

        return user;
    }

    getUser(id) {
        return this.users.filter(x => x.id === id)[0];
    }

    getUserList(room) {
        return this.users.filter(x => x.room === room)
            .map(x => x.name);
    }

    nameTaken(name, room) {
        return _.filter(this.users, x => x.name === name && x.room === room)
            .length > 0;
    }

    getAllRooms() {
        // use of union efficient?
        return _.union(_.map(this.users, x => x.room), []);
    }
}

module.exports = { Users }