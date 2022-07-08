const db = require('../db/conn');
const {Plan ,StripePayment} = db;





module.exports = {

    //Plan Model
    createPlan: async (req, res, next) => {
 try {

const {plan_price } = req.body;
let reqBody = req.body;
const {  _id} = req.user;
reqBody.user_id = _id

            let findPlan = await Plan.find({plan_price , user_id : _id})
            if(findPlan.length > 0){
                res.send({ status: false, message: "Plan Already Exits"});
                return false;
            }
            const PlanModel = new Plan(reqBody);
            const created = await PlanModel.save();
            return res.send({ status: true, message: 'Plan created successfully' });

        } catch (error) {

          
            return res.send({ status: false, message: error.message });
        }
    },

    updatePlan: async (req, res, next) => {
        try {
            const {plan_price } = req.body;
            let reqBody = req.body;
            const {  _id} = req.user;
            reqBody.user_id = _id
            const Id = reqBody._id;
            if (!Id) {
                return res.send({ status: false, message: 'Id is required' });
            }
          
            let findPlan = await Plan.find( {_id: {$ne: Id} ,user_id: _id ,plan_price: plan_price });

            if(findPlan.length > 0){
                res.send({ status: false, message: "Plan Already Exits"});
                return false;
            }
            await Plan.findByIdAndUpdate(Id, reqBody).lean().exec();
            return res.send({ status: true, message: 'Plan updated successfully' });
    
        } catch (error) {
            return res.send({ status: false, message: error.message });
        }
    },
    
    getPlanList: async (req, res, next) => {
        try {
    


            const data = await Plan.find({user_id : req.body.user_id});
            return res.send({ status: true, data: data, message:'Plan get successfully' });
    
        } catch (error) {
    
            
            return res.send({ status: false, message: error.message });
        }
    },

    getAllPlanList: async (req, res, next) => {
        try {
               let _id = req.body._id;
               const reqBody = req.body;
            
           
           
                       const Limit = reqBody.limit ? parseInt(reqBody.limit) : 10; 
                       const PageNo = reqBody.page ? parseInt(reqBody.page) : 0;
                       const data = await Plan.find().sort({ updated_at: -1 }).skip(Limit * PageNo).limit(Limit).lean().exec();
                       const count = await Plan.count();
            
                       
                      return res.send({ status: true, data: data, count: count, message: 'Plan List get successfully' });

    
        } catch (error) { 
    
            
            return res.send({ status: false, message: error.message });
        }
    },



    
    deletePlan: async (req, res, next) => {
    try {
        const { _id} = req.body;

     
        if (!_id) {
            return res.send({ status: false, message: '_id is required' });
        }


        const deleted = await Plan.findOneAndRemove({ _id : _id}).lean().exec();

        if (!deleted) {
            return res.send({ status: false, message: 'Plan not found' });
        }

        return res.send({ status: true, message: 'Plan deleted successfully' });

    } catch (error) {
        return res.send({ status: false, message: error.message });
    }
},
getUserPlanList: async (req, res, next) => {
    try {



        const data = await StripePayment.aggregate([
         {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: "_id",
                as: "userInfo"
            }
        },
        {
            $unwind: {
                path: '$userInfo',
                preserveNullAndEmptyArrays: true
            }
        },
     
        
        ]);


        console.log('data' ,data)
        return res.send({ status: true, data: data.reverse(), count: data.length, message: 'User Plan List get successfully' });


    } catch (error) {

        console.error(error.message);

        
        return res.send({ status: false, message: error.message });
    }
},




    
    
}

