const expect = require("expect");

const {isRealString} = require("./validation");

describe("is real string", () => {
    it("should reject non-string values", () => {
        expect(isRealString(242384)).toBeFalsy();
    })
    it("should reject string with only spaces", () => {
        expect(isRealString("    ")).toBeFalsy();
    })
    it("should allow string with non space characters", () => {
        expect(isRealString("asddf")).toBeTruthy();
    })
})
