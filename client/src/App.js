import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
  const [fullName, setFullName] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [needsRide, setNeedsRide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const submitRSVP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowThanks(false);

    const payload = { fullName, numberOfPeople, needsRide };

    const res = await axios.post("http://localhost:4000/rsvp", payload);

    if (res.status === 200) {
      setShowThanks(true);
    }

    setLoading(false);
  };

  return (
    <Container style={{ marginTop: "50px", maxWidth: "500px" }}>
      <Card>
        <Card.Title
          style={{
            textAlign: "center",
            fontFamily: "Alef",
            marginBottom: "50px",
          }}
        >
          <h1>החתונה של שחף ועמית</h1>
        </Card.Title>
        <Card.Body>
          {showThanks ? (
            <Alert
              variant="success"
              style={{
                fontFamily: "Alef",
                direction: "rtl",
                textAlign: "center",
              }}
            >
              איזה כיף! מחכים לחגוג איתכם :)
            </Alert>
          ) : (
            <Form onSubmit={submitRSVP}>
              <Form.Group>
                <Form.Control
                  className="mb-3"
                  style={{
                    textAlign: "right",
                    direction: "rtl",
                    fontFamily: "Alef",
                  }}
                  type="text"
                  placeholder="שם מלא"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  className="mb-3"
                  style={{
                    textAlign: "right",
                    direction: "rtl",
                    fontFamily: "Alef",
                  }}
                  type="number"
                  placeholder="מספר אורחים"
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicCheckbox"
                className="mb-3 d-flex justify-content-center"
              >
                <Form.Check
                  style={{ direction: "rtl", fontFamily: "Alef" }}
                  type="checkbox"
                  label="צריך/ה הסעה?"
                  onChange={(e) => setNeedsRide(e.target.checked)}
                />
              </Form.Group>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "60px",
                }}
              >
                {loading ? (
                  <BounceLoader
                    color="#123abc"
                    loading={loading}
                    css={override}
                    size={60}
                  />
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    style={{ fontFamily: "Alef" }}
                  >
                    אשר/י הגעה
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
