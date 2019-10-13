module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/descuento-factura'
    },
    test: {
        client: 'pg',
        connection: 'postgres://localhost/test-descuento-factura'
    },
}