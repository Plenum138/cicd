const db = require('../db/conn');
const {Subject ,School ,Role ,UserLogins ,Class} = db;





module.exports = {

    //SUBJECT Model
    createSubject: async (req, res, next) => {
 try {

const {subject_name } = req.body;
let reqBody = req.body;
const {  _id} = req.user;
const schoolInfo = await School.findOne({loginid : _id});
reqBody.school_id = schoolInfo._id


            let findSubject = await Subject.find({subject_name , school_id : schoolInfo._id})
            if(findSubject.length > 0){
                res.send({ status: false, message: "Subject Already Exits"});
                return false;
            }
            const SubjectModel = new Subject(reqBody); 
            const created = await SubjectModel.save();
            return res.send({ status: true, message: 'Subject created successfully' });

        } catch (error) {

          
            return res.send({ status: false, message: error.message });
        }
    },

    updateSubject: async (req, res, next) => {
        try {
            const {subject_name } = req.body;
            let reqBody = req.body;
            const {  _id} = req.user;
            reqBody.user_id = _id
            
            const Id = reqBody._id;
            if (!Id) {
                return res.send({ status: false, message: 'Id is required' });
            }
          
            const schoolInfo = await School.findOne({loginid : _id});


            let findSubject = await Subject.find( {_id: {$ne: Id} ,school_id : schoolInfo._id ,subject_name: subject_name });

            if(findSubject.length > 0){
                res.send({ status: false, message: "Subject Already Exits"});
                return false;
            }
            await Subject.findByIdAndUpdate(Id, reqBody).lean().exec();
            return res.send({ status: true, message: 'Subject updated successfully' });
    
        } catch (error) {
            return res.send({ status: false, message: error.message });
        }
    },
    

    getAllSubjectList: async (req, res, next) => {
        try {
               let _id = req.body._id;
               const reqBody = req.body;
            const schoolInfo = await School.findOne({loginid : _id});

            
           
           
                       const Limit = reqBody.limit ? parseInt(reqBody.limit) : 10; 
                       const PageNo = reqBody.page ? parseInt(reqBody.page) : 0;
                       const data = await Subject.find({school_id : schoolInfo._id}).sort({ updated_at: -1 }).skip(Limit * PageNo).limit(Limit).lean().exec();
                       const count = await Subject.count({school_id : schoolInfo._id});
            
                       
                      return res.send({ status: true, data: data, count: count, message: 'Subject List get successfully' });

    
        } catch (error) { 
    
            
            return res.send({ status: false, message: error.message });
        }
    },



    
    deleteSubject: async (req, res, next) => {
    try {
        const { _id} = req.body;

     
        if (!_id) {
            return res.send({ status: false, message: '_id is required' });
        }


        const deleted = await Subject.findOneAndRemove({ _id : _id}).lean().exec();

        if (!deleted) {
            return res.send({ status: false, message: 'Subject not found' });
        }

        return res.send({ status: true, message: 'Subject deleted successfully' });

    } catch (error) {
        return res.send({ status: false, message: error.message });
    }
},



getSubjectList: async (req, res, next) => { 
    try { 

const { user_id} = req.body;
const schoolInfo = await School.findOne({loginid : user_id});
const getRole = await Role.findOne({roles : 'Teacher' });



const getTeachers = await UserLogins.find({ employee_type: getRole._id,school_id : schoolInfo._id, roles : 'EMPLOYEE',  user_status: true});
const subjectList = await Subject.find({school_id : schoolInfo._id});
const getClassList = await Class.aggregate([ { $match: {school_id : schoolInfo._id}},{$lookup: { from: 'streams',localField: 'stream_id', foreignField: "_id",as: "streamInfo"}},{ $unwind: {path: '$streamInfo', preserveNullAndEmptyArrays: true},}]);
const streamList = [...new Map(getClassList.map((item) => [item.streamInfo["name"], item])).values(),];
const data = {
    teacher_list : getTeachers,
    class_list : getClassList,
    subject_list : subjectList,
    stream_list : streamList,

}





        return res.send({ status: true, data: data, message:'Subject get successfully' });

    } catch (error) {

        
        return res.send({ status: false, message: error.message });
    }
},




    
    
}

