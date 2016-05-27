'use strict';

//var FileUpload = require(process.cwd() + '/app/controllers/fileUpload.server.js');

module.exports = function (app, passport) {

  //var fileUpload = new FileUpload();

  app.route('/')
    .get(function (req, res) {
      res.render('index', { title: 'Voting Camp :: Back End Basejump FreeCodeCamp', user: req.user});
      //res.sendFile(process.cwd() + '/public/index.html');
    });

  app.get('/login/twitter',
    passport.authenticate('twitter'));

  app.get('/login/twitter/return',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/admin');
    });

  app.get('/logout',
    function(req, res) {
      req.session.destroy();
      res.redirect('/');
    });

  app.get('/admin',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
      res.render('dashboard', { user: req.user });
    });

  app.get('/admin/new',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
      res.render('new', { user: req.user });
    });

  app.get('/admin/polls',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
      res.render('my', { user: req.user });
    });

  app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
      res.render('profile', { user: req.user });
    });

};
