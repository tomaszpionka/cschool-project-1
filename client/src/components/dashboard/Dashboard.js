import React, { useEffect, useState, Fragment } from "react";
import Header from "../menu/Header";
import Footer from "../menu/Footer";

import { toast } from "react-toastify";
import { Button, Container, Image } from "semantic-ui-react";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.user_name);
      setId(parseData.user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      <Header />
      <Container>
        <Container text style={{ marginTop: "7em" }}>
          <Header as="h1">Semantic UI React Fixed Template</Header>
          <p>
            This is a basic fixed menu template using fixed size containers.
          </p>
          <p>
            A text container is used for the main container, which is useful for
            single column layouts.
          </p>
          <p>
            welcome user: {name} with id: {id}
          </p>
          <Button onClick={e => logout(e)}>logout</Button>
        </Container>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Dashboard;