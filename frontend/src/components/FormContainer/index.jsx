import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          xs={12}
          md={6}
          style={{
            // backgroundColor: "#EBF7EA",
            backgroundColor: "#000",
            borderRadius: "1.5%",
            color: "#fff",
            marginTop: "10%",
            padding: "15px 40px 15px 40px",
          }}
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
