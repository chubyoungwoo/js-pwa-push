'use strict';

const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
// Set static path
console.log('__dirname',path.join(__dirname, "public"))
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

const publicVapidKey = "BNzzfdcBcThU27FcGve6F3GF6He2Fro82ZMuOLga9fukatLMlaKB6GdO-82loi6W4iGdPQZAp_4HLgST8z5of_E";
const privateVapidKey = "yzZ8xvvhiM50HlTsDLCwiofkCyOypb-ZTkqdvpwyz7c";  

webpush.setVapidDetails(
  "mailto:cbwstar@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  console.log( 'req.body', req.body)
  // Get pushSubscription object
  const subscription = req.body;
  // Send 201 - resource created
  res.status(201).json({});
  // Create payload
  //const payload = JSON.stringify({ title: "Push Test" });

  	const payload = JSON.stringify({
			    title: req.body.title,
					body: req.body.body,
		      icon: req.body.icon,         //나타날이미지
		      badge: req.body.badge,       //모바일기기에서 상단 status바에 뜰 소형 아이콘
		      vibrate: req.body.vibrate,  //모바일기기에서 진동 
          image: '../images/2.jpg',  
          params : req.body.params
	    });

  /*
	const payload = JSON.stringify({
			    title: "제목이다수",
					body:'내용이다',
		      icon: '../images/icon.png',         //나타날이미지
		      badge: '../images/badge.png',       //모바일기기에서 상단 status바에 뜰 소형 아이콘
		      vibrate: [200, 100, 200, 100, 200, 100, 400],  //모바일기기에서 진동 
          params : {url:'http://www.naver.com'}
	    });
  */
	// web push 전송
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));


