const User = require("../models/user");


const multer = require("multer");

const storagee = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "./files");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storagee });

const file = async (req, res) => {
  res.send(req.file.filename);
};

const getCallendars = async (req, res) => {
  const { user_id } = req.params;
  const cals = await User.find({ user_id: user_id }, { callendars: 1, _id: 0 });

  res.status(200).json(cals);
};

// const getAllEvents = async (req, res) => {
//   const { user_id, cal_id } = req.params;
//   const cal = await User.find(
//     { user_id: user_id },
//     { _id: 0, callendars: { $elemMatch: { cal_id: cal_id } } }
//   );

//   res.status(200).json(cal);
// };

const getAllEvents = async (req, res) => {
  const { user_id, cal_id } = req.params;
  const cal = await User.aggregate([
    {
      $match: {
        user_id: user_id,
        "callendars.cal_id": cal_id,
      },
    },
    {
      $project: {
        callendars: {
          $filter: {
            input: "$callendars",
            as: "calendar",
            cond: {
              $eq: ["$$calendar.cal_id", cal_id],
            },
          },
        },
      },
    },
    {
      $project: {
        events: {
          $map: { input: "$callendars.cal", as: "event", in: "$$event" },
        },
      },
    },
  ]);
  res.status(200).json(cal);
};



const deleteEvent = async (req, res) => {
  const { user_id, cal_id, month_id, day_id, event_id } = req.params;
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
  res.status(200).json({ event: dayData[0].cal[0], allcal: allcall });
};

const addEvent = async (req, res) => {
  const { user_id, cal_id, month_id, day_id, event_id } = req.params;
  const event = req.body;
  console.log(event);
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
  console.log(allcall);
  res.status(200).json({ event: dayData[0].cal[0], allcal: allcall });
};


const addCal = async (req, res) => {
  const { user_id } = req.params;
  const { data, seUser_id, seUsersCal_id, role } = req.body;
  const check = await User.findOne({ user_id: user_id }, { lastname: 1 });
  if (check != null) {
    try {
      const user = await User.updateOne(
        { user_id: user_id },
        { $push: { callendars: data } }
      );
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
  console.log(event);
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
      arrayFilters: [{ "element.cal_id": cal_id }],
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

const deluser = async (req, res) => {
  const { user_id, cal_id, role, index } = req.params;

  const deletcal = await User.updateOne(
    { user_id: user_id },
    { $pull: { callendars: { cal_id: cal_id } } }
  );

  const cal = await User.updateMany(
    {},
    {
      $unset: {
        ["callendars.$[element].users." + role + "." + index]: "",
      },
    },
    { arrayFilters: [{ "element.cal_id": cal_id }] }
  );

  const allcall = await User.findOne({ "callendars.cal_id": cal_id });
  res.status(200).json(allcall.callendars.filter((a) => a.cal_id == cal_id));
};

const changerole = async (req, res) => {
  const { user_id, cal_id, role, index } = req.params;
  const newRole = req.body.role;
  const user = req.body.user;
  try {
    const cal = await User.updateMany(
      {},
      {
        $pull: {
          ["callendars.$[element].users." + role]: user,
        },
        $push: { ["callendars.$[element].users." + newRole]: user },
      },
      { arrayFilters: [{ "element.cal_id": cal_id }] }
    );

    const allcall = await User.findOne({ "callendars.cal_id": cal_id });

    res.status(200).json(allcall.callendars.filter((a) => a.cal_id == cal_id));
  } catch (error) {
    res.status(400).json(error);
  }
};




module.exports = {
  getCallendars,
  getAllEvents,
  deleteEvent,
  addEvent,
  addCal,
  deleteCal,
  editevent,
  deluser,
  changerole,
  file,
  upload
};
