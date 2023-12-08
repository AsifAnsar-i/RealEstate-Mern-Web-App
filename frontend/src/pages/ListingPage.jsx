import React from "react";
import {reset} from "../features/listing/listingSlice"
import { useSelector,useDispatch } from "react-redux";
const ListingPage = () => {
    const dispatch = useDispatch()
    const {listing} =useSelector((state)=>state.create)
  return (
    <div>
      <h1>ListingPage</h1>
      <h1>{listing.address}</h1>
      <h1>{listing.listId}</h1>
      <h1>{listing.name}</h1>
    </div>
  );
};

export default ListingPage;
