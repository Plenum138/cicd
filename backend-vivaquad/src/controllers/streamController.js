const db = require('../db/conn');
const {Stream} = db;





module.exports = {

    //Stream Model
    createStream: async (req, res, next) => {
 try {

const {name} = req.body;
const reqBody = req.body;

            let findStream = await Stream.find({name})
            if(findStream.length > 0){
                res.send({ status: false, message: "Stream Already Exits"});
                return false;
            }
            const StreamModel = new Stream(reqBody);
            const created = await StreamModel.save();
            return res.send({ status: true, message: 'Stream created successfully' });

        } catch (error) {

            console.log(error)
            return res.send({ status: false, message: error.message });
        }
    },

    updateStream: async (req, res, next) => {
        try {

            const reqBody = req.body;
            const Id = reqBody._id;
            if (!Id) {
                return res.send({ status: false, message: 'Id is required' });
            }
          
            let findStream = await Stream.find( {_id: {$ne: Id} ,name: req.body.name });

            if(findStream.length > 0){
                res.send({ status: false, message: "Stream Already Exits"});
                return false;
            }
            await Stream.findByIdAndUpdate(Id, reqBody).lean().exec();
            return res.send({ status: true, message: 'Stream updated successfully' });
    
        } catch (error) {
            return res.send({ status: false, message: error.message });
        }
    },
    
    getStreamList: async (req, res, next) => {
        try {
    


            const data = await Stream.find({});
            return res.send({ status: true, data: data, message:'Stream get successfully' });
    
        } catch (error) {
    
            
            return res.send({ status: false, message: error.message });
        }
    },

    getAllStreamList: async (req, res, next) => {
        try {
      


               let _id = req.body._id;
               const reqBody = req.body;
            
           
           
                       const Limit = reqBody.limit ? parseInt(reqBody.limit) : 10; 
                       const PageNo = reqBody.page ? parseInt(reqBody.page) : 0;
           
           
                       const data = await Stream.find().sort({ updated_at: -1 }).skip(Limit * PageNo).limit(Limit).lean().exec();
                       const count = await Stream.count();
            
                      return res.send({ status: true, data: data, count: count, message: 'Stream List get successfully' });

    
        } catch (error) { 
    
            
            return res.send({ status: false, message: error.message });
        }
    },



    
    deleteStream: async (req, res, next) => {
    try {
        const { _id} = req.body;

     
        if (!_id) {
            return res.send({ status: false, message: '_id is required' });
        }


        const deleted = await Stream.findOneAndRemove({ _id : req.body._id}).lean().exec();

        if (!deleted) {
            return res.send({ status: false, message: 'Stream not found' });
        }

        return res.send({ status: true, message: 'Stream deleted successfully' });

    } catch (error) {
        return res.send({ status: false, message: error.message });
    }
},





    
    
}

