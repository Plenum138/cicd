const firebase = require("firebase-admin");
const db = require('../../db/conn');
const UserLogins = db.UserLogins;
const serviceAccount = require('./secret.json');
module.exports = {
  sendPushNotificationToSingleUser(status,title,body, firebase_token ,type) {

    return new Promise(async (resolve, reject) => {
        try {
            if (['', undefined, null].includes(firebase_token)) {
                return resolve(false);
            }
  
            if (!firebase.apps.length) {
              firebase.initializeApp({
                credential: firebase.credential.cert(serviceAccount),
              });}
            

              const payload = {
                notification: {
                  title: title,
                  sound: "default",
                  body: body,
                 
                },
                data: {
                  status:status,  
                  type: type,
                }
              };
        
              const options = {
                priority: 'high',
                timeToLive: 60 * 60 * 24, // 1 day
              };

            firebase.messaging().sendToDevice(firebase_token, payload, options).then((response) => {
                console.log('Successfully sent message:', response);
                console.log('Successfully sent message:', response.results);
                data = { message: "successfully send message" }
                return resolve(data);
            })
                .catch((error) => {
                    console.log('Error sending message:', error);
                    return resolve(false);
                });



        } catch (error) {
            console.log("error", error);
            return resolve(false);
        }
    });
},


sendPushNotificationSwipe(status,title,body, firebase_token) {

  return new Promise(async (resolve, reject) => {
      try {
          if (['', undefined, null].includes(firebase_token)) {
              return resolve(false);
          }


          if (!firebase.apps.length) {
            firebase.initializeApp({
              credential: firebase.credential.cert(serviceAccount),
            });}
          

            const payload = {
              notification: {
               
                title: title,
                sound: "default",
                body: body,
                

                
              },
              data: { 
                status:status,  
                type: 'Swipe',
              }
            };
      
            const options = {
              priority: 'high',
              timeToLive: 60 * 60 * 24, // 1 day
            };

          firebase.messaging().sendToDevice(firebase_token, payload, options).then((response) => {

              console.log('Successfully sent message:', response);
              console.log('Successfully sent message:', response.results);
              data = { message: "successfully send message" }
              return resolve(data);
          })
              .catch((error) => {
                  console.log('Error sending message:', error);

                  return resolve(false);
              });



      } catch (error) {
          console.log("error", error);
          return resolve(false);
      }
  });
},

  sendSingleNotification(status,title, firebase_token,) {

    try {
      if (!firebase.apps.length) {
      firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
      });
    }

      const payload = {
        notification: {
          
          title: title,
          sound: "default",
          click_action: "FLUTTER_NOTIFICATION_CLICK",
          
        },
        data: {
          status:status,  
        }
      };

      const options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24, // 1 day
      };

      if (firebase_token !== null || firebase_token !== undefined) {
        firebase.messaging().sendToDevice(firebase_token, payload, options).then(function (response) {
          return console.log("Successfully sent message: ", response);
        })
          .catch(function (error) {
            return console.log("Error sending message: ", error);
          });
      }

      data = { message: "successfully send message" }

      return data;
    } catch (e) {
      console.log("error", e);
      return e;
    }
  },
  sendNotificationAnnouncement(status ,title,message , firebaseArray) {
    return new Promise(async (resolve, reject) => {
      try {



        firebaseArray.map((data) => {
      
 
            if (!firebase.apps.length) {
              firebase.initializeApp({
                credential: firebase.credential.cert(serviceAccount),
              });
            }

        
            const payload = {
              notification: {
               
                title: title,
                sound: "default",
                body: message,
                channel_id : 'sbjhasjbasjbas'
                
              },
              data: {
                status:status,  
              }
            };
      
            const options = {
              priority: 'high',
              timeToLive: 60 * 60 * 24, // 1 day
            };

            const firebase_token = data.firebase_token;
            const username = data.username;

            if (firebase_token !== null || firebase_token !== undefined) {
              console.log('firebase_token' , firebase_token)
              console.log('username' , username)
              firebase.messaging().sendToDevice(firebase_token, payload, options).then(function (response) {
                return console.log("Successfully sent message: ", response);
              })
                .catch(function (error) {
                  return console.log("Error sending message: ", error);
                }); 
            }

          

          data = { message: "successfully send message" }

          return resolve(data);
        })

      } catch (error) {
        console.log("error", error);

        return resolve(false);
      }
    });
  },
  sendNotificationClass(status ,title,message , firebaseArray , type) {
    return new Promise(async (resolve, reject) => {
      try {



        firebaseArray.map((data) => {
      
 
            if (!firebase.apps.length) {
              firebase.initializeApp({
                credential: firebase.credential.cert(serviceAccount),
              });
            }

        
            const payload = {
              notification: {
               
                title: title,
                sound: "default",
                body: message,
                channel_id : String(data._id)
                
              },
              data: {
                status:status,
                type: type,  
              }
            };
      
            const options = {
              priority: 'high',
              timeToLive: 60 * 60 * 24, // 1 day
            };

            const firebase_token = data.firebase_token;

            if (firebase_token !== null || firebase_token !== undefined) {
              // console.log('firebase_token' , firebase_token)
              // console.log('username' , username)
              firebase.messaging().sendToDevice(firebase_token, payload, options).then(function (response) {
                // return console.log("Successfully sent message: ", response);
              })
                .catch(function (error) {
                  return console.log("Error sending message: ", error);
                }); 
            }

          

          data = { message: "successfully send message" }

          return resolve(data);
        })

      } catch (error) {
        console.log("error", error);

        return resolve(false);
      }
    });
  },



}


