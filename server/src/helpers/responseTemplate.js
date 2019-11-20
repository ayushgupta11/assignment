export const success = (response, data) => {
    return response.status(200).send({
        error: false,
        message: "success",
        "data": data || {}
    })
}

export const internalServerError = (response, data) => {
    return response.status(500).send({
        error: true,
        message: "Internal Server Error",
        "data": data || {}
    })
}

export const badRequest = (response, data) => {
    return response.status(422).send({
        error: true,
        message: "Bad Request",
        data: data || {}
    })
}

export const unAuthorized = (response, data) => {
    return response.status(401).send({
        error: true,
        message: "Unauthorized",
        data: data || {}
    })
}