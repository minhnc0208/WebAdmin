
// const bodyParser = require('body-parser');




const express = require('express');

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');





// // //body - parser lấy dữ liệu từ form

// // parse application/x-www-form-urlencoded

router.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json

router.use(bodyParser.json());








// router.get('/', function (req, res) {
//     res.render('index');
// });

// router.get('/login', function (req, res) {
//     res.render('login');
// });





// router.get('/car', isAuthenticated, carController.getAllCar);
// router.post('/car', isAuthenticated, carController.getAllCar);


// router.get('/editCar/:_id', carController.getIdCar);

// router.get('/deleteCar/:id', carController.deleteCar);
// // router.get('/uploadCar', function (req, res) {
// //     // res.sendFile(__dirname + '/car.html');
// //     res.render('uploadCar');
// // });

// router.get('/user', isAuthenticated, inforUserController.getAllUser);

// router.get('/edit/:_id', inforUserController.getIdUser);

// // router.post('/edit', inforUserController.edit);

// router.get('/delete/:id', inforUserController.deleteUser);


// router.get('/caruser', isAuthenticated, carUserController.getAllCarUser);
// router.get('/editCarUser/:_id', carUserController.getIdCarUser);
// router.get('/deleteCarUser/:id', carUserController.deleteCarUser);




// // load image

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({
//     storage: storage,
//     //kiểm tra file upload có phải là hình ảnh hay không
//     fileFilter: function (req, file, callback) {
//         var ext = path.extname(file.originalname);
//         if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
//             return callback(new Error('Only images are allowed'));
//         }
//         callback(null, true);
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 5,//giới hạn filesize = 5Mb
//     },
// });


// router.post("/upload", upload.single('myImage'), (req, res) => {
//     let insertUser = new user({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         information: req.body.information,
//         images: req.file.originalname
//         // images: req.file.originalname
//     });

//     insertUser.save(function (err) {
//         if (err) {
//             console.log(err);
//             return;
//         } else {
//             res.redirect('user');
//         }
//     })
// })

// router.post("/edit", upload.single('myImageEdit'), (req, res) => {

//     user.updateOne(
//         { _id: req.body._id },
//         {
//             $set: {
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: req.body.password,
//                 information: req.body.information,
//                 images: req.file.originalname
//             }
//         }, (err, doc) => {
//             if (!err) {
//                 console.log("----------------------------------Edit to database");
//                 console.log(doc);
//                 res.redirect('/user');
//             } else {
//                 console.log('----------------------------------Edit Failed');
//             }
//         }
//     )

// })



router.post("/insertProduct", (req, res) => {
 console.log("AAAA");
    // console.log("add product");
    // let insertProduct = new product({
    //     imagesProduct: req.file.originalname,
    //     idProduct: req.body.idProduct,
    //     idCate: req.body.idCate,
    //     nameProduct: req.body.nameProduct,
    //     priceProduct: req.body.priceProduct,
       
    //     // images: req.file.originalname
    // });

    // insertProduct.save(function (err) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     } else {
    //         res.redirect('/product');
    //     }
    // })
})


// router.post("/editCar", upload.single('myImageEditCar'), (req, res) => {

//     carProduct.updateOne(
//         { _id: req.body._id },
//         {
//             $set: {
//                 nameCar: req.body.nameCar,
//                 priceCar: req.body.priceCar,
//                 inforCar: req.body.inforCar,
//                 imagesCar: req.file.originalname
//             }
//         }, (err, doc) => {
//             if (!err) {
//                 console.log("----------------------------------Edit to database");
//                 console.log(doc);
//                 res.redirect('/car');
//             } else {
//                 console.log('----------------------------------Edit Failed');
//             }
//         }
//     )

// })


router.post("/uploadCarUser", upload.single('myImage'), (req, res) => {

    console.log("add car user");
    let insertCarUser = new carusers({
        carName: req.body.carName,
        vehicleMaintenance: req.body.vehicleMaintenance,
        images: req.file.originalname

    });

    insertCarUser.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/caruser');
        }
    })
})

// router.post("/editCarUser", upload.single('myImageEditCarUser'), (req, res) => {
//     console.log("----------------------------------ID Edit to database");
//     console.log(req.body._id);
//     carusers.updateOne(
//         { _id: req.body._id },
//         {
//             $set: {
//                 carName: req.body.carName,
//                 vehicleMaintenance: req.body.vehicleMaintenance,
//                 images: req.file.originalname
//             }
//         }, (err, doc) => {
//             if (!err) {
//                 console.log("----------------------------------Edit to database");
//                 console.log(doc);
//                 res.redirect('/caruser');
//             } else {
//                 console.log('----------------------------------Edit Failed');
//             }
//         }
//     )

// })






module.exports = router;