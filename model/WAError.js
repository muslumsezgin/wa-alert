module.exports = class WAError {
    constructor(code = 999, message = "Unknown Error") {
        this.code = code;
        this.message = message
    }
};
