const User = require("../models/user");




const raport = async (req, res) => {
    const { user_id } = req.params;
  
    const merge = (a, b) => {
      const mergedArray = [];
  
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
          if (a[i].cal_id === b[j]._id) {
            mergedArray.push({ ...a[i], ...b[j] });
          }
        }
      }
      return mergedArray;
    };
    try {
      const users = await User.aggregate([
        { $match: { user_id: user_id } },
        { $unwind: "$callendars" },
        {
          $group: {
            _id: "$callendars.cal_id",
            count_admin: {
              $sum: {
                $size: {
                  $filter: {
                    input: "$callendars.users.admin",
                    as: "user",
                    cond: { $ne: ["$$user", null] },
                  },
                },
              },
            },
            count_reader: {
              $sum: {
                $size: {
                  $filter: {
                    input: "$callendars.users.reader",
                    as: "user",
                    cond: { $ne: ["$$user", null] },
                  },
                },
              },
            },
            count_spec: {
              $sum: {
                $size: {
                  $filter: {
                    input: "$callendars.users.spec",
                    as: "user",
                    cond: { $ne: ["$$user", null] },
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            cal_id: "$_id",
            count_admin: 1,
            count_reader: 1,
            count_spec: 1,
          },
        },
      ]);
      const event = await User.aggregate([
        { $match: { user_id: user_id } },
        { $unwind: "$callendars" },
        { $unwind: "$callendars.cal" },
        {
          $group: {
            _id: "$callendars.cal_id",
            eventCount: {
              $sum: {
                $reduce: {
                  input: {
                    $filter: {
                      input: "$callendars.cal.event",
                      cond: { $ne: ["$$this", null] },
                    },
                  },
                  initialValue: 0,
                  in: { $add: ["$$value", { $size: "$$this" }] },
                },
              },
            },
          },
        },
      ]);
      //
  
      res.status(200).json(merge(users, event));
    } catch {
      res.status(400);
    }
  };





  const search = async (req, res) => {
    const { cal_id, user_id } = req.params;
    const check = await User.find({user_id:user_id})
    console.log(check.callendars)
    const regex = req.body.letter;
    console.log(regex)
  
    try{
    const result = await User.aggregate([
      { $match: { user_id: user_id } },
      { $unwind: "$callendars" },
      { $unwind: "$callendars.cal" },
      { $unwind: "$callendars.cal" },
      { $match: { "callendars.cal_id": cal_id } },
      { $unwind: "$callendars.cal.event" },
      {
        $match: {
          "callendars.cal.event.name": { $regex: new RegExp(regex, "i") },
        },
      },
      { $project: { event: "$callendars.cal.event" } },
    ]);
    res.send(result);
  
  }catch{
    res.send("error")
  }
  };

  module.exports={
    raport,
    search,
  }