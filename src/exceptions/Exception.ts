class Exception extends Error {

    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;

        Object.setPrototypeOf(this, Exception.prototype);
    }

    getMessage() {
        return this.message
    }

    getStatusCode() {
        return this.statusCode
    }
}

export { Exception }