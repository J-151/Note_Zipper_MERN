import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: "0",
        display: "flex",
        justifyContent: "center",
      }}>
      <Container>
        <Col className="text-center py-3">Copyright &copy; Note Zipper</Col>
      </Container>
    </footer>
  );
};

export default Footer;
