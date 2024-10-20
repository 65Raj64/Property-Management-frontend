import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProperties } from "../redux/propertySlice";
import { Form, Row, Col, Button } from "react-bootstrap";

const PropertyFilter = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
  });

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProperties(filters));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              placeholder="Enter location"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Min Price</Form.Label>
            <Form.Control
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="Min price"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Max Price</Form.Label>
            <Form.Control
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder="Max price"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Property Type</Form.Label>
            <Form.Control
              as="select"
              name="propertyType"
              value={filters.propertyType}
              onChange={handleInputChange}
            >
              <option value="">All Types</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Apply Filters
      </Button>
    </Form>
  );
};

export default PropertyFilter;
