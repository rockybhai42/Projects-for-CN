import { useState, useEffect } from "react";
import "../styles/vendor.css";

function VendorForm(props) {
  const [vendorName, setVendorName] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [vendorInfo, setVendorInfo] = useState("");
  const [vendorContact, setVendorContact] = useState("");

  useEffect(() => {
    if (props.editVendor) {
      setVendorName(props.editVendor.vendorName);
      setVendorId(props.editVendor.vendorId);
      setVendorContact(props.editVendor.vendorContact || "");
      setVendorInfo(props.editVendor.vendorInfo || "");
    }
  }, [props.editVendor]);

  function handleSubmit(e) {
    e.preventDefault();

    const cleanVendorName = vendorName.toLowerCase().trim();

    const cleanVendorId = vendorId.toLowerCase().trim();
    const alreadyExist = props.vendors.some(
      (vendor) =>
        vendor.vendorName?.toLowerCase().trim() === cleanVendorName &&
        vendor.id !== props.editVendor?.id,
    );

    if (alreadyExist) {
      alert("Vendor Name already exists");

      return;
    }

   const idExists = props.vendors.some(
  (vendor) =>
    vendor.vendorId?.toLowerCase().trim() === cleanVendorId &&
    vendor.id !== props.editVendor?.id
);

    if (idExists) {
      alert("Vendor ID already exists");

      return;
    }

    const newVendor = {
      

      vendorId: cleanVendorId,
      vendorName: cleanVendorName,
      vendorContact: vendorContact,
      vendorInfo: vendorInfo
    };

    if (props.editVendor) {
      props.updateVendor({
        ...newVendor,
        id: props.editVendor.id,
      });
    } else {
      props.addVendor(newVendor);
    }

    setVendorName("");

    setVendorId("");
    setVendorInfo("");
    setVendorContact("");
  }

  return (
   <div className="form-container vendor-form-container">
  <h1 className="vendor-form-title">
    {props.editVendor ? "Update Vendor" : "Add Vendor"}
  </h1>

  <form
    className="vendor-form"
    onSubmit={handleSubmit}
  >
    <input
      className="vendor-input"
      type="text"
      placeholder="vendor Id"
      required
      value={vendorId}
      onChange={(e) => setVendorId(e.target.value)}
    />

    <input
      className="vendor-input"
      type="text"
      placeholder="vendor name"
      required
      value={vendorName}
      onChange={(e) => setVendorName(e.target.value)}
    />

    <input
  className="vendor-input"
  type="text"
  placeholder="Vendor Contact"
  required
  value={vendorContact}
  onChange={(e) => setVendorContact(e.target.value)}
/>

    <textarea
  className="vendor-input"
  placeholder="Vendor Information"
  required
  value={vendorInfo}
  onChange={(e) => setVendorInfo(e.target.value)}
></textarea>

    <button
      className="vendor-submit-btn"
      type="submit"
    >
      {props.editVendor ? "update vendor" : "add vendor"}
    </button>
  </form>
</div>
  );
}

export default VendorForm;
