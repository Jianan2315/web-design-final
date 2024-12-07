// File: server.js (Backend Entry Point)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');


const app = express();
app.use(bodyParser.json());
app.use(cors());


// 提供静态文件服务
app.use('/images', express.static('images')); // 确保这个路径指向后端项目中的 images 文件夹


const PORT = 5001;
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app._router.stack.forEach(function(r) {
    if (r.route && r.route.path) {
        console.log('Registered route:', r.route.path);
    }
});