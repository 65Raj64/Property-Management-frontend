// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import PropertyFilter from "./components/PropertyFilter";
// import PropertyList from "./components/PropertyList";
// import AddProperty from "./components/AddProperty";
// import EditProperty from "./components/EditProperty";

// const App = () => {
//   return (
//     <Router>
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Container>
//           <Navbar.Brand href="/">Property Management</Navbar.Brand>
//           <Nav className="ml-auto">
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href="/add">Add Property</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>

//       <Container className="mt-4">
//         <div style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <>
//                   <PropertyFilter /> <PropertyList />
//                 </>
//               }
//             />

//             <Route path="/add" element={<AddProperty />} />

//             <Route path="/edit/:id" element={<EditProperty />} />
//           </Routes>
//         </div>
//       </Container>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import PropertyFilter from "./components/PropertyFilter";
import PropertyList from "./components/PropertyList";
import AddProperty from "./components/AddProperty";
import EditProperty from "./components/EditProperty";

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Property Management</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add">Add Property</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Apply background color here */}
      <div
        style={{
          backgroundColor: "#808080",
          minHeight: "100vh",
          paddingTop: "20px",
          color: "#ffffff",
        }}
      >
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <PropertyFilter />
                  <PropertyList />
                </>
              }
            />
            <Route path="/add" element={<AddProperty />} />
            <Route path="/edit/:id" element={<EditProperty />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
