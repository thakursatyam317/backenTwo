import Order from "../models/order.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createOrder = async (req, res) => {
  try {
    const { price, orderName } = req.body;
    console.log(req.body);

    if (!price || !orderName) {
      throw new ApiError(400, "All fields are required");
    }


    // 👇 Get user ID (from login token middleware or cookie)
    const userId = req.user?.id || req.user.user_id;//// from middleware

    console.log(userId);
    if (!userId) throw new ApiError(401, "User not authenticated");

    const order = await Order.create({
      userId,   // 🔗 link user _id here
      price,
      orderName,
    });

    res
      .status(201)
      .json(new ApiResponse(201, "Order created successfully", order));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Server could not create the order", error);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",          // 👈 Collection name (lowercase plural)
          localField: "userId",   // Field in Order
          foreignField: "_id",    // Field in User
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          orderName: 1,
          price: 1,
          "userDetails.name": 1,
          "userDetails.email": 1,
        },
      },
    ]);

    res.status(200).json(new ApiResponse(200, "Orders with user details fetched", orders));
  } catch (error) {
    throw new ApiError(500, "Failed to fetch orders using aggregation", error);
  }
};
