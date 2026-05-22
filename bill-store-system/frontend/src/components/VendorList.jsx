import "../styles/vendor.css"


function VendorList(props) {
  return (
    <div className="table-container">
      <h2>VENDORS</h2>

      {props.vendors.length === 0 ? (
        <li className="no-vendor" colSpan="4">No vendors available</li>
      ) : (
        <table className="bill-table">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Vendor ID</th>
              <th>Contact</th>
              <th>Vendor Info</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.vendors.map((vendor) => (
              <tr key={vendor.vendorId}>
                <td>{vendor.vendorName}</td>
                <td>{vendor.vendorId}</td>
                <td>{vendor.vendorContact}</td>
                <td>{vendor.vendorInfo}</td>
                <td>
                  <button
                  className="action-btn delete-btn"
                    onClick={() => {
                      const confrimdelete = window.confirm(
                        "Are you sure , you want to delete this vendor ?",
                      );
                      if (confrimdelete) {
                        props.deleteVendor(vendor.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button className="action-btn edit-btn" onClick={() => props.setEditVendor(vendor)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VendorList;
