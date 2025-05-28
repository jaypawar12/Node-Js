const adminDetails = require('../models/adminModel');
const fs = require('fs');
const nodemailer = require('nodemailer');


// Sign In Admin
const signInPage = (req, res) => {
    res.render('signInPage');
};
const adminChecked = async (req, res) => {
    console.log("Email or Password", req.body);

    res.redirect('/dashboard');
    // const { adminEmail, adminPassword } = req.body;

    // try {

    //     // const adminData = await adminDetails.findOne({ adminEmail });

    //     // if (adminData) {
    //     //     if (adminData.adminPassword === adminPassword) {
    //     //         console.log("Admin Login Successfully..!");
    //     //         res.cookie('admin', adminData);
    //     //         res.redirect('/dashboard');
    //     //     } else {
    //     //         console.log("Password Doesn't Matched");
    //     //         res.redirect('/signInPage');
    //     //     }
    //     // } else {
    //     //     console.log("Email Doesn't Matched");
    //     //     res.redirect('/signInPage');
    //     // }

    // } catch (e) {
    //     res.send(`<p> Error: ${e} </p>`);
    // }
};

// Loss Password
const lossPasswordPage = (req, res) => {
    res.render('auth/lossPasswordPage');
}
const lossPasswordForCheckEmail = async (req, res) => {
    console.log("Email : ", req.body);
    const email = req.body.resetEmail;

    const data = await adminDetails.findOne({ adminEmail: email });

    console.log("Checking Data : ", data);

    if (data) {

        // Send OTP Mail

        // Init Mail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "pawarjay684@gmail.com",
                pass: "sqaqaoqpcnfxezxl",
            },
            debug: true,
            logger: true,
        });


        // Send Mail

        const OTP = Math.floor(Math.random() * 999999);

        const info = await transporter.sendMail({
            from: '"Admin Panel" pawarjay684@gmail.com', // sender address
            to: email, // list of receivers
            subject: "One-Time Password (OTP) for Forget Password", // Subject line
            html: `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>OTP Verification</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
            body {
            font-family: 'Inter', sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            padding: 0;
            }
            .container {
            max-width: 500px;
            margin: 40px auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
            }
            .header {
            background: linear-gradient(90deg, #42424a, #1a73e8);
            color: #fff;
            text-align: center;
            padding: 30px 20px;
            }
            .header h2 {
            margin: 0;
            font-weight: 700;
            font-size: 24px;
            }
            .content {
            padding: 30px 25px;
            color: #333;
            }
            .content p {
            margin: 15px 0;
            font-size: 14px;
            line-height: 1.6;
            }
            .otp-box {
            background: #f0f0f0;
            border-left: 4px solid #1a73e8;
            padding: 12px 20px;
            margin: 20px 0;
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 2px;
            text-align: center;
            color: #1a73e8;
            border-radius: 8px;
            }
            .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #777;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <h2>Verify Your Account</h2>
            </div>
            <div class="content">
            <p>Hi,</p>
            <p>
                To keep your account secure, we have enabled Two-Factor Authentication (2FA). Please use the following One-Time Password (OTP) to complete your login.
            </p>
            <div class="otp-box">
                OTP: <span>${OTP}</span>
            </div>
            <p>
                This OTP is valid for <strong>10 minutes</strong> and can only be used once. Please do not share it with anyone, including our support team.
            </p>
            <p>Thank you for helping us keep your account safe.</p>
            </div>
            <div class="footer">
            Regards,<br>
            Jay Pawar
            </div>
        </div>
        </body>
        </html>
        `,
        });

        console.log("Message sent: %s", info.messageId);

        if (info.messageId) {
            // OTP Page
            res.cookie('OTP', OTP);
            res.cookie('email', email);
            res.redirect('/otpVerifyPage')
        } else {
            res.redirect('/lostPasswordPage');
        }

    } else {
        res.redirect('/lossPasswordPage')
    }
}
const otpVerifyPage = (req, res) => {
    res.render("auth/otpVerifyPage");
}
const verifyOTP = (req, res) => {
    console.log(req.body);
    console.log(req.cookies.OTP);


    if (req.body.OTP == req.cookies.OTP) {
        res.redirect('/newSetPasswordPage');
    } else {
        res.redirect('back');
        console.log("OTP has not matched...");
    }
}
const newSetPasswordPage = (req, res) => {
    res.render('auth/setNewPasswordPage');
}
const checkNewPassword = async (req, res) => {
    console.log(req.body);

    try {
        if (req.body.newPassword == req.body.confirmPassword) {
            const email = req.cookies.email;
            console.log(email);


            const data = await adminDetails.findOne({ adminEmail: email });
            console.log(data);


            if (data) {
                const updatePass = await adminDetails.findByIdAndUpdate(data.id, { adminPassword: req.body.newPassword });
                if (updatePass) {
                    console.log("Password Updated...");

                    res.clearCookie('email');
                    res.clearCookie('OTP');
                    res.redirect('/signInPage');

                } else {
                    console.log("Password not updated....");

                    res.redirect('/newSetPasswordPage');
                }
            } else {
                console.log("Email is not valid...");

                res.redirect('/newSetPasswordPage');
            }
        } else {
            console.log("New Password and Conform Password has not matched....");

            res.redirect('/newSetPasswordPage');
        }

    } catch (e) {
        res.send(`Not Found : ${e}`);
    }
}


// Sign Up Admin
const signUpPage = (req, res) => {
    res.render('signUpPage');
};
const signUp = async (req, res) => {

    console.log(req.body);
    console.log(req.file);

    try {
        req.body.adminImage = req.file.path;
        const newAdmin = await adminDetails.create(req.body);
        console.log(newAdmin);

        if (newAdmin) {
            res.redirect('/signInPage');
        } else {
            res.send("Failed to register.");
        }
    } catch (e) {
        res.send(`Error: ${e}`);
    }
};


// Rendering Page
const dashboard = (req, res) => {
    res.render('dashboard');
}
const addAdminPage = (req, res) => {
    if (req.cookies.admin == undefined) {
        res.render('/signInPage');
    } else {
        res.render('addAdminPage');
    }
}
const viewProfile = async (req, res) => {
    const cookieAdmin = req.cookies.admin;
    if (cookieAdmin != undefined) {
        const newAdmin = await adminDetails.findById(cookieAdmin._id);
        if (newAdmin) {
            res.render('adminProfile', { currentAdmin: newAdmin });
        } else {
            res.redirect('/signInPage');
        }
    } else {
        res.redirect('/signInPage');
    }
}

// Edit Current Admin
const editCurrentAdmin = async (req, res) => {
    const editCurrentAdminId = req.params.id;

    try {
        const record = await adminDetails.findById(editCurrentAdminId);
        const currentAdmin = req.cookies.admin;

        if (record) {
            res.render('editCurrentAdminPage', { record, currentAdmin });
        } else {
            res.send(`<p> Admin record not found </p>`);
        }
    } catch (e) {
        res.send(`<p> Error: ${e} </p>`);
    }
}
const updateCurrentAdmin = async (req, res) => {
    const updateCurrentAdminId = req.params.id;

    try {
        const existingCurrentAdminData = await adminDetails.findById(updateCurrentAdminId);
        if (!existingCurrentAdminData) {
            return res.send(`<p> Admin record not found </p>`);
        }

        if (req.file) {
            try {
                fs.unlinkSync(existingCurrentAdminData.adminImage);
            } catch (err) {
                console.error('Image deletion failed:', err);
            }
            req.body.adminImage = req.file.path;
        } else {
            req.body.adminImage = existingCurrentAdminData.adminImage;
        }

        const updatedCurrentAdmin = await adminDetails.findByIdAndUpdate(updateCurrentAdminId, req.body, { new: true });
        res.cookie('admin', updatedCurrentAdmin);
        res.redirect('/viewProfile');
    } catch (e) {
        res.send(`<p> Update Failed: ${e} </p>`);
    }
};

// For Admin Logout
const logOutAdmin = (req, res) => {
    res.clearCookie('admin');
    res.redirect('/signInPage');
}

// Change Password
const changePasswordPage = (req, res) => {
    const currentAdmin = req.cookies.admin;
    if (currentAdmin != undefined) {
        res.render('changePasswordPage');
    } else {
        res.redirect('/');
    }

}
const updatePassword = async (req, res) => {
    console.log(req.body);

    const { currentPassword, newPassword, confirmPassword } = req.body;
    const currentAdmin = req.cookies.admin;

    if (currentPassword === currentAdmin.adminPassword) {
        if (newPassword !== currentAdmin.adminPassword) {
            if (newPassword === confirmPassword) {
                try {
                    const isUpdate = await adminDetails.findByIdAndUpdate(
                        currentAdmin._id,
                        { adminPassword: newPassword }
                    );

                    if (isUpdate) {
                        console.log("Your Current Password Updated:", isUpdate);
                        res.clearCookie('admin');
                        res.redirect('/');
                    } else {
                        console.log("Password update failed.");
                        res.redirect('/changePasswordPage/:id');
                    }

                } catch (e) {
                    console.error("Error while updating password:", e);
                    res.redirect('back');
                }
            } else {
                console.log("New and Confirm Passwords do not match.");
                res.redirect('/changePasswordPage/:id');
            }
        } else {
            console.log('Please enter a different password than the current one.');
            res.redirect('/changePasswordPage/:id');
        }
    } else {
        console.log('Your current password is incorrect.');
        res.redirect('/changePasswordPage/:id');
    }
};


// Admin Table
const adminTable = async (req, res) => {
    if (req.cookies.admin == undefined) {
        res.redirect('/signInPage');
    } else {
        try {
            let records = await adminDetails.find({});
            const currentAdmin = req.cookies.admin;

            records = records.filter((data) =>
                data.id != currentAdmin._id
            );

            // console.log("Admin Data : ", records);

            res.render('adminTable', { records, currentAdmin });
        } catch (e) {
            res.send(`<p> Not Found : ${e} </p>`);
        }
    }
}

// Admin CURD 

const adminInsert = (req, res) => {
    // For Debuging...
    console.log(req.body);
    console.log(req.file);

    try {
        req.body.adminImage = req.file.path;

        const adminInsert = adminDetails.create(req.body);
        if (adminInsert) {
            console.log("Admin Inserted");
        } else {
            console.log("Admin Not Insertion");
        }
        res.redirect('/addAdminPage')
    } catch {
        res.send(`<p> Error : ${e} </p>`);
    }

}
const deleteAdmin = async (req, res) => {
    const deleteId = req.params.deleteId;

    try {

        const data = await adminDetails.findById(deleteId);

        if (data) {
            console.log(data.adminImage);

            fs.unlinkSync(data.adminImage);

            await adminDetails.findByIdAndDelete(deleteId);

            res.redirect('/adminTable');
        } else {
            console.log("Single Record not found....");

        }
    } catch (e) {
        res.send(`<p> Error : ${e} </p>`);
    }

}
const editAdminPage = async (req, res) => {
    const editId = req.params.id;

    try {
        const record = await adminDetails.findById(editId);
        const currentAdmin = req.cookies.admin;

        if (record) {
            res.render('editAdminPage', { record, currentAdmin });
        } else {
            res.send(`<p> Admin record not found </p>`);
        }
    } catch (e) {
        res.send(`<p> Error: ${e} </p>`);
    }
}
const updateAdmin = async (req, res) => {
    const updateId = req.params.id;

    try {
        const existingData = await adminDetails.findById(updateId);
        if (!existingData) {
            res.send(`<p> Admin record not found </p>`);
        }
        if (req.file) {
            fs.unlinkSync(existingData.adminImage);
            req.body.adminImage = req.file.path;
        } else {
            req.body.adminImage = existingData.adminImage;
        }
        const updatedAdmin = await adminDetails.findByIdAndUpdate(updateId, req.body);

        res.redirect(`/adminTable`);
    } catch (e) {
        res.send(`<p> Update Failed: ${e} </p>`);
    }
}




module.exports = {
    signInPage,
    adminChecked,
    lossPasswordPage,
    lossPasswordForCheckEmail,
    otpVerifyPage,
    verifyOTP,
    newSetPasswordPage,
    checkNewPassword,
    signUpPage,
    signUp,
    dashboard,
    addAdminPage,
    adminTable,
    viewProfile,
    editCurrentAdmin,
    updateCurrentAdmin,
    logOutAdmin,
    changePasswordPage,
    updatePassword,
    adminInsert,
    editAdminPage,
    updateAdmin,
    deleteAdmin,
};