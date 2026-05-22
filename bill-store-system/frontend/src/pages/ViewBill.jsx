import BillList from "../components/BillList"
import '../styles/table.css'

function ViewBill (props){
    return (
        <div>
            <h1>View Bill</h1>

        <input type="text"
        className="filter-input"
        value={props.vendorIdFilter}
        onChange={(e) =>
          props.setVendorIdFilter(e.target.value)
        }
        placeholder="Search Vendor ID"
        
        />

        <span>  </span>


       <input
        className="filter-input"
        type="text"
        placeholder="Search Vendor"
        value={props.searchTerm}
        onChange={(e) =>
          props.setSearchTerm(e.target.value)
        }
      />

     <span>  </span>

      <input
      className="filter-input"
        type="date"
        value={props.dateFilter}
        onChange={(e) =>
          props.setDateFilter(e.target.value)
        }
      />


      <br /><br />

      <BillList
        bills={props.bills}
        deleteBill={props.deleteBill}
        setEditBill={props.setEditBill}
      />

        </div>
    )
}

export default ViewBill;