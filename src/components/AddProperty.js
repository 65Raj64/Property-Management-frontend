// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import axios from "axios";

// const AddProperty = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     price: "",
//     description: "",
//     propertyType: "residential",
//     images: [],
//   });

//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const newImages = selectedFiles.map((file) => URL.createObjectURL(file));
//     setFormData({ ...formData, images: selectedFiles });
//     setUploadedImages((prevImages) => [...prevImages, ...newImages]);
//   };

//   const handleRemoveImage = (index) => {
//     const newUploadedImages = uploadedImages.filter((_, i) => i !== index);
//     const newImages = formData.images.filter((_, i) => i !== index);
//     setUploadedImages(newUploadedImages);
//     setFormData({ ...formData, images: newImages });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append("name", formData.name);
//     form.append("location", formData.location);
//     form.append("price", formData.price);
//     form.append("description", formData.description);
//     form.append("propertyType", formData.propertyType);
//     formData.images.forEach((image) => form.append("images", image));

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/properties",
//         form,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setUploadedImages(response.data.images);
//       setSuccessMessage("Property added successfully!");

//       setFormData({
//         name: "",
//         location: "",
//         price: "",
//         description: "",
//         propertyType: "residential",
//         images: [],
//       });
//       setUploadedImages([]);
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (error) {
//       setError("Error uploading property");
//       console.error("Error uploading property", error);
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group>
//         <Form.Label>Property Name</Form.Label>
//         <Form.Control
//           type="text"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           required
//           style={{ width: "600px" }}
//         />
//       </Form.Group>

//       <Form.Group>
//         <Form.Label>Location</Form.Label>
//         <Form.Control
//           type="text"
//           value={formData.location}
//           onChange={(e) =>
//             setFormData({ ...formData, location: e.target.value })
//           }
//           required
//           style={{ width: "600px" }}
//         />
//       </Form.Group>

//       <Form.Group>
//         <Form.Label>Price</Form.Label>
//         <Form.Control
//           type="number"
//           value={formData.price}
//           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//           required
//           style={{ width: "600px" }}
//         />
//       </Form.Group>

//       <Form.Group>
//         <Form.Label>Description</Form.Label>
//         <Form.Control
//           as="textarea"
//           value={formData.description}
//           onChange={(e) =>
//             setFormData({ ...formData, description: e.target.value })
//           }
//           style={{ width: "600px" }}
//         />
//       </Form.Group>

//       <Form.Group>
//         <Form.Label>Property Type</Form.Label>
//         <Form.Control
//           as="select"
//           placeholder="Select Type"
//           value={formData.propertyType}
//           onChange={(e) =>
//             setFormData({ ...formData, propertyType: e.target.value })
//           }
//           style={{ width: "600px" }}
//         >
//           <option value="residential">Residential</option>
//           <option value="commercial">Commercial</option>
//         </Form.Control>
//       </Form.Group>

//       <Form.Group>
//         <Form.Label>Images</Form.Label>
//         <Form.Control
//           type="file"
//           multiple
//           onChange={handleFileChange}
//           style={{ width: "600px" }}
//         />
//       </Form.Group>

//       <Button type="submit" style={{ marginTop: "20px" }}>
//         Add Property
//       </Button>

//       {error && <div className="alert alert-danger mt-3">{error}</div>}
//       {successMessage && (
//         <div className="alert alert-success mt-3">{successMessage}</div>
//       )}

//       {uploadedImages.length > 0 && (
//         <div className="mt-3">
//           <h4>Uploaded Images:</h4>
//           <div
//             className="image-preview"
//             style={{ display: "flex", flexWrap: "wrap" }}
//           >
//             {uploadedImages.map((imageUrl, index) => (
//               <div key={index} style={{ position: "relative", margin: "10px" }}>
//                 <img
//                   src={imageUrl}
//                   alt={`uploaded ${index}`}
//                   style={{
//                     width: "100px",
//                     height: "100px",
//                     objectFit: "cover",
//                     margin: "10px",
//                   }}
//                 />
//                 <button
//                   onClick={() => handleRemoveImage(index)}
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     background: "transparent",
//                     border: "none",
//                     cursor: "pointer",
//                     color: "red",
//                     fontSize: "16px",
//                   }}
//                 >
//                   &#10006;
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </Form>
//   );
// };

// export default AddProperty;
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    propertyType: "residential",
    images: [],
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newImages = selectedFiles.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: selectedFiles });
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const newUploadedImages = uploadedImages.filter((_, i) => i !== index);
    const newImages = formData.images.filter((_, i) => i !== index);
    setUploadedImages(newUploadedImages);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("location", formData.location);
    form.append("price", formData.price);
    form.append("description", formData.description);
    form.append("propertyType", formData.propertyType);
    formData.images.forEach((image) => form.append("images", image));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/properties",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadedImages(response.data.images);
      setSuccessMessage("Property added successfully!");

      setFormData({
        name: "",
        location: "",
        price: "",
        description: "",
        propertyType: "residential",
        images: [],
      });
      setUploadedImages([]);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Error uploading property");
      console.error("Error uploading property", error);
    }
  };

  return (
    <Row>
      <Col md={8}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Property Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              style={{ width: "600px" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              style={{ width: "600px" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
              style={{ width: "600px" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              style={{ width: "600px" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Property Type</Form.Label>
            <Form.Control
              as="select"
              placeholder="Select Type"
              value={formData.propertyType}
              onChange={(e) =>
                setFormData({ ...formData, propertyType: e.target.value })
              }
              style={{ width: "600px" }}
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ width: "600px" }}
            />
          </Form.Group>

          <Button type="submit" style={{ marginTop: "20px" }}>
            Add Property
          </Button>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}

          {uploadedImages.length > 0 && (
            <div className="mt-3">
              <h4>Uploaded Images:</h4>
              <div
                className="image-preview"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {uploadedImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    style={{ position: "relative", margin: "10px" }}
                  >
                    <img
                      src={imageUrl}
                      alt={`uploaded ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        margin: "10px",
                      }}
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "red",
                        fontSize: "16px",
                      }}
                    >
                      &#10006;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Form>
      </Col>

      {/* Column for the image */}
      <Col md={4}>
        <img
          src="http://localhost:5000/uploads/1729415795254-property4.jpeg" // Add the image URL here
          alt="Property Graphic"
          style={{ width: "100%", height: "auto" }}
        />
      </Col>
    </Row>
  );
};

export default AddProperty;
