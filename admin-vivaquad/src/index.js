//import React from 'react';
import dva from 'dva'; // { connect }
import createLoading from 'dva-loading';
import 'antd/dist/antd.less'   //'antd/dist/antd.css';
import './assets/styles/css/style.css';
import './assets/styles/css/index.css';
 
const app = dva();
// 2. Plugins
app.use(createLoading()); 
app.model(require('./models/global').default);
app.model(require('./models/auth').default); 
app.model(require('./models/setting').default);
app.model(require('./models/users').default);
app.model(require('./models/account').default);
app.model(require('./models/pages').default)
app.model(require('./models/notification').default)
app.model(require('./models/roles').default)
app.model(require('./models/streams').default)
app.model(require('./models/classes').default)
app.model(require('./models/lunches').default)
app.model(require('./models/announcements').default)
app.model(require('./models/subjects').default)
app.model(require('./models/time_tables').default)
app.model(require('./models/plans').default)









app.router(require('./routes/router').default);
app.start('#root');