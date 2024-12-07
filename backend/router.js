const express = require('express');
const { loginController, jobsController, companiesController, employeesController, addJobController } = require('./controller');

const router = express.Router();

// 登录路由
router.post('/login', loginController);

// 职位管理路由
router.get('/jobs', jobsController);
router.post('/create/job', addJobController);

// 公司信息路由
router.get('/companies', companiesController);

// 员工管理路由
router.get('/employees', employeesController);

module.exports = router;
