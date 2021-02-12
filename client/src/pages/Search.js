import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";

function Detail(props) {
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title) {
      API.googleSearch(formObject.title)
        .then((res) => setBooks(res.data.items))
        .catch((err) => console.log(err));
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn disabled={!formObject.title} onClick={handleFormSubmit}>
                Submit Book
              </FormBtn>
            </form>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          {books.length ? (
            <List>
              {books.map((book) => (
                <ListItem key={book.id}>
                  {book.volumeInfo.title}
                  <DeleteBtn />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link to="/books/saved">← Back to Authors</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;
