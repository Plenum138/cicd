const db = require('../db/conn');
const {Role} = db;





module.exports = {

    //Role Model
    createRole: async (req, res, next) => {
 try {

const {roles} = req.body;
const reqBody = req.body;

            let findRole = await Role.find({roles})
            if(findRole.length > 0){
                res.send({ status: false, message: "Role Already Exits"});
                return false;
            }
            const RoleModel = new Role(reqBody);
            const created = await RoleModel.save();
            return res.send({ status: true, message: 'Role created successfully' });

        } catch (error) {

            console.log(error)
            return res.send({ status: false, message: error.message });
        }
    },

    updateRole: async (req, res, next) => {
        try {

            const reqBody = req.body;
            const Id = reqBody._id;
            if (!Id) {
                return res.send({ status: false, message: 'Id is required' });
            }
          
            let findRole = await Role.find( {_id: {$ne: Id} ,roles: req.body.roles });

            if(findRole.length > 0){
                res.send({ status: false, message: "Role Already Exits"});
                return false;
            }

       

            await Role.findByIdAndUpdate(Id, reqBody).lean().exec();
    
            return res.send({ status: true, message: 'Role updated successfully' });
    
        } catch (error) {
            return res.send({ status: false, message: error.message });
        }
    },
    
    getRoleList: async (req, res, next) => {
        try {
    


            const Roles = await Role.find({});
            return res.send({ status: true, data: Roles, message:'Role get successfully' });
    
        } catch (error) {
    
            
            return res.send({ status: false, message: error.message });
        }
    },

    getAllRoleList: async (req, res, next) => {
        try {
      


               let _id = req.body._id;
               const reqBody = req.body;
            
           
           
                       const Limit = reqBody.limit ? parseInt(reqBody.limit) : 10; 
                       const PageNo = reqBody.page ? parseInt(reqBody.page) : 0;
           
           
                       const Roles = await Role.find().sort({ updated_at: -1 }).skip(Limit * PageNo).limit(Limit).lean().exec();
                       const count = await Role.count();
            
                      return res.send({ status: true, data: Roles, count: count, message: 'Role List get successfully' });

    
        } catch (error) {
    
            
            return res.send({ status: false, message: error.message });
        }
    },



    
    deleteRole: async (req, res, next) => {
    try {
        const { _id} = req.body;

     
        if (!_id) {
            return res.send({ status: false, message: '_id is required' });
        }


        const deleted = await Role.findOneAndRemove({ _id : req.body._id}).lean().exec();

        if (!deleted) {
            return res.send({ status: false, message: 'Role not found' });
        }

        return res.send({ status: true, message: 'Role deleted successfully' });

    } catch (error) {
        return res.send({ status: false, message: error.message });
    }
},





    
    
}

