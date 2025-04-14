export default class ApiException extends Error {
    status: number;
    errors: any[];

    constructor(status: number, message: string, errors: any[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiException(401, 'Пользователь не авторизован')
    }
    static BadRequest(message: string, errors?: any[]) {
        return new ApiException(400, message, errors);
    }
}
