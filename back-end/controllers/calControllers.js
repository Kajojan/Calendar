const User = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const token = jwt.sign(
    {
      user: user_id,
    },
    process.env.JWT_SECRET
  );

  const userCkeck = await User.find({ email: email });
  if (userCkeck.length == 0) {
    try {
      const user = await User.create({
        user_id,
        name,
        lastname,
        email,
        password: passwordHash,
      });
      res.cookie("token", token, {
        httpOnly: true,
      }).send()
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
  console.log(req.params);
  const num = parseInt(month_id, 10);
  const num2 = parseInt(day_id, 10);

  const cal = await User.updateMany(
    {},
    {
      $unset: {
        ["callendars.$[element].cal." +
        num +
        "." +
        num2 +
        ".event." +
        event_id]: "",
      },
    },
    { arrayFilters: [{ "element.cal_id": cal_id }] }
  );
  const dayData = await User.aggregate([
    { $match: { user_id: user_id } },
    {
      $project: {
        _id: 0,
        cal: {
          $filter: {
            input: "$callendars",
            as: "cal",
            cond: { $eq: ["$$cal.cal_id", cal_id] },
          },
        },
      },
    },
  ]);

  const allcall = await User.find(
    { user_id: user_id },
    { callendars: 1, _id: 0 }
  );
  console.log(dayData);
  res.status(200).json({ event: dayData[0].cal[0], allcal: allcall });
};

const addEvent = async (req, res) => {
  const { user_id, cal_id, month_id, day_id, event_id } = req.params;
  const event = req.body;
  const num = parseInt(month_id, 10);
  const num2 = parseInt(day_id, 10);
  const cal = await User.updateMany(
    {},
    {
      $push: {
        ["callendars.$[element].cal." + month_id + "." + day_id + ".event"]:
          event,
      },
    },
    { arrayFilters: [{ "element.cal_id": cal_id }] }
  );

  const dayData = await User.aggregate([
    { $match: { user_id: user_id } },
    {
      $project: {
        _id: 0,
        cal: {
          $filter: {
            input: "$callendars",
            as: "cal",
            cond: { $eq: ["$$cal.cal_id", cal_id] },
          },
        },
      },
    },
  ]);

  const allcall = await User.find(
    { user_id: user_id },
    { callendars: 1, _id: 0 }
  );

  res.status(200).json({ event: dayData[0].cal[0], allcal: allcall });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await User.find({ email: email });
    console.log(check[0].password)
    if (check) {
      const paswordCorret = await bcrypt.compare(password, check[0].password)
      if (!paswordCorret){
        return res.status(401).json({ message: "Wrong  password" });
      }
      const token = jwt.sign({
        user: check.user_id
      },process.env.JWT_SECRET)
      res.cookie("token", token,{
        httpOnly: true
      }).status(200).json(check)
    } else {
      res.status(401).json({ message: "Wrong Email od password" });
    }
  } catch {
    res.status(400).json({ error: "Wrong" });
  }
};

const loggedIn = async ( req, res)=>{
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true)
  } catch (err) {
    console.log(err)
    res.json(false);
  }
}

const logout = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
}

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
              ["callendars.$[element].users." + role]: [
                user_id,
                check.lastname,
              ],
            },
          },
          { arrayFilters: [{ "element.cal_id": seUsersCal_id }] }
        );
      }

      const dayData = await User.aggregate([
        { $match: { user_id: seUser_id } },
        {
          $project: {
            _id: 0,
            cal: {
              $filter: {
                input: "$callendars",
                as: "cal",
                cond: { $eq: ["$$cal.cal_id", seUsersCal_id] },
              },
            },
          },
        },
      ]);
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
  );

  const dayData = await User.find(
    { user_id: user_id },
    { callendars: 1, _id: 0 }
  );
  res.status(200).json(dayData);
};

const editevent = async (req, res) => {
  const { user_id, cal_id, month_id, day_id, event_id } = req.params;
  const event = req.body;

  const cal = await User.updateMany(
    {},
    {
      $set: {
        ["callendars.$[element].cal." +
        month_id +
        "." +
        day_id +
        ".event." +
        event_id]: event,
      },
    },
    {
      arrayFilters: [
        { "element.cal_id": "29876962-9263-469e-8f4c-9dfc6625957f" },
      ],
    }
  );

  const dayData = await User.aggregate([
    { $match: { user_id: user_id } },
    {
      $project: {
        _id: 0,
        cal: {
          $filter: {
            input: "$callendars",
            as: "cal",
            cond: { $eq: ["$$cal.cal_id", cal_id] },
          },
        },
      },
    },
  ]);
  const allcall = await User.find(
    { user_id: user_id },
    { callendars: 1, _id: 0 }
  );
  res.status(200).json({ event: dayData[0].cal[0], allcal: allcall });
};

module.exports = {
  createUser,
  getCallendars,
  getSingleCallendar,
  deleteEvent,
  addEvent,
  login,
  addCal,
  deleteCal,
  editevent,
  logout,
  loggedIn,
};
