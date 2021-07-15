var nodemailer = require('nodemailer'); // khai báo sử dụng module nodemailer
class ContactController {
    index(req, res, next) {
        const authUser = res.locals.user;
        res.render('Contact', { authUser })
    }

    sendContact(req, res, next) {
        var transporter = nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'thomnd131200@gmail.com',
                pass: 'pastwent12345'
            }
        });
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Thanh Batmon',
            to: req.body.email,
            subject: '[Contact] Thank for your contact',
            text: 'We recieved message from ' + req.body.email,
            html: '<p>Chúng tôi đã nhận được thông tin liên hệ từ bạn. Chúng tôi sẽ kiểm tra và liên hệ với bạn sớm nhất có thể</p><p>Hãy kiểm tra lại thông tin nhé:</p><ul><li>Họ tên:' + req.body.name + '</li><li>Số điện thoại:' + req.body.sdt + '<li>Email:' + req.body.email + '</li><li>Nội dung:' + req.body.message + '</li></ul>'
        }
        transporter.sendMail(mainOptions, function(err, info) {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                console.log('Message sent: ' + info.response);
                res.redirect('/');
            }
        });
    }

}
module.exports = new ContactController()