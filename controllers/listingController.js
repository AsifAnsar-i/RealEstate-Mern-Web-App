import listingModel from "../models/listingModel.js";

export const listingController = async (req, res) => {
  try {
    const listing = await listingModel.create(req.body);
    return res.status(201).send({
      success:true,
      message:"Listing created successfully",
      listing
    });
  } catch (error) {
    console.warn(error);
    return res.status(500).send({
      success: false,
      message: "Error in listing API",
      error,
    });
  }
};
