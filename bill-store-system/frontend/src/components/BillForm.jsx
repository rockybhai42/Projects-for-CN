import { useRef, useState, useEffect } from "react";
import "../styles/form.css";

function BillForm(props) {
  const fileInputref = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraON, setCameraOn] = useState(false);

  const updateBill = props.updateBill;
  const vendors = props.vendors;
  const [formData, setFormData] = useState({
    vendorId: "",
    vendorName: "",
    billAmount: "",
    billImage: "",
    description: "",
    createdAt: "",
  });

  useEffect(() => {
    if (props.editBill) {
      setFormData(props.editBill);
    }
  }, [props.editBill]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5000000) {
      alert("Image too large");

      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const context = canvas.getContext("2d");

        const MAX_WIDTH = 800;

        const scaleSize = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;

        canvas.height = img.height * scaleSize;

        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedImage = canvas.toDataURL("image/jpeg", 0.6);

        setFormData((prevData) => ({
          ...prevData,
          billImage: compressedImage,
        }));
      };
    };

    reader.readAsDataURL(file);
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        await videoRef.current.play();
      }

      setCameraOn(true);
    } catch (error) {
      console.log("camera access denied ", error);
    }
  }
  function capturePhoto() {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg", 0.6);

    setFormData((prevData) => ({
      ...prevData,
      billImage: imageData,
    }));
    stopCamera();
  }

  function stopCamera() {
    const stream = videoRef.current?.srcObject;

    if (!stream) return;

    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setCameraOn(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newBill = {
      ...formData,

      ...(props.editBill && {
        id: props.editBill.id,
      }),

      createdAt: props.editBill
        ? props.editBill.createdAt
        : new Date().toISOString(),
    };
    if (props.editBill) {
      updateBill(newBill);
    } else {
      props.addBill(newBill);
    }
    stopCamera();

    setFormData({
      vendorId: "",
      vendorName: "",
      billAmount: "",
      billImage: "",
      createdAt: "",
      description: "",
    });

    fileInputref.current.value = "";
  }

  return (
    <div className="form-container">
      <h1>{props.editBill ? "Update Bill" : "Add bill"}</h1>
      <form onSubmit={handleSubmit}>
     <select
  name="vendorId"
  value={formData.vendorId}
  onChange={(e) => {

    const selectedVendorId =
      e.target.value;

  const selectedVendor =
  vendors.find(
    (vendor) =>
      vendor.vendorId === selectedVendorId
  );

    setFormData((prevData) => ({
      ...prevData,

      vendorId: selectedVendorId,

      vendorName:
        selectedVendor?.vendorName || ""
    }));
  }}
  required
>
  <option value="">
    Select Vendor
  </option>

  {vendors.map((vendor) => (

    <option
      key={vendor.id}
      value={vendor.vendorId}
    >
      {vendor.vendorName}
    </option>

  ))}
</select>
        <br />
        
        <br />
        <input
          type="number"
          required
          min="1"
          placeholder="Bill Amount"
          value={formData.billAmount}
          onChange={handleInputChange}
          name="billAmount"
        />
        <br />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          name="description"
        />
        <br />

        <div className="image-input-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            ref={fileInputref}
          />
          <span className="text-or">OR</span>

          <button type="button" onClick={startCamera}>
            Open Camera
          </button>
        </div>

        {formData.billImage && (
          <img
            src={formData.billImage}
            alt="preview image"
            style={{
              border: "1px solid gray",
              padding: "5px",
              borderRadius: "10px",
              width: "300px",
            }}
          />
        )}

        <div style={{ display: cameraON ? "block" : "none" }}>
          <video ref={videoRef} autoPlay playsInline width="300"></video>

          <button type="button" onClick={capturePhoto}>
            Capture photo
          </button>

          <button type="button" onClick={stopCamera}>
            stop camera
          </button>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

        <button type="submit">
          {props.editBill ? "update Bill" : "Save Bill "}
        </button>
      </form>
    </div>
  );
}

export default BillForm;
