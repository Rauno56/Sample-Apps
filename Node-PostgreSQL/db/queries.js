var knex = require('./knex.js');
/*
 * Queries
 */
function getTopActiveUsers(pageLimit, offset) {
    return knex.raw("SELECT ID,count,created_at,name, array_agg(listings) as listings FROM (SELECT name, users.id as ID, count(users.id), users.created_at FROM users LEFT JOIN applications ON users.id = applications.user_id group by users.id) as A LEFT JOIN (SELECT user_id, listings.name as listings FROM listings, applications WHERE listings.id = applications.listing_id and applications.created_at > clock_timestamp() - interval '7 year' order by applications.created_at) as B ON A.ID = B.user_id group by ID,count,created_at,name ORDER BY ID OFFSET " + offset + " ROWS LIMIT " + pageLimit + "");
}

function getUserData(userId) {
    return knex.raw("SELECT id, name, created_at as createdAt FROM users WHERE users.id = " + userId + "");
}

function getUserCompanies(userId) {
    return knex.raw("SELECT companies.id, companies.name, companies.created_at as createdAt, teams.contact_user as isContact FROM companies,teams,users WHERE teams.user_id=users.id and teams.company_id=companies.id and users.id=" + userId + "");
}

function getUserListings(userId) {
    return knex.raw("SELECT listings.id, listings.name , listings.created_at, listings.description FROM listings,users WHERE users.id=listings.created_by and users.id=" + userId + "");
}

function getUserApplications(userId) {
    return knex.raw("SELECT applications.id as id, json_build_object('id', applications.listing_id, 'name', listings.name, 'description', listings.description) as listing, applications.cover_letter FROM applications, users, listings WHERE users.id=applications.user_id and applications.listing_id=listings.id and users.id=" + userId + "");
}
module.exports = {
    getUserData: getUserData,
    getUserListings: getUserListings,
    getUserCompanies: getUserCompanies,
    getTopActiveUsers: getTopActiveUsers,
    getUserApplications: getUserApplications,
};