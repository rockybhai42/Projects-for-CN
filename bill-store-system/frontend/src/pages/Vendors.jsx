import VendorForm from "../components/VendorForm";
import VendorList from "../components/VendorList";
import { useState, useEffect } from "react";

function Vendors(props){

    return(
        <div>

        <VendorForm 
         addVendor={props.addVendor}
         vendors={props.vendors}
         editVendor={props.editVendor}
         updateVendor={props.updateVendor} 
        />
        <VendorList deleteVendor={props.deleteVendor} vendors={props.vendors} setEditVendor={props.setEditVendor}/>
        </div>
    )
}

export default Vendors;