const sequelize = require('../config/connection');
const router = require('express').Router();

const {Posts, Comments, User } = require('../models');
const withAuth = require('../utils/auth');


// login route
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// signup route
router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// get all posts
router.get('/', async(req,res)=>{
  try{
    const postData= await Posts.findAll({
      include:[
        {
          model:Comments,
          attributes:[
            'id',
            'comment',
            'post_id',
            'user_id',
            'date_created',
          ]
        }
      ]
    
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts, 
      loggedIn:req.session.loggedIn,

    });
  }catch (err){
    res.status(500).json(err);
  }
});


router.get('/post/:id', async(req,res)=>{
  try{
    const dbPostData= await Posts.findByPk(req.params.id,
      {
        include:[
          {
            model:Comments,
            attributes:[
              'id',
              'comment',
              'post_id',
              'user_id',
              'date_created',
            ]
          }
        ]
      } );
    const posts = dbPostData.get({ plain: true });
    res.render('posts', {
      posts, 
      loggedIn:req.session.loggedIn,

    });
  }catch (err){
    res.status(500).json(err);
  }
});

// get comment by id
router.get('/comment/:id', async(req, res)=>{
  try{
    const dbCommentsData=await Comments.findByPk(req.params.id);
    const comment=dbCommentsData.get({plain:true});
    res.render('comment', {comment, loggedIn: req.session.loggedIn })

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})
module.exports = router;
