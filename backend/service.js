const { users, jobPosts, companies } = require('./model'); // 导入数据

/**
 * 登录服务：验证用户名和密码
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Object} - 包含成功状态和用户类型
 */
const loginService = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        return { success: true, type: user.type }; // 返回用户类型
    } else {
        return { success: false };
    }
};

/**
 * 获取所有职位数据
 * @returns {Array} - 返回职位数据数组
 */
const jobsService = () => {
    console.log('Fetching job posts...');
    return jobPosts;
};

/**
 * 获取所有公司信息
 * @returns {Array} - 返回公司数据数组
 */
const companiesService = () => {
    console.log('Fetching companies...');
    return companies;
};

/**
 * 获取所有员工信息
 * @returns {Array} - 返回用户数据数组
 */
const employeesService = () => {
    console.log('Fetching employees...');
    return users; // 假设 users 数据同时存储用户和员工信息
};

/**
 * 添加新职位到职位列表
 * @param {Object} job - 包含新职位数据的对象
 */
const addJobService = (job) => {
    console.log('Adding new job:', job);
    jobPosts.push(job); // 将新职位添加到 jobPosts 数组
    console.log('Updated job posts:', jobPosts);
};

module.exports = { loginService, jobsService, companiesService, employeesService, addJobService };
