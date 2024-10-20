import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties, deleteProperty } from "../redux/propertySlice"; // Import deleteProperty action
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PropertyList = () => {
  const dispatch = useDispatch();
  const { list: properties, status } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      dispatch(deleteProperty(id));
    }
  };

  return (
    <div>
      <Row>
        {status === "loading" && <p>Loading...</p>}
        {status === "success" &&
          properties.map((property) => (
            <Col key={property._id} xs={12} sm={6} md={4}>
              <Card
                style={{
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    overflowX: "auto",
                    padding: "10px",
                  }}
                >
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.name} image ${index + 1}`}
                      style={{
                        objectFit: "cover",
                        height: "200px",
                        width: "200px",
                        marginRight: "10px",
                      }}
                    />
                  ))}
                </div>
                <Card.Body>
                  <Card.Title>{property.name}</Card.Title>
                  <Card.Text>{property.location}</Card.Text>
                  <Card.Text>${property.price}</Card.Text>

                  <Link to={`/edit/${property._id}`}>
                    <Button variant="primary">Edit Property</Button>
                  </Link>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(property._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete Property
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default PropertyList;
