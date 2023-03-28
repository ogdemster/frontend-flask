import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import {
  BsFillEmojiHeartEyesFill,
  BsFillEmojiLaughingFill,
  BsFillEmojiSmileFill,
  BsFillEmojiExpressionlessFill,
  BsFillEmojiAngryFill,
} from "react-icons/bs";

function App() {
  const [text, setText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleCange = (event) => {
    const { value } = event.target;
    setText(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        "http://127.0.0.1:5000/api/v1/data",
        {
          data: {
            text: text,
          },
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (result) {
        const { label } = result.data.received_data[0];
        setSelectedEmoji(label[0]);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Your text"
                className="mb-3"
                name="text"
                value={text}
                onChange={handleCange}
                type="text"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
              <Form.Text className="text-muted">
                Type or copy some text and click button for the mood.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-5">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{ height: "20vh" }}
      >
        <Col
          xs={6}
          className="text-center"
          style={{ fontSize: "100px", color: "red" }}
        >
          {selectedEmoji && parseInt(selectedEmoji) === 1 ? (
            <BsFillEmojiAngryFill />
          ) : parseInt(selectedEmoji) === 2 ? (
            <BsFillEmojiExpressionlessFill />
          ) : parseInt(selectedEmoji) === 3 ? (
            <BsFillEmojiSmileFill />
          ) : parseInt(selectedEmoji) === 4 ? (
            <BsFillEmojiLaughingFill />
          ) : parseInt(selectedEmoji) === 5 ? (
            <BsFillEmojiHeartEyesFill />
          ) : (
            "Nothing to show"
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
