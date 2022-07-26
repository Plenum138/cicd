const db = require('../db/conn');
const { Announcement, UserLogins, School, Notification } = db;
const {
    sendNotificationAnnouncement,
    sendSingleNotification,
    sendPushNotificationToSingleUser
} = require('../helper/firebase/firebase');





module.exports = {

    //Announcement Model
    createAnnouncement: async (req, res, next) => {
        try {

            const { title, message , type} = req.body;
            const { _id } = req.user;
            let userDetails = await UserLogins.findById(_id).lean().exec();
            const getSchool = await School.findOne({loginid : userDetails._id});
            let reqBody = req.body;
            reqBody.school_id = getSchool._id
            let AllSchoolStudents = []



           

                if(type === 'All'){
                    AllSchoolStudents = await UserLogins
                    .find({
                        $or: [{
                            school_id: getSchool._id,
                            roles: "STUDENT" ,
                            isNotification : true
                        },
                        {
                            school_id: getSchool._id,
                            roles: "EMPLOYEE",
                            isNotification : true
                        },
    
                        ]
                    })
                    .lean().exec();

                }else if(type === 'Student'){
                    AllSchoolStudents = await UserLogins
                    .find({
                        $or: [{
                            school_id: getSchool._id,
                            roles: "STUDENT" ,
                            isNotification : true
                        },
                    
                        ]
                    })
                    .lean().exec();

                }else if(type === 'Employee'){
                    AllSchoolStudents = await UserLogins
                    .find({
                        $or: [{
                            school_id: getSchool._id,
                            roles: "EMPLOYEE" ,
                            isNotification : true
                        },
                    
                        ]
                    })
                    .lean().exec();


                }

          

       


            const AnnouncementModel = new Announcement(reqBody);
            const created = await AnnouncementModel.save();
            const FireBaseUser = await UserLogins.find({ $or: [{ school_id: getSchool._id, roles: "STUDENT", 'firebase_token': { $ne: null } }, { school_id: getSchool._id, roles: "EMPLOYEE", 'firebase_token': { $ne: null } },] }).lean().exec();
            let tokenArray = FireBaseUser
            await sendNotificationAnnouncement("207",title, message, tokenArray);   
            if (AllSchoolStudents.length > 0) {

                AllSchoolStudents.map(async (val) => {
                    let data = {
                        user_id: val._id,
                        title: title,
                        message: message,
                        type: 'Announcement',
                        announcement_id: created._id
                    }

                    const notificationModel = new Notification(data);
                    await notificationModel.save();

                })

            }

            return res.send({ status: true, message: 'Announcement created successfully' });

        } catch (error) {


            return res.send({ status: false, message: error.message });
        }
    },

    updateAnnouncement: async (req, res, next) => {
        try {
            const { title, message } = req.body;
            let reqBody = req.body;
            await Announcement.findByIdAndUpdate(Id, reqBody).lean().exec();
            return res.send({ status: true, message: 'Announcement updated successfully' });

        } catch (error) {
            return res.send({ status: false, message: error.message });
        }
    },

    getAnnouncementList: async (req, res, next) => {
        try {



            const data = await Announcement.find({ user_id: req.body.user_id });
            return res.send({ status: true, data: data, message: 'Announcement get successfully' });

        } catch (error) {


            return res.send({ status: false, message: error.message });
        }
    },

    getAllAnnouncementList: async (req, res, next) => {
        try {
            let _id = req.body._id;
            const reqBody = req.body;
            let userDetails = await UserLogins.findById(_id).lean().exec();
            let getSchool = await School.findOne({loginid : userDetails._id}).lean().exec();


            console.log(getSchool)



            const Limit = reqBody.limit ? parseInt(reqBody.limit) : 10;
            const PageNo = reqBody.page ? parseInt(reqBody.page) : 0;
            const data = await Announcement.find({ school_id: getSchool._id }).sort({ updated_at: -1 }).skip(Limit * PageNo).limit(Limit).lean().exec();
            const count = await Announcement.count({ school_id: userDetails.school_id });


            return res.send({ status: true, data: data, count: count, message: 'Announcement List get successfully' });


        } catch (error) {


            return res.send({ status: false, message: error.message });
        }
    },




    deleteAnnouncement: async (req, res, next) => {
        try {
            const { _id } = req.body;


            if (!_id) {
                return res.send({ status: false, message: '_id is required' });
            }


            const deleted = await Announcement.findOneAndRemove({ _id: _id }).lean().exec();

            if (!deleted) {
                return res.send({ status: false, message: 'Announcement not found' });
            }

            return res.send({ status: true, message: 'Announcement deleted successfully' });

        } catch (error) {
            return res.send({ status: false, message: error.message });
        }
    },







}

