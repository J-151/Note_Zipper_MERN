import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);

        const { data } = await axios.post(
          "/api/users",
          {
            email,
            name,
            password,
            pic,
          },
          config
        );

        setLoading(false);

        localStorage.setItem("userInfo", data);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <MainScreen title={"REGISTER"}>
      <div>
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={(e) => submitHandler(e)}>
            <FormGroup controlId="name">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="name"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId="formBasicEmail">
              <FormLabel>Email address</FormLabel>
              <FormControl
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId="formBasicPassword">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>

            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <FormGroup controlId="pic">
              <FormLabel>Profile Picture</FormLabel>
              <FormControl
                onChange={(e) => setPic(e.target.files[0])}
                id="custom-file"
                type="file"
                label="Upload Profile Picture"
                custom
              />
            </FormGroup>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Have an Account ? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </div>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
