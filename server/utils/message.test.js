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