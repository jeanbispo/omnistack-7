const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const routes = new express.Router();
const upload = multer(uploadConfig);

const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')

routes.get('/posts', PostController.index)
routes.post('/posts', upload.single('image'), PostController.store)

routes.post('/posts/:id/like', LikeController.store)




routes.get('/', (req, res) => {
res.json({'ok': 'success'})
})


module.exports = routes;