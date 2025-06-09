const { error } = require('console');
const adminDetails = require('../models/adminModel');
const fs = require('fs');
const nodemailer = require('nodemailer');


// Sign In Admin
const signInPage = (req, res) => {
    let errormsg = req.session.message;
    res.render('signInPage', { errormsg, success: req.flash("success"), error: req.flash("error"), });

    req.session.message = undefined;
};
const adminChecked = async (req, res) => {
    req.flash('success', 'Admin Login Successfully...!');
    res.redirect('/dashboard');
};


// Loss Password
const lossPasswordPage = (req, res) => {
    res.render('auth/lossPasswordPage', { error: req.flash('error') });
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
            subject: "OTP for Reset Password", // Subject line
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
            req.flash('success', 'OTP sent to your email!');
            res.redirect('/otpVerifyPage')
        } else {
            req.flash('error', 'OTP sending failed!');
            res.redirect('/lostPasswordPage');
        }

    } else {
        req.flash('error', 'Email not found!');
        res.redirect('/lossPasswordPage')
    }
}
const otpVerifyPage = (req, res) => {
    const adminEmail = req.cookies.email;
    const OTP = req.cookies.OTP;

    if (adminEmail && OTP) {
        res.render("auth/otpVerifyPage", { error: req.flash('error'), success: req.flash('success') });
    } else {
        req.flash('error', 'OTP expired or missing!');
        res.redirect("/");
    }
};

const verifyOTP = (req, res) => {
    console.log(req.body);
    console.log(req.cookies.OTP);


    if (req.body.OTP == req.cookies.OTP) {
        req.flash('success', 'OTP Verified!');
        res.redirect('/newSetPasswordPage');

    } else {
        req.flash('error', 'Invalid OTP!');
        res.redirect('/otpVerifyPage');
        console.log("OTP has not matched...");
    }
}
const newSetPasswordPage = (req, res) => {
    const adminEmail = req.cookies.email;
    const OTP = req.cookies.OTP;

    if (adminEmail && OTP) {
        res.render('auth/setNewPasswordPage', {error: req.flash('error'), success: req.flash('success') });
    } else {
        req.flash('error', 'Session expired!');
        res.redirect("/");
    }
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
                    req.flash('success', 'Your password has been updated successfully. Please log in.');
                    res.redirect('/');

                } else {
                    console.log("Password not updated....");
                    req.flash('error', 'An error occurred while updating your password.');
                    res.redirect('/newSetPasswordPage');
                }
            } else {
                console.log("Email is not valid...");
                req.flash('error', 'Email is not valid...!');
                res.redirect('/newSetPasswordPage');
            }
        } else {
            console.log("New Password and Conform Password has not matched....");
            req.flash('error', 'New Password and Conform Password has not matched....!');
            res.redirect('/newSetPasswordPage');
        }

    } catch (e) {
        res.send(`Not Found : ${e}`);
    }
}


// Sign Up Admin
const signUpPage = (req, res) => {
    res.render('signUpPage', { error: req.flash('error'), success: req.flash('success') });
};
const signUp = async (req, res) => {

    console.log(req.body);
    console.log(req.file);

    try {
        req.body.adminImage = req.file.path;
        const newAdmin = await adminDetails.create(req.body);
        console.log(newAdmin);

        if (newAdmin) {
            req.flash('success', 'Admin registered successfully!');
            res.redirect('/');

        } else {
            req.flash('error', 'Failed to register admin.');
            res.send("Failed to register.");
        }
    } catch (e) {
        req.flash('error', 'Failed to register admin.');
        res.send(`Error: ${e}`);
    }
};


// Rendering Page
const dashboard = (req, res) => {
    res.render("dashboard", { success: req.flash('success'), error: req.flash('error') });
};

const addAdminPage = (req, res) => {
    res.render('addAdminPage', { success: req.flash('success'), error: req.flash('error') });
}
const viewProfile = async (req, res) => {
    const currentAdmin = req.user;
    console.log(currentAdmin);

    res.render('adminProfile', { currentAdmin, success: req.flash('success'), error: req.flash('error') });
}

// Edit Current Admin
const editCurrentAdmin = async (req, res) => {
    const editCurrentAdminId = req.params.id;

    try {
        const record = await adminDetails.findById(editCurrentAdminId);
        const currentAdmin = req.user;

        if (record) {
            res.render('editCurrentAdminPage', { record, currentAdmin, success: req.flash("success"), error: req.flash("error") });
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
        const CurrentAdminData = await adminDetails.findById(updateCurrentAdminId);

        if (req.file) {
            try {
                fs.unlinkSync(CurrentAdminData.adminImage);
            } catch (err) {
                console.error('Image deletion failed:', err);
            }
            req.body.adminImage = req.file.path;
        } else {
            req.body.adminImage = CurrentAdminData.adminImage;
        }

        const updatedCurrentAdmin = await adminDetails.findByIdAndUpdate(updateCurrentAdminId, req.body, { new: true });
        res.cookie('admin', updatedCurrentAdmin);
        req.flash('success', 'Profile updated successfully!');
        res.redirect('/viewProfile');
    } catch (e) {
        req.flash('error', 'Failed to update profile.');
        res.send(`<p> Update Failed: ${e} </p>`);
    }
};

// For Admin Logout
const logOutAdmin = (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            return false;
        }
        res.redirect('/')
    })
}

// Change Password
const changePasswordPage = (req, res) => {
    res.render('changePasswordPage', { error: req.flash('error'), success: req.flash('success') });
}
const updatePassword = async (req, res) => {
    console.log(req.body);

    const { currentPassword, newPassword, confirmPassword } = req.body;
    const currentAdmin = req.user;

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
                        req.flash('success', 'Password updated successfully!');
                        req.session.destroy(function (err) {
                            if (err) {
                                console.log(err);
                                return false;
                            }
                        })
                        res.redirect('/');
                    } else {
                        console.log("Password update failed.");
                        req.flash('error', 'Password update failed.');
                        res.redirect('/changePasswordPage/:id');
                    }

                } catch (e) {
                    console.error("Error while updating password:", e);
                    res.redirect('back');
                }
            } else {
                console.log("New and Confirm Passwords do not match.");
                req.flash('error', 'New and Confirm Password do not match!');
                res.redirect('/changePasswordPage/:id');
            }
        } else {
            console.log('Please enter a different password than the current one.');
            req.flash('error', 'New password must be different from current!');
            res.redirect('/changePasswordPage/:id');
        }
    } else {
        console.log('Your current password is incorrect.');
        req.flash('error', 'Incorrect current password!');
        res.redirect('/changePasswordPage/:id');
    }
};


// Admin Table
const adminTable = async (req, res) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        try {
            let records = await adminDetails.find({});
            const currentAdmin = req.user;

            records = records.filter((data) =>
                data.id != currentAdmin._id
            );

            res.render('adminTable', { records, currentAdmin, success: req.flash('success'), error: req.flash('error') });
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
            req.flash('success', 'Admin added successfully!');
        } else {
            console.log("Admin Not Insertion");
            req.flash('error', 'Failed to add admin.');
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

            req.flash('success', 'Admin deleted successfully!');
            res.redirect('/adminTable');
        } else {
            req.flash('error', 'Failed to delete admin.');
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

        if (record) {
            res.render('editAdminPage', { record, success: req.flash("success"), error: req.flash("error"), });
        } else {
            req.flash('error', 'Admin not found!');
            res.send(`<p> Admin record not found </p>`);
        }
    } catch (e) {
        res.send(`<p> Error: ${e} </p>`);
    }
}
const updateAdmin = async (req, res) => {
    const updateId = req.params.id;

    try {
        const Data = await adminDetails.findById(updateId);
        if (req.file) {
            fs.unlinkSync(Data.adminImage);
            req.body.adminImage = req.file.path;
        } else {
            req.body.adminImage = Data.adminImage;
        }
        const updatedAdmin = await adminDetails.findByIdAndUpdate(updateId, req.body);

        if (updateAdmin) {
            req.flash('success', 'Admin updated successfully.');
        } else {
            req.flash('error', 'Admin updation failed.');
        }
        res.redirect(`/adminTable`);
    } catch (e) {
        req.flash('error', 'Failed to update admin.');
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