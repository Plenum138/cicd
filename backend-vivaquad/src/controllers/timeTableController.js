const db = require('../db/conn');
const { Time_Table, School, UserLogins } = db;
let mongoose = require('mongoose')
const moment = require('moment');
const scheduler = require('../helper/scheduler');








module.exports = {

    //Time_Table Model

    createTimeTable: async (req, res, next) => {



        try {





            const { stream_id, year, class_name, subject_id, teacher_id, date, time_range,class_location ,days } = req.body;
            const getSchool = await School.findOne({ loginid: req.user._id });

            let tableData = {
                teacher_id: teacher_id,
                school_id: getSchool._id,
                subject_id: subject_id,
                stream_id: stream_id,
                year: year,
                class: class_name,
                startTime: time_range[0],
                endTime: time_range[1],
                startDate : date[0],
                endDate :  date[1],
                class_location: class_location,
                days:days,
                
                

            }

           

            function getDaysBetweenDates(start, end, days) {
                var result = []; 
                days.map((val)=>{
                    var current = new Date(start);
                    // Shift to next of required days
                    current.setDate(current.getDate() + (val - current.getDay() + 7) % 7);
                    // While less than end date, add dates to result array
                    while (current <= end) {
                      result.push(new Date(+current));
                      current.setDate(current.getDate() + 7);
                    }
                }
                )
               
                // Copy start date
            
                return result;  
              }
              
            let allDate = getDaysBetweenDates( moment(tableData.startDate),moment(tableData.endDate),  days)
            tableData.all_dates = allDate
              
             

            // let findTime_Table = await Time_Table.find({hall_name , user_id : _id})
            // if(findTime_Table.length > 0){
            //     res.send({ status: false, message: "Time_Table Already Exits"});
            //     return false;
            // }
            const Time_TableModel = new Time_Table(tableData);
            await Time_TableModel.save();
            scheduler.scheduleAllJobs()
            return res.send({ status: true, message: 'created successfully' });

        } catch (error) {


            return res.send({ status: false, message: error.message });
        }
    },

    updateTimeTable: async (req, res, next) => {
        try {


            const { stream_id, year, class_name, subject_id, teacher_id, date, time_range, _id,class_location ,days } = req.body;

            let tableData = {
                teacher_id: teacher_id,
                subject_id: subject_id,
                stream_id: stream_id,
                year: year,
                class: class_name,
                startTime: time_range[0],
                endTime: time_range[1],
                startDate : date[0],
                endDate :  date[1],
                class_location: class_location,
                days:days,
                
                

            }

            let findTime_Table = await Time_Table.findById(_id);
            

          

            if (!_id) {
                return res.send({ status: false, message: 'Id is required' });
            }

                function getDaysBetweenDates(start, end, days) {
                    var result = []; 
                    days.map((val)=>{
                        var current = new Date(start);
                        // Shift to next of required days
                        current.setDate(current.getDate() + (val - current.getDay() + 7) % 7);
                        // While less than end date, add dates to result array
                        while (current <= end) {
                          result.push(new Date(+current));
                          current.setDate(current.getDate() + 7);
                        }
                    }
                    )
                   
                    // Copy start date
                
                    return result;  
                  }
                  
                let allDate = getDaysBetweenDates( moment(tableData.startDate),moment(tableData.endDate),  days)
                tableData.all_dates = allDate

          
            let updated = await Time_Table.updateOne({ _id: _id }, tableData).lean().exec();
            scheduler.scheduleAllJobs()


            return res.send({ status: true, message: 'updated successfully' });

        } catch (error) {
            return res.send({ status: false, message: error.message });
        }
    },

    getAllTimeTableList: async (req, res, next) => {
        try {

            const { stream_id, year, class_name, subject_id, teacher_id, date } = req.body;
           
            const getSchool = await School.findOne({ loginid: req.user._id });
            let match = { school_id: getSchool._id }
          
            if (stream_id) {
                match.stream_id = mongoose.Types.ObjectId(stream_id)
            }
            if (year) {
                match.year = year
            }
            if (class_name) {
                match.class = class_name
            }
            if (subject_id) {
                match.subject_id = mongoose.Types.ObjectId(subject_id)
            }
            if (teacher_id) {
                match.teacher_id = mongoose.Types.ObjectId(teacher_id)
            }
            if (date) {
                let dateFormat = moment(date).format("yyyy-MM-DD");

                // match.date = {
                //     $gte: new Date(`${dateFormat}T00:00:00.000Z`),
                //     $lt: new Date(`${dateFormat}T23:59:59.999Z`),
                // }

                match.all_dates = {
                    "$elemMatch": {   $gte: new Date(`${dateFormat}T00:00:00.000Z`),
                                     $lt: new Date(`${dateFormat}T23:59:59.999Z`),  }
                  }

            }


console.log('match' ,match)

            const listData = await Time_Table.aggregate([
                {
                    $match: match
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'teacher_id',
                        foreignField: "_id",
                        as: "userInfo"
                    }
                },
                {
                    $lookup: {
                        from: 'streams',
                        localField: 'stream_id',
                        foreignField: "_id",
                        as: "streamInfo"
                    }
                },
                {
                    $lookup: {
                        from: 'subjects',
                        localField: 'subject_id',
                        foreignField: "_id",
                        as: "subjectInfo"
                    }
                },
                {
                    $unwind: {
                        path: '$userInfo',
                        preserveNullAndEmptyArrays: true
                    },
                    $unwind: {
                        path: '$streamInfo',
                        preserveNullAndEmptyArrays: true
                    }, $unwind: {
                        path: '$subjectInfo',
                        preserveNullAndEmptyArrays: true
                    }
                },
                { $sort: { updated_at: -1 } },


            ]);








            return res.send({ status: true, data: listData, message: 'get successfully' });

        } catch (error) {


            return res.send({ status: false, message: error.message });
        }
    },

    getAllTime_TableList: async (req, res, next) => {
        try {
            let _id = req.body._id;
            const reqBody = req.body;



            const Limit = reqBody.limit ? parseInt(reqBody.limit) : 10;
            const PageNo = reqBody.page ? parseInt(reqBody.page) : 0;
            const data = await Time_Table.find({ user_id: _id }).sort({ updated_at: -1 }).skip(Limit * PageNo).limit(Limit).lean().exec();
            const count = await Time_Table.count({ user_id: _id });


            return res.send({ status: true, data: data, count: count, message: 'Time_Table Holl List get successfully' });


        } catch (error) {


            return res.send({ status: false, message: error.message });
        }
    },




    deleteTimeTable: async (req, res, next) => {
        try {
            const reqQuery = req.query;
            const _id = reqQuery.slug;



            if (!_id) {
                return res.send({ status: false, message: '_id is required' });
            }


            const deleted = await Time_Table.findOneAndRemove({ _id: _id }).lean().exec();

            if (!deleted) {
                return res.send({ status: false, message: 'not found' });
            }


            //Remove Schedule from timetable
            scheduler.removeScheduledJob(String(_id))

            return res.send({ status: true, message: 'deleted successfully' });

        } catch (error) {
            return res.send({ status: false, message: error.message });
        }
    },

    getTimeTable: async (req, res, next) => {

        try {
            const reqQuery = req.query;
            const _id = reqQuery.slug;
            console.log(_id)

            if (!_id) {
                return res.send({ status: false, message: '_id is required' });
            }

            const data = await Time_Table.find({ _id: _id }).lean().exec();






            return res.send({ status: true, data: data, message: 'get successfully' });

        } catch (error) {
            return res.send({ status: false, message: error.message });
        }
    },


    getUserTimeTable: async (req, res, next) => {

        try {
            const { user_id, date } = req.body;
            const get_user = await UserLogins.findById(user_id);
            if (!user_id) {
                return res.send({ status: 400, message: 'user_id is required' });
            }
            let match = {
                school_id: mongoose.Types.ObjectId(get_user.school_id),
                stream_id: mongoose.Types.ObjectId(get_user.stream_id),
                year: get_user.year,
                class: get_user.class_name ,
                remove_user_id : {$nin : [user_id] }
            }

            if (date) {
                let dateNew = new Date(date)
                let dateFormat = moment(dateNew).format("yyyy-MM-DD");
                match.all_dates = {
                    "$elemMatch": {   $gte: new Date(`${dateFormat}T00:00:00.000Z`),
                                     $lt: new Date(`${dateFormat}T23:59:59.999Z`),  }
                  }
            }



            const data = await Time_Table.aggregate([
                {
                    $match: match
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'teacher_id',
                        foreignField: "_id",
                        as: "teacherInfo"
                    }
                },
                {
                    $lookup: {
                        from: 'streams',
                        localField: 'stream_id',
                        foreignField: "_id",
                        as: "streamInfo"
                    }
                },
                {
                    $lookup: {
                        from: 'subjects',
                        localField: 'subject_id',
                        foreignField: "_id",
                        as: "subjectInfo"
                    }
                },
                {
                    $unwind: {
                        path: '$teacherInfo',
                        preserveNullAndEmptyArrays: true
                    },
                    $unwind: {
                        path: '$streamInfo',
                        preserveNullAndEmptyArrays: true
                    }, $unwind: {
                        path: '$subjectInfo',
                        preserveNullAndEmptyArrays: true
                    }
                },

                {$sort: {created_at: -1}}
            ]);






            


            return res.send({ status: 200, list: data, message: 'get successfully' });

        } catch (error) {
            return res.send({ status: 400, message: error.message });
        }
    },

    removeUserTimeTable: async (req, res, next) => {


        try {  
            const {_id } =req.body

          

            if (!_id) {
                return res.send({ status: 400, message: '_id is required' });
            }

          let updateTimeTable =   await Time_Table.findOneAndUpdate(  { _id: _id },   { $push: { remove_user_id: req.user._id  } },)

       
         return res.send({ status: 200, message: 'removed successfully' });

        } catch (error) {
            return res.send({ status: 400, message: error.message });
        }
    },

    createTimeTableCopy: async (req, res, next) => {
  

        try {


            const { stream_id, year, class_name, subject_id, teacher_id, date, time_range ,class_location } = req.body;
            const getSchool = await School.findOne({ loginid: req.user._id });

            let tableData = {
                teacher_id: teacher_id,
                school_id: getSchool._id,
                subject_id: subject_id,
                stream_id: stream_id,
                year: year,
                class: class_name,
                startTime: time_range[0],
                endTime: time_range[1],
                date: date,
                class_location : class_location

            }
            let dateFormat = moment(date).format("yyyy-MM-DD");
            let mytimeval;




            let findTime_Table = await Time_Table.find({ school_id: getSchool._id, stream_id: stream_id, year: year, class: class_name, date: { $gte: new Date(`${dateFormat}T00:00:00.000Z`), $lt: new Date(`${dateFormat}T23:59:59.999Z`) } })
            const gettimewithmap = findTime_Table.map((time,i)=>{
             
              const time1=moment(time?.startTime).format("HH:mm")+" "+"-"+" "
              const time2=moment(time?.endTime).format("HH:mm")
           
                return  time1+time2
              })

              let start = moment(time_range[0]).format("HH:mm")+" "+"-"+" ";
              let end = moment(time_range[1]).format("HH:mm");
              const arr=[`${start}${end}`]

              console.log('pervious' , gettimewithmap)
              console.log('new' , arr)


            

              const timeval=(val)=>{
                console.log('last val',val)
               let vali=val.map((value)=>{
                 let n=8
                   let newval=value.substring(0,5)
                   let newval2=value.substring(8,14)
     
                   let newvalmin =Number(newval.substring(0,2)*60)+Number(newval.substring(3,5))
                   let newval2min =Number(newval2.substring(0,2)*60)+Number(newval2.substring(3,5))
                  
                   const subarrstring=arr[0].substring(0,5)
                   const subarrstring2=arr[0].substring(8,14)
                   
                   let subarrstringmin=Number(subarrstring.substring(0,2)*60)+Number(subarrstring.substring(3,5))
                   let subarrstringmin2=Number(subarrstring2.substring(0,2)*60)+Number(subarrstring2.substring(3,5))
                  
             if(newval2min>subarrstringmin2){
              
               if(newvalmin<subarrstringmin2 && subarrstringmin2<newval2min  ){
                
                 return 'not1'
               
               
               }else{
                return 'add1'
                 
               }
             }else{
             
               if(newvalmin<subarrstringmin && subarrstringmin<newval2min  ){
                
                 //console.log('not adding2')
                 return 'not2'
               
               }else{
                 
                
                 return 'add2'
               }
             }
                  
                   
               })
                console.log('vali',vali)
                if(vali.includes('not1')||vali.includes('not2')){
                  console.log('add nhi hoga')
                }else{
                 gettimewithmap.indexOf(arr) === -1 ? gettimewithmap.push(arr[0]) : console.log("This item already exists");
                 
                 mytimeval=gettimewithmap
                }
              } 


              let checkAdd = timeval(gettimewithmap)
            //   console.log('mytimeval',([...new Set (mytimeval)]))
              const finaltime=[...new Set (mytimeval)]

              console.log('finaltime', finaltime)
            


              
          
            if (findTime_Table.length > 0) {
                res.send({ status: false, message: "Time_Table Already Exits" });
                return false;
            } else {
                return res.send({ status: false, message: "success" });

            }
            const Time_TableModel = new Time_Table(tableData);
            await Time_TableModel.save();
            scheduler.scheduleAllJobs()
            return res.send({ status: true, message: 'created successfully' });

        } catch (error) {


            return res.send({ status: false, message: error.message });
        }
    },



}

