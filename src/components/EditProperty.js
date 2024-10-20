import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    propertyType: "residential",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/properties/${id}`
        );
        setFormData({
          name: response.data.name,
          location: response.data.location,
          price: response.data.price,
          description: response.data.description,
          propertyType: response.data.propertyType,
        });
        setExistingImages(response.data.images);
      } catch (error) {
        console.error("Error fetching property details", error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const newImagesPreview = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setNewImages((prevImages) => [...prevImages, ...selectedFiles]);

    setExistingImages((prevImages) => [...prevImages, ...newImagesPreview]);
  };

  const handleRemoveNewImage = (e, index) => {
    e.stopPropagation();
    const updatedNewImages = newImages.filter((_, i) => i !== index);
    setNewImages(updatedNewImages);
  };

  const handleRemoveExistingImage = (index) => {
    const updatedExistingImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedExistingImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("location", formData.location);
    form.append("price", formData.price);
    form.append("description", formData.description);
    form.append("propertyType", formData.propertyType);

    newImages.forEach((image) => form.append("images", image));

    try {
      await axios.put(`http://localhost:5000/api/properties/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      setError("Error updating property");
      console.error("Error updating property", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Property Name</Form.Label>
        <Form.Control
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
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
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
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
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Property Type</Form.Label>
        <Form.Control
          as="select"
          value={formData.propertyType}
          onChange={(e) =>
            setFormData({ ...formData, propertyType: e.target.value })
          }
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Images</Form.Label>
        <Form.Control type="file" multiple onChange={handleFileChange} />
        <div className="mt-3">
          <h4>Existing Images:</h4>
          {existingImages.length > 0 &&
            existingImages.map((imageUrl, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  display: "inline-block",
                  margin: "10px",
                }}
              >
                <img
                  src={imageUrl}
                  alt={`existing ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(index)}
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
        <div className="mt-3">
          <h4>New Images:</h4>
          {newImages.length > 0 &&
            newImages.map((image, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  display: "inline-block",
                  margin: "10px",
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`new ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => handleRemoveNewImage(e, index)}
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
      </Form.Group>

      <Button type="submit">Update Property</Button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </Form>
  );
};

export default EditProperty;
