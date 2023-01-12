const user = require("../models/user");
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
  const userCkeck = await User.find({ email: email });
  if (userCkeck.length == 0) {
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
  } else {
    res.json({ status: "error", error: "Duplicate email" });
  }
};

const deleteEvent = async (req, res) => {
  const { user_id, cal_id, month_id, day_id, event_id } = req.params;
  const num = parseInt(month_id, 10);
  const num2 = parseInt(day_id, 10);

  const cal = await User.updateOne(
    { user_id: user_id },
    {
      $unset: {
        ["callendars.0.cal." + month_id + "." + day_id + ".event"]: "",
      },
    }
  );
  const dayData = await User.aggregate([
    { $match: { "callendars.cal_id": cal_id } },
    { $project: { _id: 0, cal: { $arrayElemAt: ["$callendars.cal", 0] } } },
    { $project: { _id: 0, cal2: { $arrayElemAt: ["$cal", num] } } },
    { $project: { _id: 0, cal3: { $arrayElemAt: ["$cal2", num2] } } },
  ]);

  res.status(200).json(dayData[0]);
};

const addEvent = async (req, res) => {
  const { user_id, cal_id, month_id, day_id } = req.params;
  const event = req.body;
  const num = parseInt(month_id, 10);
  const num2 = parseInt(day_id, 10);
  const cal = await User.updateOne(
    { "callendars.cal_id": cal_id },
    {
      $push: {
        ["callendars.0.cal." + month_id + "." + day_id + ".event"]: event,
      },
    }
  );

  const dayData = await User.aggregate([
    { $match: { "callendars.cal_id": cal_id } },
    { $project: { _id: 0, cal: { $arrayElemAt: ["$callendars.cal", 0] } } },
    { $project: { _id: 0, cal2: { $arrayElemAt: ["$cal", num] } } },
    { $project: { _id: 0, cal3: { $arrayElemAt: ["$cal2", num2] } } },
  ]);
  res.status(200).json(dayData[0]);
};

const checkLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await User.find({
      $and: [{ email: email }, { password: password }],
    });
    console.log(check[0]);
    if (check.length > 0) {
      res.status(200).json(check);
    } else {
      res.status(200).json({ message: "empty data" });
    }
  } catch {
    res.status(400).json({ error });
  }
};

const addCal = async (req, res) => {
  const { user_id } = req.params;
  const { data, seUser_id, seUsersCal_id, role } = req.body;
  console.log("req:   ", req.body);
  const check = await User.findOne({ user_id: user_id }, { lastname: 1 });
  if (check != null) {
    try {
      const user = await User.updateOne(
        { user_id: user_id },
        { $push: { callendars: data } }
      );
      console.log("user", user);
      if (seUser_id != null || seUsersCal_id != null) {
       
        const updateUsers = await User.updateMany(
          {},
          {
            $push: {
              ["callendars.$[element].users." + role]: [user_id, check.lastname],
            },},
            { arrayFilters: [ { "element.cal_id": seUsersCal_id } ] }
        );
        
      }
      
      const dayData = await User.aggregate([
        { $match: { user_id: seUser_id } },
        { $project: { _id: 0, cal: { $filter: { input: "$callendars", as: "cal", cond: { $eq: [ "$$cal.cal_id", seUsersCal_id ] } } } } }
    ]);
    
      console.log(dayData[0])
      res.status(200).json(dayData[0]);
    } catch (error) {
      console.log(seUser_id);
      res.json({ status: "error", error: "User not find" });
    }
  } else {
    res.json({ status: "error", error: "User not find" });
  }
};

const deleteCal = async (req, res) => {
  const { user_id, cal_id } = req.params;
  // const cal = await User.updateOne(
  //   { "callendars.cal_id": cal_id},
  //   {
  //     $unset: {
  //       ["callendars." ]: "",
  //     },
  //   }
  // );
  const cal = await User.updateMany(
    {},
    { $pull: { callendars: { cal_id: cal_id } } }
 )
 
  const dayData = await User.find(
    { user_id: user_id },
    { callendars: 1, _id: 0 }
  );
  res.status(200).json(dayData);
};

module.exports = {
  createUser,
  getCallendars,
  getSingleCallendar,
  deleteEvent,
  addEvent,
  checkLogin,
  addCal,
  deleteCal,
};
