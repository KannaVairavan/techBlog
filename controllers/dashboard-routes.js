const sequelize = require('../config/connection');
const router = require('express').Router();
const {Posts, Comments, User } = require('../models');
const withAuth = require('../utils/auth');

// get all posts
router.get('/', withAuth, async(req,res)=>{
    try{
      const postData= await Posts.findAll({
        where: {
            user_id: req.session.user_id
        },
        
        include:[
          {
            model:Comments,
            attributes:[
              'id',
              'comment',
              'post_id',
              'user_id',
              'date_created',
            ],
            include:{
                model:User,
                attributes:['username']
            }
          },
          {
              model:User,
              attributes:['username']
          }
        ]
      
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', {
        posts, 
        loggedIn:req.session.loggedIn,
  
      });
    }catch (err){
      res.status(500).json(err);
    }
  });
  
// get  post by id
router.get('/post/:id', withAuth, async(req,res)=>{
    try{
      const dbPostData= await Posts.findByPk(req.params.id,
        {
           where: {
                user_id: req.session.user_id
            },
            include:[
                {
                  model:Comments,
                  attributes:[
                    'id',
                    'comment',
                    'post_id',
                    'user_id',
                    'date_created',
                  ],
                  include:{
                      model:User,
                      attributes:['username']
                  }
                },
                {
                    model:User,
                    attributes:['username']
                }
              ]
            
        } );
      const posts = dbPostData.get({ plain: true });
      res.render('edit-posts', {
        posts, 
        loggedIn:req.session.loggedIn,
  
      });
    }catch (err){
      res.status(500).json(err);
    }
  });
  
