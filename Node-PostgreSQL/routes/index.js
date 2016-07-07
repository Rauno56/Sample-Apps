var express = require('express');
var router = express.Router();
var logger = require('winston');
var queries = require('../db/queries');
/*
 * GET Top Active Users
 */
router.get('/topActiveUsers', function(req, res, next) {
    logger.log('info', 'Request for top active users.');
    var pageLimit = 5;
    var returnObject = {
        "error": 0,
        "message": "User Details Query Successfull!",
        "body": {}
    }
    var pageNumber = req.query.pageNumber;
    if (pageNumber === undefined) {
        returnObject.error = "1";
        returnObject.message = "Page Number field missing.";
        res.status(401).send(returnObject);
        logger.log('error', 'Page Number field missing.');
    } else if (pageNumber > 0) {
        var offset = (pageLimit * (pageNumber - 1));
        var topActiveUsers = null;
        queries.getTopActiveUsers(pageLimit, offset).then(function(response) {
            topActiveUsers = response.rows;
            returnObject.body = topActiveUsers;
            res.status(200).json(returnObject);
            logger.log('info', 'fetch topActiveUsers successful with ', {
                'topActiveUsers': topActiveUsers
            });
        }).catch(function(error) {
            next(error);
        });
    } else {
        returnObject.error = "1";
        returnObject.message = "Page Number Invalid!";
        logger.log('error', 'Page Number Invalid');
        res.status(401).send(returnObject);
    }
});
/*
 * GET Details for a User
 */
router.get('/users', function(req, res, next) {
    var USER_ID = parseInt(req.query.id);
    logger.log('info', 'Request for user details for', {
        'user_id': USER_ID
    });
    var returnObject = {
        "error": 0,
        "message": "User Details Query Successfull!",
        "body": {}
    };
    if (USER_ID) {
        Promise.all([
            queries.getUserData(USER_ID).then(function(response) {
                userData = response.rows[0];
                if (userData) {
                    logger.log('info', 'userData for', {
                        'user_id': USER_ID,
                        'userData': userData
                    });
                    return userData;
                } else {
                    returnObject.error = "1";
                    returnObject.message = "User Not Found!";
                    res.status(200).json(returnObject);
                    logger.log('error', 'user not found.', {
                        'user_id': USER_ID,
                        'userData': userData
                    });
                }
            }),
            queries.getUserApplications(USER_ID).then(function(response) {
                applicationData = response.rows;
                logger.log('info', 'applicationData for', {
                    'user_id': USER_ID,
                    'applicationData': applicationData
                });
                return applicationData;
            }),
            queries.getUserListings(USER_ID).then(function(response) {
                listingsData = response.rows;
                logger.log('info', 'listingsData for', {
                    'user_id': USER_ID,
                    'listingsData': listingsData
                });
                return listingsData;
            }),
            queries.getUserCompanies(USER_ID).then(function(response) {
                companyData = response.rows;
                logger.log('info', 'companyData for', {
                    'user_id': USER_ID,
                    'companyData': companyData
                });
                return companyData;
            }),
        ]).then(function(data) {
            if (!returnObject.error) {
                returnObject.body = {
                    id: data[0].id,
                    name: data[0].name,
                    created_at: data[0].created_at,
                    companies: data[3],
                    createdListings: data[2],
                    applications: data[1]
                }
                res.status(200).json(returnObject);
            }
        }).catch(next);
    } else {
        returnObject.error = "1";
        returnObject.message = "USER_ID not defined!";
        logger.log('error', 'USER_ID not defined');
        res.status(401).json(returnObject);
    }
});
module.exports = router;