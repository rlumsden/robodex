const errorHandler = (err, req, res, next) => {

    const { message, stack } = err
    const { code } = res
    
    const statusCode = code || 500

    res.status(statusCode)

    res.json({
        message,
        stack
    })
}

module.exports = errorHandler