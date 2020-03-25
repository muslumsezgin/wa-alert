const successCode    = 100;
const errorCode      = 999;
const successMessage = 'Success';
const errorMessage   = 'Unknown Error';

module.exports = class ReturnObject {
    constructor(response = {code: errorCode, message: errorMessage}) {
        this.code = response.code || successCode;
        this.message = response.message || successMessage;
        this.payload = response.payload
    }
};
