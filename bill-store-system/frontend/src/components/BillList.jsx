import { useNavigate } from "react-router-dom";
import { useState } from "react";



function BillList(props) {
  const bills = props.bills;
  const navigate = useNavigate();
  const [selectImage, setSelectImage] = useState(null);

  return (
    <div className="table-container">
      <h1>Bill List</h1>
      <table className="bill-table">
        <thead>
          <tr>
            <th>Vendor ID</th>
            <th>Vendor Name</th>
            <th>Bill Amount</th>
            <th>Created At</th>
            <th>Description</th>
            <th>Bill Image</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.length === 0 ? (

    <tr>
      <td colSpan="7">
        No Bills Found
      </td>
    </tr>

  ) : ( bills.map((bill) =>  (
            <tr key={bill.id}>
              <td>{bill.vendorId}</td>
              <td>{bill.vendorName}</td>
              <td>₨ {Number(bill.billAmount|| 0).toFixed(2)}</td>
              <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
              <td>{bill.description}</td>
              <td>
                {bill.billImage && (
                  <img src={bill.billImage} alt="bill" className="bill-image" onClick={()=> setSelectImage(bill.billImage)} />
                )}
              </td>
              <td>
                <button className="action-btn delete-btn" onClick={() => {
                  const confrimDelete = window.confirm("Are you sure, you want to delete this bill ?");
                  if(confrimDelete){props.deleteBill(bill.id)}
                  }}>
                  delete
                </button>
              </td>
              <td>
                <button  className="action-btn edit-btn" onClick={() =>{props.setEditBill(bill); navigate("/")} }>Edit</button>
              </td>
            </tr>
          ))
          )}
        </tbody>
      </table>
      {selectImage &&
        
       ( <div
        className="modal"
        onClick={()=>setSelectImage(null)}
        >
          <button
          className="close-modal-btn"
          onClick={()=>setSelectImage(null)}
          >×
          </button>



            <div className="modal-content">

                <img
                  src={selectImage}
                  alt="preview"
                  className="modal-image"
                  onClick={(e) => e.stopPropagation()}
                />

                <a
                  href={selectImage}
                  download="bill-image"
                  className="download-btn"
                >
                  Download
                </a>

              </div>




        </div>)
      }
    </div>
  );
}

export default BillList;
