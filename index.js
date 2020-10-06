const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const formidable = require("formidable");
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
const router = express();

//firebase
var firebase = require("firebase-admin");

var serviceAccount = require("./serviceFirebase.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://pr0112-duan1.firebaseio.com"
});

//connect firebase
var db = firebase.database();
var food = db.ref("Food");

// food.once('value',function(snap)
//   {
//     console.log({"food":snap.val()});
//   }
// );

async function getAllFoods() {
  return await food.once('value', function (snap) {
    const temp = snap.val();
    return temp;
  });
};

// console.log(getAllFoods().then(data => console.log(data.val())));

// //router
var path = require("path");
const { Router } = require("express");

var mon1 = [
  {
    id: 1,
    idloai: 1,
    ten: "pizza phap",
    gia: 175000,
    hinh: "1601621017314.jpg",
  },
  {
    id: 2,
    idloai: 2,
    ten: "bugger gà phô mai",
    gia: 65000,
    hinh: "1601621017314.jpg",
  },
  {
    id: 3,
    idloai: 3,
    ten: "phở bò",
    gia: 450000,
    hinh: "1601621017314.jpg",
  },
];

var users1 = [
  {
    hinh: "1601621017314.jpg",
    ten: "minh",
    username: "minhlun",
    password: 123,
    sodienthoai: "0357980104",
    gioitinh:"Nam",
    quyensudung: "Admin",
  },
  {
    hinh: "1601621017314.jpg",
    ten: "hung",
    username: "anhhung",
    password: 123,
    sodienthoai: "09121855855",
    gioitinh:"Nam",
    quyensudung: "Admin",
  },
  {
    hinh: "1601621017314.jpg",
    ten: "minhne",
    username: "minhlunscs",
    password: 123,
    sodienthoai: "0357980104",
    gioitinh:"Nam",
    quyensudung: "User",
  },
];

var hoadon1 = [
  {
    id: 1,
    tonggia: 200000,
    hinh: "1601631747036.jpg",
  },
  {
    id: 2,
    tonggia: 100000,
    hinh: "1601631747036.jpg",
  },
  {
    id: 3,
    tonggia: 300000,
    hinh: "1601631747036.jpg",
  },
];

var pros1 = [
  {
    id: 1,
    ten: "pizza",
    hinh: "1601628112386.jpg",
  },
  {
    id: 2,
    ten: "bugger",
    hinh: "1601628112386.jpg",
  },
  {
    id: 3,
    ten: "pho",
    hinh: "1601628112386.jpg",
  },
];
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

router.get("/", function (request, response) {
  response.render("home", { title: "Trang chu" });
});

router.get("/login", function (request, response) {
  response.render("login");
});

router.get("/users", function (request, response) {
  var users = [
    {
      id: 1,
      name: "Hung",
      cmnd: "254565648",
      sdt: "09121855855",
    },
    {
      id: 2,
      name: "Minh",
      cmnd: "026023102",
      sdt: "0357980104",
    },
  ];

  response.render("list-user", { users: users });
});

router.get("/about", function (request, response) {
  response.render("about");
});

router.get("/user", function (request, response) {
  response.render("user", { users1: users1 });
});

router.get("/hoadon", function (request, response) {
  response.render("hoadon", { hoadon1: hoadon1 });
});

router.get("/loaiproduct", function (request, response) {
  response.render("loaiproduct", { pros1: pros1 });
});

router.get("/product", async function (request, response) {
  // await getAllFoods().then(data => console.log(data.val()));
  await getAllFoods().then(data => {
    console.log(Object.values(data.val()));
    response.render("product", { mon1: Object.values(data.val()) });
  });
});

router.get("/edituser/:username", function (request, response) {
  const khachhang = users1.find((f) => f.username == request.params.username);

  // console.log(khachhang);

  response.render("edituser", { userCanUpdate: khachhang });
});

router.get("/deleteuser/:username", function (request, response) {
  const khachhang = users1.find((f) => f.username == request.params.username);

  // console.log(monan);
  response.render("deleteuser", { userCanDelete: khachhang });
});

router.get("/editmonan/:foodid", function (request, response) {
  const monan = mon1.find((f) => f.foodid == request.params.foodid);

  // console.log(monan);
  response.render("editmonan", { monanCanUpdate: monan });
});

router.get("/deletemonan/:id", function (request, response) {
  const monan = mon1.find((f) => f.id == request.params.id);

  // console.log(monan);
  response.render("deletemonan", { monanCanDelete: monan });
});

router.get("/editloaimonan/:id", function (request, response) {
  const loaimonan = pros1.find((f) => f.id == request.params.id);

  //console.log(loaimonan);

  response.render("editloaimonan", { loaimonanCanUpdate: loaimonan });
});

router.get("/deleteloaimonan/:id", function (request, response) {
  const loaimonan = pros1.find((f) => f.id == request.params.id);

  // console.log(monan);
  response.render("deleteloaimonan", { loaimonanCanDelete: loaimonan });
});

router.get("/edithoadon/:id", function (request, response) {
  const hoadon = hoadon1.find((f) => f.id == request.params.id);

  response.render("edithoadon", { hoadonCanUpdate: hoadon });
});

router.get("/deletehoadon/:id", function (request, response) {
  const hoadon = hoadon1.find((f) => f.id == request.params.id);

  // console.log(monan);
  response.render("deletehoadon", { hoadonCanDelete: hoadon });
});

router.post("/insertProduct", (req, res) => {
  console.log(req.body);
  // console.log('aa');
  const dateTimeName = Date.now() + ".jpg";

  new formidable.IncomingForm({
    hash: "md5",
    maxFileSize: 2000 * 1024 * 1024,
    keepExtensions: true,
    multiples: true,
  })
    .on("fileBegin", function (filename, file) {
      console.log(filename);
      file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName);
      console.log(file.path);
    })
    .on("file", async function (name, file) {
      console.log(name);
    })
    .on("aborted", (mon1) => {
      console.log("aborted");
    })
    .on("error", (err) => {
      console.log(err);
      res.sendStatus(400);
      return;
    })
    .on("end", () => console.log("end"))
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

  res.redirect(200, "/product");
});

router.post("/updateProduct", (req, res) => {
  const dateTimeName = Date.now() + ".jpg";

  new formidable.IncomingForm({
    hash: "md5",
    maxFileSize: 2000 * 1024 * 1024,
    keepExtensions: true,
    multiples: true,
  })
    .on("fileBegin", function (filename, file) {
      console.log(filename);
      file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName);
      console.log(file.path);
    })
    .on("file", async function (name, file) {
      console.log(name);
    })
    .on("aborted", (mon1) => {
      console.log("aborted");
    })
    .on("error", (err) => {
      console.log(err);
      res.sendStatus(400);
      return;
    })
    .on("end", () => console.log("end"))
    .parse(req, (err, fields, files) => {
      const monanCanUpdateIndex = mon1.findIndex((f) => f.id == fields.MaMonAn);
      mon1.splice(monanCanUpdateIndex, 1);

      mon1.push({
        hinh: dateTimeName,
        id: fields.MaMonAn,
        idloai: fields.MaLoaiMonAn,
        ten: fields.TenMon,
        gia: fields.GiaMonAn,
      });

      mon1.sort(function (a, b) {
        return a.id - b.id;
      });
    });

  res.redirect(200, "/product");
});

router.post("/deleteProduct", (req, res) => {
  const dateTimeName = Date.now() + ".jpg";

  new formidable.IncomingForm({
    hash: "md5",
    maxFileSize: 2000 * 1024 * 1024,
    keepExtensions: true,
    multiples: true,
  })
    .on("fileBegin", function (filename, file) {
      console.log(filename);
      file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName);
      console.log(file.path);
    })
    .on("file", async function (name, file) {
      console.log(name);
    })
    .on("aborted", (mon1) => {
      console.log("aborted");
    })
    .on("error", (err) => {
      console.log(err);
      res.sendStatus(400);
      return;
    })
    .on("end", () => console.log("end"))
    .parse(req, (err, fields, files) => {
      const monanCanUpdateIndex = mon1.findIndex((f) => f.id == fields.MaMonAn);
      mon1.splice(monanCanUpdateIndex, 1);

      delete mon1[
        (fields.MaMonAn,
        fields.MaLoaiMonAn,
        fields.TenMon,
        fields.GiaMonAn,
        fields.dateTimeName)
      ];

      mon1.sort(function (a, b) {
        return a.id - b.id;
      });
    });

  res.redirect(200, "/product");
});

router.post("/insertLoaiProduct", (req, res) => {
  console.log(req.body);
  // console.log('aa');
  const dateTimeName1 = Date.now() + ".jpg";

  new formidable.IncomingForm({
    hash: "md5",
    maxFileSize: 2000 * 1024 * 1024,
    keepExtensions: true,
    multiples: true,
  })
    .on("fileBegin", function (filename, file) {
      console.log(filename);
      file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName1);
      console.log(file.path);
    })
    .on("file", async function (name, file) {
      console.log(name);
    })
    .on("aborted", (pros1) => {
      console.log("aborted");
    })
    .on("error", (err) => {
      console.log(err);
      res.sendStatus(400);
      return;
    })
    .on("end", () => console.log("end"))
    .parse(req, (err, fields, files) => {
      console.log(fields);
      pros1.push({
        hinh: dateTimeName1,
        id: fields.MaLoaiMonAn,
        ten: fields.TenLoaiMonAn,
      });
    });

  res.redirect(200, "/loaiproduct");
});

router.post("/updateLoaiProduct", (req, res) => {
  const dateTimeName1 = Date.now() + ".jpg";

  new formidable.IncomingForm({
    hash: "md5",
    maxFileSize: 2000 * 1024 * 1024,
    keepExtensions: true,
    multiples: true,
  })
    .on("fileBegin", function (filename, file) {
      console.log(filename);
      file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName1);
      console.log(file.path);
    })
    .on("file", async function (name, file) {
      console.log(name);
    })
    .on("aborted", (pros1) => {
      console.log("aborted");
    })
    .on("error", (err) => {
      console.log(err);
      res.sendStatus(400);
      return;
    })
    .on("end", () => console.log("end"))
    .parse(req, (err, fields, files) => {
      const loaimonanCanUpdateIndex = pros1.findIndex(
        (f) => f.id == fields.MaLoaiMonAn
      );
      pros1.splice(loaimonanCanUpdateIndex, 1);

      pros1.push({
        hinh: dateTimeName1,
        id: fields.MaLoaiMonAn,
        ten: fields.TenLoaiMonAn,
      });

      pros1.sort(function (a, b) {
        return a.id - b.id;
      });
    });

  res.redirect(200, "/product");
});

router.post("/deleteLoaiProduct", (req, res) => {
  const dateTimeName1 = Date.now() + ".jpg";

  new formidable.IncomingForm({
    hash: "md5",
    maxFileSize: 2000 * 1024 * 1024,
    keepExtensions: true,
    multiples: true,
  })
    .on("fileBegin", function (filename, file) {
      console.log(filename);
      file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName1);
      console.log(file.path);
    })
    .on("file", async function (name, file) {
      console.log(name);
    })
    .on("aborted", (pros1) => {
      console.log("aborted");
    })
    .on("error", (err) => {
      console.log(err);
      res.sendStatus(400);
      return;
    })
    .on("end", () => console.log("end"))
    .parse(req, (err, fields, files) => {
      const monanCanUpdateIndex = pros1.findIndex(
        (f) => f.id == fields.MaMonAn
      );
      pros1.splice(monanCanUpdateIndex, 1);

      delete pros1[
        (fields.MaLoaiMonAn, fields.TenLoaiMonAn, fields.dateTimeName1)
      ];

      mon1.sort(function (a, b) {
        return a.id - b.id;
      });
    });

  res.redirect(200, "/loaiproduct");
});

router.post("/insertUser", (req, res) => {
  console.log(req.body);
  // console.log('aa');
  const dateTimeName2 = Date.now() + ".jpg";

  new formidable.IncomingForm({
    hash: "md5",
    maxFileSize: 2000 * 1024 * 1024,
    keepExtensions: true,
    multiples: true,
  })
    .on("fileBegin", function (filename, file) {
      console.log(filename);
      file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName2);
      console.log(file.path);
    })
    .on("file", async function (name, file) {
      console.log(name);
    })
    .on("aborted", (users1) => {
      console.log("aborted");
    })
    .on("error", (err) => {
      console.log(err);
      res.sendStatus(400);
      return;
    })
    .on("end", () => console.log("end"))
    .parse(req, (err, fields, files) => {
      console.log(fields);
      users1.push({
        hinh: dateTimeName2,
        ten: fields.TenKhachHang,
        username: fields.TenDangNhap,
        password: fields.MatKhau,
        sodienthoai: fields.SoDienThoai,
        gioitinh: fields.GioiTinh,
        quyensudung: fields.QuyenSuDung,
      });
    });

  res.redirect(200, "/user");
});

router.post("/updateUser", (req, res) => {
  const dateTimeName2 = Date.now() + ".jpg";

  new formidable.IncomingForm({
    hash: "md5",
    maxFileSize: 2000 * 1024 * 1024,
    keepExtensions: true,
    multiples: true,
  })
    .on("fileBegin", function (filename, file) {
      console.log(filename);
      file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName2);
      console.log(file.path);
    })
    .on("file", async function (name, file) {
      console.log(name);
    })
    .on("aborted", (users1) => {
      console.log("aborted");
    })
    .on("error", (err) => {
      console.log(err);
      res.sendStatus(400);
      return;
    })
    .on("end", () => console.log("end"))
    .parse(req, (err, fields, files) => {
      console.log(fields);
      const userCanUpdateIndex = users1.findIndex(
        (f) => f.username == fields.TenDangNhap
      );
      users1.splice(userCanUpdateIndex, 1);

      users1.push({
        hinh: dateTimeName2,

        ten: fields.TenKhachHang,
        username: fields.TenDangNhap,
        password: fields.MatKhau,
        sodienthoai: fields.SoDienThoai,
        gioitinh: fields.GioiTinh,
        quyensudung: fields.QuyenSuDung,
      });

      users1.sort(function (a, b) {
        return a.id - b.id;
      });
    });

  res.redirect(200, "/user");
});

router.post("/deleteUser", (req, res) => {
  const dateTimeName2 = Date.now() + ".jpg";

  new formidable.IncomingForm({
    hash: "md5",
    maxFileSize: 2000 * 1024 * 1024,
    keepExtensions: true,
    multiples: true,
  })
    .on("fileBegin", function (filename, file) {
      console.log(filename);
      file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName2);
      console.log(file.path);
    })
    .on("file", async function (name, file) {
      console.log(name);
    })
    .on("aborted", (users1) => {
      console.log("aborted");
    })
    .on("error", (err) => {
      console.log(err);
      res.sendStatus(400);
      return;
    })
    .on("end", () => console.log("end"))
    .parse(req, (err, fields, files) => {
      const userCanDelete = users1.findIndex(
        (f) => f.username == fields.TenDangNhap
      );
      users1.splice(userCanDelete, 1);

      delete users1[
        (fields.TenKhachHang,
        fields.TenDangNhap,
        fields.MatKhau,
        fields.SoDienThoai,
        fields.GioiTinh,
        fields.QuyenSuDung,
        fields.dateTimeName2)
      ];

      users1.sort(function (a, b) {
        return a.id - b.id;
      });
    });

  res.redirect(200, "/user");
});

router.post("/insertHoaDon", (req, res) => {
  console.log(req.body);
  // console.log('aa');
  const dateTimeName3 = Date.now() + ".jpg";

  new formidable.IncomingForm({
    hash: "md5",
    maxFileSize: 2000 * 1024 * 1024,
    keepExtensions: true,
    multiples: true,
  })
    .on("fileBegin", function (filename, file) {
      console.log(filename);
      file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName3);
      console.log(file.path);
    })
    .on("file", async function (name, file) {
      console.log(name);
    })
    .on("aborted", (hoadon1) => {
      console.log("aborted");
    })
    .on("error", (err) => {
      console.log(err);
      res.sendStatus(400);
      return;
    })
    .on("end", () => console.log("end"))
    .parse(req, (err, fields, files) => {
      console.log(fields);
      hoadon1.push({
        hinh: dateTimeName3,
        id: fields.MaHoaDon,
        tonggia: fields.TongGia,
      });
    });

  res.redirect(200, "/hoadon");
});

router.post("/updateHoaDon", (req, res) => {
  const dateTimeName3 = Date.now() + ".jpg";

  new formidable.IncomingForm({
    hash: "md5",
    maxFileSize: 2000 * 1024 * 1024,
    keepExtensions: true,
    multiples: true,
  })
    .on("fileBegin", function (filename, file) {
      console.log(filename);
      file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName3);
      console.log(file.path);
    })
    .on("file", async function (name, file) {
      console.log(name);
    })
    .on("aborted", (hoadon1) => {
      console.log("aborted");
    })
    .on("error", (err) => {
      console.log(err);
      res.sendStatus(400);
      return;
    })
    .on("end", () => console.log("end"))
    .parse(req, (err, fields, files) => {
      const hoadonCanUpdateIndex = hoadon1.findIndex(
        (f) => f.username == fields.MaHoaDon
      );
      hoadon1.splice(hoadonCanUpdateIndex, 1);

      hoadon1.push({
        hinh: dateTimeName3,
        id: fields.MaHoaDon,
        tonggia: fields.TongGia,
      });

      hoadon1.sort(function (a, b) {
        return a.id - b.id;
      });
    });

  res.redirect(200, "/hoadon");
});

router.post("/deleteHoaDon", (req, res) => {
  const dateTimeName3 = Date.now() + ".jpg";

  new formidable.IncomingForm({
    hash: "md5",
    maxFileSize: 2000 * 1024 * 1024,
    keepExtensions: true,
    multiples: true,
  })
    .on("fileBegin", function (filename, file) {
      console.log(filename);
      file.path = path.join("D:/Exmaple01/Exmaple01/public", dateTimeName3);
      console.log(file.path);
    })
    .on("file", async function (name, file) {
      console.log(name);
    })
    .on("aborted", (hoadon1) => {
      console.log("aborted");
    })
    .on("error", (err) => {
      console.log(err);
      res.sendStatus(400);
      return;
    })
    .on("end", () => console.log("end"))
    .parse(req, (err, fields, files) => {
      const hoadonCanDelete = hoadon1.findIndex(
        (f) => f.id == fields.MaHoaDon
      );
      hoadon1.splice(hoadonCanDelete, 1);

      delete hoadon1[
        (fields.MaHoaDon,
        fields.TongGia,
        fields.dateTimeName3)
      ];
      

      hoadon1.sort(function (a, b) {
        return a.id - b.id;
      });
    });

  res.redirect(200, "/hoadon");
});


//// Lấy IP theo máy tính

var os = require('os');

var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
        }
        ++alias;
    });
});

app.use("/", router);

app.use("/css", express.static(__dirname + "/css"));

app.listen(3000, () => {
  console.log("http:localhost:3000");
});
