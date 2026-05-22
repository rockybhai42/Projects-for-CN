import BillForm from "../components/BillForm"

function AddBill (props){
    return ( 
        <div>
           

      <BillForm
        addBill={props.addBill}
        editBill={props.editBill}
        updateBill={props.updateBill}
        vendors = {props.vendors}
      />
        </div>
    )

}

export default AddBill;