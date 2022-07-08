const db = require('../db/conn');
const {Lunch} = db;





module.exports = {

    //Lunch Model
    createLunch: async (req, res, next) => {
 try {

const {hall_name } = req.body;
let reqBody = req.body;
const {  _id} = req.user;
reqBody.user_id = _id

            let findLunch = await Lunch.find({hall_name , user_id : _id})
            if(findLunch.length > 0){
                res.send({ status: false, message: "Lunch Already Exits"});
                return false;
            }
            const LunchModel = new Lunch(reqBody);
            const created = await LunchModel.save();
            return res.send({ status: true, message: 'Lunch Holl created successfully' });

        } catch (error) {

          
            return res.send({ status: false, message: error.message });
        }
    },

    updateLunch: async (req, res, next) => {
        try {
            const {hall_name } = req.body;
            let reqBody = req.body;
            const {  _id} = req.user;
            reqBody.user_id = _id
            const Id = reqBody._id;
            if (!Id) {
                return res.send({ status: false, message: 'Id is required' });
            }
          
            let findLunch = await Lunch.find( {_id: {$ne: Id} ,user_id: _id ,hall_name: hall_name });

            if(findLunch.length > 0){
                res.send({ status: false, message: "Lunch Already Exits"});
                return false;
            }
            await Lunch.findByIdAndUpdate(Id, reqBody).lean().exec();
            return res.send({ status: true, message: 'Lunch Holl updated successfully' });
    
        } catch (error) {
            return res.send({ status: false, message: error.message });
        }
    },
    
    getLunchList: async (req, res, next) => {
        try {
    


            const data = await Lunch.find({user_id : req.body.user_id});
            return res.send({ status: true, data: data, message:'Lunch Holl get successfully' });
    
        } catch (error) {
    
            
            return res.send({ status: false, message: error.message });
        }
    },

    getAllLunchList: async (req, res, next) => {
        try {
               let _id = req.body._id;
               const reqBody = req.body;
            
           
           
                       const Limit = reqBody.limit ? parseInt(reqBody.limit) : 10; 
                       const PageNo = reqBody.page ? parseInt(reqBody.page) : 0;
                       const data = await Lunch.find({user_id : _id}).sort({ updated_at: -1 }).skip(Limit * PageNo).limit(Limit).lean().exec();
                       const count = await Lunch.count({user_id : _id});
            
                       
                      return res.send({ status: true, data: data, count: count, message: 'Lunch Holl List get successfully' });

    
        } catch (error) { 
    
            
            return res.send({ status: false, message: error.message });
        }
    },



    
    deleteLunch: async (req, res, next) => {
    try {
        const { _id} = req.body;

     
        if (!_id) {
            return res.send({ status: false, message: '_id is required' });
        }


        const deleted = await Lunch.findOneAndRemove({ _id : _id}).lean().exec();

        if (!deleted) {
            return res.send({ status: false, message: 'Lunch Holl not found' });
        }

        return res.send({ status: true, message: 'Lunch Holl deleted successfully' });

    } catch (error) {
        return res.send({ status: false, message: error.message });
    }
},





    
    
}

