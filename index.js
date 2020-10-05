const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const formidable = require('formidable')
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
const router = express();
// //router
var path = require('path');
const { Router } = require('express');

var mon1 = [
      {
            id: 1,
            idloai: 1,
            ten: 'pizza phap',
            gia: 175000,
            hinh: '1601621017314.jpg'
      },
      {
            id: 2,
            idloai: 2,
            ten: 'bugger gà phô mai',
            gia: 65000,
            hinh: '1601621017314.jpg'
      },
      {
            id: 3,
            idloai: 3,
            ten: 'phở bò',
            gia: 450000,
            hinh: '1601621017314.jpg'
      }
]

var users1 = [
      {     
            hinh: '1601621017314.jpg',
            ten: 'minh',
            username: 'minhlun',
            password: 123,
            sodienthoai: '0357980104',
            quyensudung: 'Admin'

      },
      {
            hinh: '1601621017314.jpg',
            ten: 'hung',
            username: 'anhhung',
            password: 123,
            sodienthoai: '09121855855',
            quyensudung: 'Admin'
      },
      {
            hinh: '1601621017314.jpg',
            ten: 'minhlunscs',
            username: 'minhlunscs',
            password: 123,
            sodienthoai: '0357980104',
            quyensudung: 'User'
      }
]

var hoadon1 = [
      {
            id: 1,
            tonggia: 200000,
            hinh: '1601631747036.jpg',


      },
      {
            id: 2,
            tonggia: 100000,
            hinh: '1601631747036.jpg',
      },
      {
            id: 3,
            tonggia: 300000,
            hinh: '1601631747036.jpg',
      }
]

var pros1 = [
      {
            id: 1,
            ten: 'pizza',
            hinh: '1601628112386.jpg'

      },
      {
            id: 2,
            ten: 'bugger',
            hinh: '1601628112386.jpg'
      },
      {
            id: 3,
            ten: 'pho',
            hinh: '1601628112386.jpg'
      }
]
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));




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



      response.render('user', { users1: users1 });
});

router.get('/hoadon', function (request, response) {

      response.render('hoadon', { hoadon1: hoadon1 });
});
router.get('/loaiproduct', function (request, response) {
      response.render('loaiproduct', { pros1: pros1 });
});
router.get('/product', function (request, response) {
      response.render('product', { mon1: mon1 });
});
router.get('/edituser', function (request, response) {
      response.render('edituser');
});
router.get('/editmonan/:id', function (request, response) {
      const monan = mon1.find(f => f.id == request.params.id);

      // console.log(monan);
      response.render('editmonan', { monanCanUpdate: monan } );
});
router.get('/editloaimonan', function (request, response) {
      response.render('editloaimonan');
});
router.get('/edithoadon', function (request, response) {
      response.render('edithoadon');
});
router.post("/insertProduct", (req, res) => {
      console.log(req.body);
      // console.log('aa');
      const dateTimeName = Date.now() + '.jpg';

      new formidable.IncomingForm({
            hash: 'md5',
            maxFileSize: 2000 * 1024 * 1024,
            keepExtensions: true,
            multiples: true,
      })
            .on('fileBegin', function (filename, file) {
                  console.log(filename);
                  file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName);
                  console.log(file.path);
            })
            .on('file', async function (name, file) {
                  console.log(name);
            })
            .on('aborted', (mon1) => { console.log('aborted'); })
            .on('error', (err) => { console.log(err); res.sendStatus(400); return; })
            .on('end', () => console.log('end'))
            .parse(req, (err, fields, files) => {


                  console.log(fields);

                  mon1.push({
                        hinh: dateTimeName,
                        id: fields.MaMonAn,
                        idloai: fields.MaLoaiMonAn,
                        ten: fields.TenMon,
                        gia: fields.GiaMonAn,

                  });


            });

      res.redirect(200, '/product');
});

router.post("/updateProduct", (req, res) => {
      const dateTimeName = Date.now() + '.jpg';

      new formidable.IncomingForm({
            hash: 'md5',
            maxFileSize: 2000 * 1024 * 1024,
            keepExtensions: true,
            multiples: true,
      })
            .on('fileBegin', function (filename, file) {
                  console.log(filename);
                  file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName);
                  console.log(file.path);
            })
            .on('file', async function (name, file) {
                  console.log(name);
            })
            .on('aborted', (mon1) => { console.log('aborted'); })
            .on('error', (err) => { console.log(err); res.sendStatus(400); return; })
            .on('end', () => console.log('end'))
            .parse(req, (err, fields, files) => {

                  const monanCanUpdateIndex = mon1.findIndex(f => f.id == fields.MaMonAn);
                  mon1.splice(monanCanUpdateIndex, 1);

                  mon1.push({
                        hinh: dateTimeName,
                        id: fields.MaMonAn,
                        idloai: fields.MaLoaiMonAn,
                        ten: fields.TenMon,
                        gia: fields.GiaMonAn,
                  });

                  mon1.sort(function (a,b){
                        return a.id - b.id;
                  });  
            });

      res.redirect(200, '/product');
});

router.post("/insertLoaiProduct", (req, res) => {
      console.log(req.body);
      // console.log('aa');
      const dateTimeName1 = Date.now() + '.jpg';

      new formidable.IncomingForm({
            hash: 'md5',
            maxFileSize: 2000 * 1024 * 1024,
            keepExtensions: true,
            multiples: true,
      })
            .on('fileBegin', function (filename, file) {
                  console.log(filename);
                  file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName1);
                  console.log(file.path);
            })
            .on('file', async function (name, file) {
                  console.log(name);
            })
            .on('aborted', (pros1) => { console.log('aborted'); })
            .on('error', (err) => { console.log(err); res.sendStatus(400); return; })
            .on('end', () => console.log('end'))
            .parse(req, (err, fields, files) => {
                  console.log(fields);
                  pros1.push({
                        hinh: dateTimeName1,
                        id: fields.MaLoaiMonAn,
                        ten: fields.TenLoaiMonAn,


                  })
                  
            });

      res.redirect(200, '/loaiproduct');
});


router.post("/insertUser", (req, res) => {
      console.log(req.body);
      // console.log('aa');
      const dateTimeName2 = Date.now() + '.jpg';

      new formidable.IncomingForm({
            hash: 'md5',
            maxFileSize: 2000 * 1024 * 1024,
            keepExtensions: true,
            multiples: true,
      })
            .on('fileBegin', function (filename, file) {
                  console.log(filename);
                  file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName2);
                  console.log(file.path);
            })
            .on('file', async function (name, file) {
                  console.log(name);
            })
            .on('aborted', (users1) => { console.log('aborted'); })
            .on('error', (err) => { console.log(err); res.sendStatus(400); return; })
            .on('end', () => console.log('end'))
            .parse(req, (err, fields, files) => {
                  console.log(fields);
                  users1.push({
                        hinh: dateTimeName2,
                        ten: fields.TenKhachHang,
                        username:fields.TenDangNhap,
                        password: fields.MatKhau,
                        sodienthoai: fields.SoDienThoai,
                        quyensudung: fields.QuyenSuDung,
                       

                  })
            });

      res.redirect(200, '/user');
});


router.post("/insertHoaDon", (req, res) => {
      console.log(req.body);
      // console.log('aa');
      const dateTimeName3 = Date.now() + '.jpg';

      new formidable.IncomingForm({
            hash: 'md5',
            maxFileSize: 2000 * 1024 * 1024,
            keepExtensions: true,
            multiples: true,
      })
            .on('fileBegin', function (filename, file) {
                  console.log(filename);
                  file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName3);
                  console.log(file.path);
            })
            .on('file', async function (name, file) {
                  console.log(name);
            })
            .on('aborted', (hoadon1) => { console.log('aborted'); })
            .on('error', (err) => { console.log(err); res.sendStatus(400); return; })
            .on('end', () => console.log('end'))
            .parse(req, (err, fields, files) => {
                  console.log(fields);
                  hoadon1.push({
                        hinh: dateTimeName3,
                        id: fields.MaHoaDon,
                        tonggia:fields.TongGia,
                        
                        

                  })
            });

      res.redirect(200, '/hoadon');
});

app.use('/', router);

app.use('/css', express.static(__dirname + '/css'));

app.listen(3000, () => {
      console.log("http:localhost:3000");
});