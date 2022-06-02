const getAllJobs = async (req, res) => {
  res.send("Get all job");
};

const getJob = async (req, res) => {
 
  res.send("Login Job");
};
const createJob = async (req, res) => {
  console.log("Hello World")
  res.send("Post job")
};
const updateJob = async (req, res) => {
  res.send("Update Job");
};
const deleteJob = async (req, res) => {
  res.send("Delete Job");
};

module.exports = {
  getAllJobs,
  createJob,
  updateJob,
  getJob,
  deleteJob,
};
