module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/descuento-factura'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    },
    test: {
        client: 'pg',
        connection: 'postgres://localhost/test-descuento-factura'
    },
}