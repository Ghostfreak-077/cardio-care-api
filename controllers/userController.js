const Admin = require("../models/user.js"); //schema
const jwt = require("jsonwebtoken");


exports.createUser = async (req, res) => {
    try {
        const {email, username, uid, emer_email, phone, weight, height} = req.body
        const signed = jwt.sign({email, uid}, secretOrPrivateKey=process.env.JWT_SECRET)

        // if user is not created

        const userExist = await Admin.findOne({ email });

        if (userExist) return res.status(409).json({ success: false, message: "User already exists" });
        
        const admin = await Admin.create({
            username,
            uid,
            email,
            emer_email,
            phone,
            weight,
            height
        });
        // sendToken(admin, 201, res)

        res.status(201).json({
            success: true,
            admin,
            jwt: signed
        });

    } catch (err) {
        res.send(err.message)
    }
}

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const token = req.cookies.internit;
        // const token = req.body.token
        const email = token?jwt.verify(token, process.env.JWT_SECRET).email:'';
        
        const user = await Admin.findOne({ email: email }).select('+password');
        console.log(user);
        
        if (!token || !user || token !== user.password) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this Resource",
            })
        }

        next();

    } catch (err) {
        res.send(err.message);
    }
}


//login
exports.login = async (req, res, next) => {
    try {
        const { email, uid } = req.body;
        const token = req.get('Authorization').slice(7);

        // console.log(Authorization.slice(7));

        //checkng if user has entered both email and password
        if (!email || !uid || !token) {
            return res.status(500).json({
                success: false,
                message: "Please Enter Email, uid and Token"
            })
        }

        // console.log("done");

        const admin = await Admin.findOne({ email: email }).select("+uid");
        const token_db = jwt.verify(token,process.env.JWT_SECRET)
        
        if (admin.email !== email || token_db.uid !== uid) {
            return res.status(401).json({
                success: false,
                message: "Invalid Enter Email, uid or Token"
            })
        }

        // console.log("done");
        // res.cookie("cardiocare", admin.password, {
        //     expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        //     httpOnly: true,
        // });

        res.status(201).json({
            success: true,
            admin
        })

    } catch (err) {
        res.send(err.message);
    }

}

exports.get_token = async (req, res, next) => {
    try {
        const { email, uid } = req.body;

        //checkng if user has entered both email and password
        if (!email || !uid) {
            return res.status(500).json({
                success: false,
                message: "Please Enter Email, uid"
            })
        }

        const user = await Admin.findOne({ email: email }).select("+uid");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.email !== email || user.uid !== uid) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or uid"
            })
        }

        const signed = jwt.sign({email, uid}, secretOrPrivateKey=process.env.JWT_SECRET)
        
        res.status(201).json({
            success: true,
            jwt: signed
        })

    } catch (err) {
        res.send(err.message);
    }

}

//logout user
exports.logout = async (req, res, next) => {
    try {
        res.cookie("internit", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: "Logged Out",
        });

    } catch (err) {
        res.send(err.message);
    }

}


sendToken = (user, ststusCode, res) => {
    const token = user.getJWTToken();

    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }

    res.status(ststusCode).cookie("internit",token,options).json({
        success: true,
        user,
        token,
    })
}