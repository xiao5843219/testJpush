var express = require('express');
var router = express.Router();
var jpush = require('../push/pushMMCA');
/* GET users listing. */
router.get('/:status&:message&:user', function(req, res, next) {
    jpush.pushMessage(req.params.status,req.params.message,req.params.user,function(err,res1){
      if (err) {
              console.log(err.message);
              res.json(err);
          } else {
              console.log('Sendno: ' + res1.sendno);
              console.log('Msg_id: ' + res1.msg_id);
              res.json("success");
          }
    });
});

router.get('/',function(req, res, next){
    jpush.pushNotification();
});



module.exports = router;