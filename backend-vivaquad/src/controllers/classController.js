const db = require('../db/conn');
const {Class ,Stream ,School} = db;





module.exports = {

    //Class Model
    createClass: async (req, res, next) => {
 try {

const {  stream_id ,year , class_name} = req.body;
let reqBody = req.body;
const {  _id} = req.user;
const schoolInfo = await School.findOne({loginid : _id});
reqBody.school_id = schoolInfo._id



            let findClass = await Class.find({stream_id ,year,class_name , school_id :schoolInfo._id})
            if(findClass.length > 0){
                res.send({ status: false, message: "Class Already Exits"});
                return false;
            }

      
            const ClassModel = new Class(reqBody);
            const created = await ClassModel.save();
            return res.send({ status: true, message: 'Class created successfully' });

        } catch (error) {

            console.log(error)
            return res.send({ status: false, message: error.message });
        }
    },

    updateClass: async (req, res, next) => {
        try {
            const {  stream_id ,year , class_name} = req.body;
            const {  _id} = req.user;
            let reqBody = req.body;
            const schoolInfo = await School.findOne({loginid : _id});
            reqBody.school_id = schoolInfo._id

         



            const Id = reqBody._id;
            if (!Id) {
                return res.send({ status: false, message: 'Id is required' });
            }
          
            let findClass = await Class.find({_id: {$ne: Id} ,school_id :schoolInfo._id ,stream_id ,year,class_name})

            if(findClass.length > 0){
                res.send({ status: false, message: "Class Already Exits"});
                return false;
            }
            await Class.findByIdAndUpdate(Id, reqBody).lean().exec();
            return res.send({ status: true, message: 'Class updated successfully' });
    
        } catch (error) {
            return res.send({ status: false, message: error.message });
        }
    },
    
    getClassList: async (req, res, next) => {
        try {
    


            const data = await Class.find({});
            return res.send({ status: true, data: data, message:'Class get successfully' });
    
        } catch (error) {
    
            
            return res.send({ status: false, message: error.message });
        }
    },

    getAllClassList: async (req, res, next) => {
        try {
      


               let _id = req.body._id;
               const reqBody = req.body;
               const schoolInfo = await School.findOne({loginid : _id});
           

              
            
           
           
                       const Limit = reqBody.limit ? parseInt(reqBody.limit) : 10; 
                       const PageNo = reqBody.page ? parseInt(reqBody.page) : 0;
           
           
                       const data = await Class.find({school_id :schoolInfo._id}).sort({ updated_at: -1 }).skip(Limit * PageNo).limit(Limit).lean().exec();
                       const count = await Class.count({school_id :schoolInfo._id});

                       const dataList = await Promise.all(data && data.map(async (item) => {
                        let getStream = await Stream.findOne({
                          _id :  item.stream_id
                        });
                        item.stream_name = getStream.name


                        
                        return item 
                
                       }))
            

                     
                      return res.send({ status: true, data: data, count: count, message: 'Class List get successfully' });

    
        } catch (error) {

            console.log('error' , error.message);
    
            
            return res.send({ status: false, message: error.message });
        }
    },



    
    deleteClass: async (req, res, next) => {
    try {
        const { _id} = req.body;

     
        if (!_id) {
            return res.send({ status: false, message: '_id is required' });
        }


        const deleted = await Class.findOneAndRemove({ _id : req.body._id}).lean().exec();

        if (!deleted) {
            return res.send({ status: false, message: 'Class not found' });
        }

        return res.send({ status: true, message: 'Class deleted successfully' });

    } catch (error) {
        return res.send({ status: false, message: error.message });
    }
},





    
    
}

