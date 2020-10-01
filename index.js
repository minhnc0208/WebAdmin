const express = require('express')
const app = express()
var path = require('path');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();

router.get('/', function (request, response) {
      response.render('home', { title: 'Trang chu' });
});

router.get('/login', function (request, response) {
      response.render('login');
});


router.get('/users', function (request, response) {



      var users = [
            {
                  id: 1,
                  name: 'Hung',
                  cmnd: '254565648',
                  sdt: '09121855855'
            },
            {
                  id: 2,
                  name: 'Minh',
                  cmnd: '026023102',
                  sdt: '0357980104'
            }
      ]

      response.render('list-user', { users: users });
});

router.get('/about', function (request, response) {
      response.render('about');
});


router.get('/user', function (request, response) {

      var users1 = [
            {
                  ten: 'minh',
                  username: 'minhlun',
                  password: 123,
                  sodienthoai: '0357980104',
                  quyensudung: 'Admin'

            },
            {
                  ten: 'hung',
                  username: 'anhhung',
                  password: 123,
                  sodienthoai: '09121855855',
                  quyensudung: 'Admin'
            },
            {
                  ten: 'minhlunscs',
                  username: 'minhlunscs',
                  password: 123,
                  sodienthoai: '0357980104',
                  quyensudung: 'User'
            }
      ]

      response.render('user', { users1: users1 });
});

router.get('/hoadon', function (request, response) {
      var hoadon1 = [
            {
                  id: 1,
                  tonggia: 200000,



            },
            {
                  id: 2,
                  tonggia: 100000,

            },
            {
                  id: 3,
                  tonggia: 300000,

            }
      ]
      response.render('hoadon', { hoadon1: hoadon1 });
});
router.get('/loaiproduct', function (request, response) {

      var pros1 = [
            {
                  id: 1,
                  ten: 'pizza'


            },
            {
                  id: 2,
                  ten: 'bugger',

            },
            {
                  id: 3,
                  ten: 'pho',

            }
      ]

      response.render('loaiproduct', { pros1: pros1 });
});
router.get('/product', function (request, response) {

      var mon1 = [
            {
                  id: 1,
                  idloai: 1,
                  ten: 'pizza phap',
                  gia: 175000


            },
            {
                  id: 2,
                  idloai: 2,
                  ten: 'bugger gà phô mai',
                  gia: 65000

            },
            {
                  id: 3,
                  idloai: 3,
                  ten: 'phở bò',
                  gia: 450000

            }
      ]



      response.render('product', { mon1: mon1 });
});
router.get('/edituser', function (request, response) {
      response.render('edituser');
});
router.get('/editmonan', function (request, response) {
      response.render('editmonan');
});
router.get('/editloaimonan', function (request, response) {
      response.render('editloaimonan');
});
router.get('/edithoadon', function (request, response) {
      response.render('edithoadon');
});
app.use('/', router);

app.use('/css', express.static(__dirname + '/css'));

app.listen(3000, () => {
      console.log("http:localhost:3000");
});