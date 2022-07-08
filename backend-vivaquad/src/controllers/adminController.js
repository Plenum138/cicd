const db = require('../db/conn');
const { UserLogins, School } = db;





module.exports = {
    //Users//
    dashBoard: async (req, res, next) => {
        try {

            const reqBody = req.body;
            let user_id = reqBody.user_id

            let get_UserInfo = await UserLogins.findOne({ _id: user_id }).lean().exec();
            const Total_Users = await UserLogins.find({ roles: { $ne: 'ADMIN' } }).count();
            let Total_Employee = 0
            let Total_Student = 0

            if (get_UserInfo.roles !== 'ADMIN') {
                const getSchool = await School.findOne({ loginid: user_id }).exec();
                Total_Employee = await UserLogins.find({ roles: 'EMPLOYEE', school_id: getSchool._id }).countDocuments();
                Total_Student = await UserLogins.find({ roles: 'STUDENT', school_id: getSchool._id }).countDocuments();
                get_UserInfo.schoolInfo = getSchool
            }




            const DBdata = {
                GetTotalUsers: Total_Users,
                get_UserInfo: get_UserInfo,
                Total_Employee: Total_Employee,
                Total_Student: Total_Student,


            };


            return res.send({
                status: true,
                countData: DBdata,

            });
        } catch (e) {
            res.send({ status: false, message: e.message })
        }
    },


}