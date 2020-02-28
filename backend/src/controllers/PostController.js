const Post = require('../models/Post');
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')



module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts)
    },
     async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        let { filename: image } = req.file;

        const newname = Math.random().toString(36).substr(2, 15) + Date.now().toString(36) + Math.random().toString(36).substr(2, 15) + Math.random().toString(36).substr(2, 15);
        const [name, ext] = image.split('.');
        image = `${newname}.jpg`;

        await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70})
        .toFile(
            path.resolve(req.file.destination, 'resized', image)
        )

        fs.unlinkSync(req.file.path)


        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image
        })

        req.io.emit('post', post)

        return res.json(post)

     }
}