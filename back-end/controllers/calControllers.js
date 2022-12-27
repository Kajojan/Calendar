const User = require("../models/user");

const getCallendars = async (req, res) => {
  const { user_id } = req.params;
  const cals = await User.find(
    { user_id: user_id },
    { callendars: 1, _id: 0 }
  );

  res.status(200).json(cals);
  console.log(cals)
};

const getSingleCallendar = async (req, res) => {
  const { user_id, cal_id } = req.params;
  const cal = await User.find(
    { user_id: user_id },
    { _id: 0, callendars: { $elemMatch: { cal_id: cal_id } } }
  );

  res.status(200).json(cal);
};

const createUser = async (req, res) => {
  const { user_id, name, lastname, email, password } = req.body;
  console.log(req.body)
  //add to db
  try {
    const user = await User.create({
      user_id,
      name,
      lastname,
      email,
      password,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { user_id, cal_id, month_id, day_id, event_id } = req.params;
 
  const cal = await User.updateOne(
    { user_id: user_id, "callendars.cal_id": cal_id },
    {
      $unset: { ["callendars.$.cal."+ month_id+"." + day_id+".event."+ event_id]: "" },
    }
  );
    res.status(200)
};

const addEvent = async (req, res) => {
  const { user_id, cal_id, month_id, day_id } = req.params;
  const event = req.body
 
  const cal = await User.updateOne(
    { user_id: user_id, "callendars.cal_id": cal_id },
    {
      $push: { ["callendars.$.cal."+ month_id+"." + day_id+".event"]: event },
    }
  );
const cal2 = await User.find({},{"callendars.cal.event":1})
console.log(cal2)
res.status(200).json(cal2)
};

module.exports = {
  createUser,
  getCallendars,
  getSingleCallendar,
  deleteEvent,
  addEvent,
};