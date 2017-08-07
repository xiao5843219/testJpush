var JPush = require("jpush-sdk")
var client = JPush.buildClient(‘your apply’, ‘your master secret’)

    exports.pushMessage=function(status,message,user,callback){
        var tittle='';
        if(status==0){
            tittle='您的单据已签核完成'
        }
        if(status==1){
            tittle='有单据需要您签核'
        }
        client.push().setPlatform('ios', 'android')
            /*设置tag标签和alias别名，以精确的推送给某一个用户*/
            //.setAudience(JPush.tag('555', '666'), JPush.alias('666,777'))
            .setAudience(JPush.alias(user))
            .setNotification(JPush.ios('ios alert'), JPush.android('android alert', tittle, 1))
            .setMessage(message)
            .setOptions(null, 60)
            .send(function(err, res) {
                callback(err,res);
        });
    };

    exports.pushNotification=function(){
        client.push().setPlatform('android')
            .setAudience(JPush.alias('F3232181'))
            .setNotification('Hi, JPush', JPush.ios('ios alert', 'happy', 5))
            .send(function(err, res) {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log('Sendno: ' + res.sendno);
                    console.log('Msg_id: ' + res.msg_id);
                }
            });
    };
