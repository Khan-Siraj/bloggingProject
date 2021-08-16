var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multipart = require('./middlewares/multer.middleware');
const tokenService = require('./services/token.service');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dashboardRouter = require('./routes/dashboard.routes');
const adminLoginRouter = require('./routes/adminLogin.routes');
const adminRouter = require('./routes/admin.routes');
const crateBlogRouter = require('./routes/crateBlog.routes');
const categoryRouter = require('./routes/categories.routes');
const loginRouter = require('./routes/login.routes');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/storage',express.static(__dirname+"/storage"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multipart);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// View Routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin-login',adminLoginRouter);

// Public API Routing
app.use('/api/categories',categoryRouter);
app.use('/api/login',loginRouter);
app.use('/api/create-blog',crateBlogRouter);

// Private API Routing
app.use((request,response,next)=>{
   const tokenRes =  tokenService.verifyToken(request);
   if(tokenRes.isVerified){
    //  User Verified
    next();
   }else{
      // User not Valid
      response.clearCookie('auth_token');
      response.status(401);
      response.redirect('/admin-login');
   }
});
app.use('/api/private/admin',adminRouter);
app.use('/dashboard',dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
