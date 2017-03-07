const expect = require("expect");

const { Users } = require("./users");


describe("Users", () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: "heinrich",
            room: "Nodejs"
        },{
            id: 2,
            name: "haha",
            room: "Javascript"
        },{
            id: 3,
            name: "pro",
            room: "Nodejs"
        }]
    })

    it("should add new user", () => {
        var users = new Users();

        var user = {
            id: 123,
            name: "heinrich",
            room: "fancy room"
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([resUser]);
    })

    it("should return names from node room", () => {
        var userlist = users.getUserList("Nodejs");

        expect(userlist).toEqual(["heinrich", "pro"]).toNotInclude("haha");
    })

    it("should find user by id", () => {
        var user = users.getUser(1)

        expect(user).toEqual(users.users[0]);
    })

    it("should not find user when id not exist", () => {
        var user = users.getUser(2141);

        expect(user).toNotExist();
    })

    it("should remove user by id", () => {
        expect(users.users.length).toBe(3);
        
        var removedUser = users.removeUser(1);

        expect(removedUser.id).toBe(1);
        expect(users.users).toExclude(removedUser);
        expect(users.users.length).toBe(2);
    })

    it("should not remove any user when id not exist", () => {
        var removedUser = users.removeUser(1214);

        expect(users.users.length).toBe(3);
        expect(removedUser).toNotExist();
    })
})