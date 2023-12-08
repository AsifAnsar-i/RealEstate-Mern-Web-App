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
// Import your listingModel at the top of your file if it's not already imported
// // const listingModel = require('./path-to-listing-model');

// export const getListingController = async (req, res) => {
//   try {
//     // Assuming your listingModel has a method like `find` to retrieve all listings
//     const listings = await listingModel.find();
//     return res.status(200).json(listings);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in fetching listings",
//       error,
//     });
//   }
// };
// // Import your listingModel at the top of your file if it's not already imported
// // const listingModel = require('./path-to-listing-model');

// export const getListingByIdController = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Assuming your listingModel has a method like `findById` to retrieve a listing by ID
//     const listing = await listingModel.findById(id);

//     if (!listing) {
//       return res.status(404).json({
//         success: false,
//         message: "Listing not found",
//       });
//     }

//     return res.status(200).json(listing);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in fetching listing by ID",
//       error,
//     });
//   }
// };
