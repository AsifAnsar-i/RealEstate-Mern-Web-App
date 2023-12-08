import listingModel from "../models/listingModel.js";

export const listingController = async (req, res) => {
  try {
    const listing = await listingModel.create(req.body);

    return res.status(201).send({
      success: true,
      message: "Listing created successfuuly",
      address: listing.address,
      bedrooms: listing.bedrooms,
      discountPrice: listing.discountPrice,
      description: listing.description,
      furnished: listing.furnished,
      imageUrls: listing.imageUrls,
      name: listing.name,
      offer: listing.offer,
      parking: listing.parking,
      regularPrice: listing.regularPrice,
      type: listing.type,
      userRef: listing.userRef,
      listId: listing._id,
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

