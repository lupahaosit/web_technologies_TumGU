export function setSuccessResponse(data: object = {}) {
    return {
        ok: true,
        data
    }
}

export function setFailureResponse(message: string, errors?: any[]) {
    return {
        ok: false,
        message,
        errors
    }
}
