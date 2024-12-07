const { loginService, jobsService, companiesService, employeesService, addJobService } = require('./service');

/**
 * 登录控制器
 */
const loginController = (req, res) => {
    const { username, password } = req.body;
    const result = loginService(username, password);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
};

/**
 * 获取职位列表控制器
 */
const jobsController = (req, res) => {
    const jobs = jobsService();
    res.status(200).json({ success: true, jobs });
};

/**
 * 获取公司信息控制器
 */
const companiesController = (req, res) => {
    const companies = companiesService();
    res.status(200).json({ success: true, companies });
};

/**
 * 获取员工信息控制器
 */
const employeesController = (req, res) => {
    const employees = employeesService();
    res.status(200).json({ success: true, employees });
};

/**
 * 添加新职位控制器
 */
const addJobController = (req, res) => {
    try {
        const job = req.body;
        addJobService(job);
        res.status(201).json({ success: true, message: 'Job added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding job' });
    }
};

module.exports = { loginController, jobsController, companiesController, employeesController, addJobController };
