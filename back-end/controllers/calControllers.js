const User = require("../models/user");

const getCallendars = async (req, res) => {
  const { user_id } = req.params;
  const cals = await User.find({ user_id: user_id }, { callendars: 1, _id: 0 });

  res.status(200).json(cals);
  console.log(cals);
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
  try {
    const user = await User.create({
      user_id,
      name,
      lastname,
      email,
      password,
    });
    res.json(user);
  } catch (error) {
    res.json({ status: "error", error: "Duplicate email" });
    console.log(error);
  }

};

const deleteEvent = async (req, res) => {
  const { user_id, cal_id, month_id, day_id, event_id } = req.params;

  const cal = await User.updateOne(
    { user_id: user_id, "callendars.cal_id": cal_id },
    {
      $unset: {
        ["callendars.$.cal." + month_id + "." + day_id + ".event." + event_id]:
          "",
      },
    }
  );
  res.status(200);
};

const addEvent = async (req, res) => {
  const { user_id, cal_id, month_id, day_id } = req.params;
  const event = req.body;
  const cal = await User.updateOne(
    { user_id: user_id },
    {
      $push: {
        ["callendars."+cal_id+".0.cal." + month_id + "." + day_id + ".event"]: event,
      },
    }
  );
  const cal2 = await User.find({}, {user_id:1, "callendars.cal.event": 1 });
  console.log(cal);
  res.status(200).json(cal2);
};

const checkLogin = async (req, res) => {

  const { email, password } = req.body;
  try {
    const check = await User.find({
      $and: [{ email: email }, { password: password }],
    });
    console.log(check[0])
    if(check.length > 0){
      res.status(200).json(check);
      
    }else{
      res.status(200).json({ message:"empty data" });
    }
  } catch {
    res.status(400).json({ error });
  }
}

const addCal = async (req, res) => {
  const {user_id} = req.params
  const {cal} = req.body
  try {
    const user = await User.updateOne({user_id: user_id},{$push:{'callendars': cal}})
    const cal_id = await User.findOne({user_id: user_id},{callendars:1})
    console.log(cal_id.callendars.length )
    res.status(200).json({user:user, cal_id:cal_id.callendars.length});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

module.exports = {
  createUser,
  getCallendars,
  getSingleCallendar,
  deleteEvent,
  addEvent,
  checkLogin,
  addCal,
};
