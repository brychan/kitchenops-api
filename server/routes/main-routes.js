const express = require('express')
const router = express.Router()

const ingredientsRoutes = require('./ingredient-routes')
const providersRoutes = require('../routes/provider-routes')

router.use('/ingredients', ingredientsRoutes)
router.use('/providers', providersRoutes)

/*
react-admin:
*getList 	GET http://my.api.url/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}
*getOne 	GET http://my.api.url/posts/123
*getMany 	GET http://my.api.url/posts?filter={"ids":[123,456,789]}
*getManyReference 	GET http://my.api.url/posts?filter={"author_id":345}
*create 	POST http://my.api.url/posts
update 	PUT http://my.api.url/posts/123
updateMany 	Multiple calls to PUT http://my.api.url/posts/123
delete 	DELETE http://my.api.url/posts/123
deleteMany 	Multiple calls to DELETE http://my.api.url/posts/123
*/

module.exports = router
