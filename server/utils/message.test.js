const expect = require("expect");

const generateMessage = require("./message");

describe("generateMessage", () => {
    it("should generate the correct message object", () => {
        var from = "haha"
        var text = "hihi";
        var obj = generateMessage.generateMessage(from, text);

        expect(obj).toInclude({ from, text });
        expect(obj.createdAt).toBeA("number");
    })
});

describe("generateLocationMessage", () => {
    it("should generate the correct location message object", () => {
        var from = "admin"
        var lat = 53.55;
        var long = 9.99;
        var url = "https://www.google.com/maps?q=" + lat + "," + long;
        var obj = generateMessage.generateLocationMessage(from, lat, long);

        expect(obj).toInclude({ from, url });
        expect(obj.createdAt).toBeA("number");
    })
});