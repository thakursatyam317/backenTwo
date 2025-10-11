import Order from "../models/order.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createOrder = async (req, res) => {
  try {
    const { price, orderName } = req.body;
    console.log("req.body", req.body);

    if (!price || !orderName) {
      throw new ApiError(400, "All fields are required");
    }

    //  Get user ID (from login token middleware or cookie)
    const userId = req.user?.id || req.user.user_id; //// from middleware
    // console.log("req.user?.id ",req.user?.id );
    // console.log("req.user.user_id", req.user.user_id); // unddefined

    console.log("useID :- ", userId);
    if (!userId) throw new ApiError(401, "User not authenticated");

    const order = await Order.create({
      userId, // link users _id here
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
          from: "users", // MongoDB collection name (must match your User model’s collection)
          localField: "userId", // Field in Order collection
          foreignField: "_id", // Field in User collection
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true, // keeps orders even if user deleted
        },
      },
      {
        $project: {
          _id: 1,
          orderName: 1,
          price: 1,
          createdAt: 1,
          updatedAt: 1,
          "userDetails._id": 1,
          "userDetails.userName": 1,
          "userDetails.email": 1,
        },
      },
    ]);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Orders with user details fetched successfully",
          orders
        )
      );
  } catch (error) {
    throw new ApiError(500, "Failed to fetch orders with user details", error);
  }
};
