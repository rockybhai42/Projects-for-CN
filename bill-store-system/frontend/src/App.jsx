import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import BillForm from './components/BillForm'
// import BillList from './components/BillList'
import AddBill from "./pages/AddBill";
import ViewBill from "./pages/ViewBill";
import Navbar from "./components/Navbar";
import Vendors  from "./pages/Vendors";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

function App() {
  const [bills, setBills] = useState([]);
  const [editBill, setEditBill] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [vendorIdFilter, setVendorIdFilter] = useState("");
  const [vendors, setVendors] = useState([]);
  const [editVendor, setEditVendor] = useState(null);


  useEffect(() => {
    async function fetchBills() {
      try {
        const response = await fetch("http://localhost:5000/bills");
        const data = await response.json();
        setBills(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBills();
  },[]);

  useEffect(() =>{
    async function fetchVendors(){
      try {
        const response = await fetch("http://localhost:5000/vendors");
        const data = await response.json();
        setVendors(data);

      
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchVendors();

  },[]);

// funstion to add vendors to the list
async function addVendor(vendor){
try {
  const response = await fetch(`http://localhost:5000/vendors`,
    {method:"POST",
      headers :{"Content-Type":"application/json"},
      body : JSON.stringify(vendor)
     }
  );

  const newVendor = await response.json();
  setVendors((prev)=>[...prev, newVendor]);
  toast.success(" Vendor added successfully");

  
} catch (error) {
  toast.error("Error adding vendor");
  console.log(error);
}
}

// function to delete vendor from the list
async function deleteVendor(Id){
  try {
    await fetch(`http://localhost:5000/vendors/${Id}`,
      {method: "DELETE" }
    );
    setVendors((prev)=> prev.filter((vendor)=> vendor.id !== Id));
    toast.error("Vendor deleted");
  }catch(error){
    console.log(error);
  }
}



//function to update vendor details 

async function updateVendor(updatedVendor){
  try {
    const response = await fetch(`http://localhost:5000/vendors/${updatedVendor.id}`,
      {method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(updatedVendor)
      }
    );
    const updatedVendors = vendors.map((vendor)=> {
      if(vendor.id === updatedVendor.id){
        return updatedVendor;
      }
      return vendor;

    })

    setVendors(updatedVendors);
    setEditVendor(null);
    toast.info("vendor updated successfully ");
  } catch (error) {
    console.log(error);
  }
}

  // Function to add a new bill to the list
  async function addBill(bill) {
    try{
        const response = await fetch("http://localhost:5000/bills",
        {method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(bill)
        });
      
       const newBill = await response.json(); 
      setBills((prevBills) => [...prevBills, newBill]);
      toast.success("Bill saved successfully");
    }catch(error){
      console.log(error);

    }

  }

  // Function to delete a bill from the list
  async function deleteBill(Id) {
    try{
      await fetch(`http://localhost:5000/bills/${Id}`,
        {method:"DELETE"}
      );
      setBills((prevBills) => prevBills.filter((bill) => bill.id !== Id));
      toast.error("Bill deleted ");

    }catch(error){
      console.log(error);

    }
  }

  // function for edit bill
  async function updateBill(updatedBill) {
    try {
      await fetch(`http://localhost:5000/bills/${updatedBill.id}`,
        {method:"PUT",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(updatedBill)

        }
      );



      const updatedBills = bills.map((bill) => {
      if (bill.id === updatedBill.id) {
        return updatedBill;
      }
      return bill;
      });
      setBills(updatedBills);
      setEditBill(null);
      toast.info("Bill updated successfully");
      
    } catch (error) {
      console.log(error);
    }
  }

  //search filter for vendor name

  const filteredBills = bills.filter((bill) => {
    const matchesVendor = bill.vendorName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate =
      dateFilter === "" || bill.createdAt.includes(dateFilter);
    const matchesVendorId =
      vendorIdFilter === "" || bill.vendorId === vendorIdFilter;

    return matchesVendor && matchesDate && matchesVendorId;
  });

  return (
    <div>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <Routes>
        <Route
          path="/"
          element={
            <AddBill
              addBill={addBill}
              editBill={editBill}
              updateBill={updateBill}
              vendors = {vendors}
            />
          }
        />
        <Route
          path="/bills"
          element={
            <ViewBill
              bills={filteredBills}
              deleteBill={deleteBill}
              setEditBill={setEditBill}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              vendorIdFilter={vendorIdFilter}
              setVendorIdFilter={setVendorIdFilter}
            />
          }
        />
        <Route
          path="/vendors"
          element ={<Vendors
            vendors ={vendors}
            addVendor = {addVendor}
            deleteVendor = {deleteVendor}
            editVendor={editVendor}
            setEditVendor={setEditVendor}
            updateVendor={updateVendor}
            />
          }
          />
          
      </Routes>
      
    </div>
  );
}

export default App;
