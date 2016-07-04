module.exports = {
    'test': {
        client: 'pg',
        connection: 'http://kijyyby7te:kauresuoaf@assignment.codsssqklool.eu-central-1.rds.amazonaws.com:5432/kijyyby7te_db',
        pool: {
            min: 2,
            max: 7
        },
        acquireConnectionTimeout: 20000
    },
    'development': {
        client: 'pg',
        connection: 'http://kijyyby7te:kauresuoaf@assignment.codsssqklool.eu-central-1.rds.amazonaws.com:5432/kijyyby7te_db',
        pool: {
            min: 2,
            max: 7
        },
        acquireConnectionTimeout: 20000
    }
};