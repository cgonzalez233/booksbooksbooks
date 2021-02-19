import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";

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
    getBooks();
  }

  function getBooks() {
    if (formObject.title) {
      API.googleSearch(formObject.title)
        .then((res) =>
          setBooks(res.data.items.filter((book) => book.volumeInfo.authors))
        )
        .catch((err) => console.log(err));
    }
  }

  function handleBookSave(id) {
    const book = books.find((book) => book.id === id);
    API.saveBook({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      date: book.volumeInfo.publishedDate,
      image: book.volumeInfo.imageLinks.thumbnail,
      link: book.volumeInfo.infoLink,
    }).then(() => getBooks());
  }

  return (
    <Container fluid>
      {console.log(books)}
      <Row>
        <Col size="md-3">
          <Link to="/books/saved">← Back to Favorites</Link>
        </Col>
      </Row>
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
                  <p>
                    <b>{book.volumeInfo.title}</b>
                    {" by "}
                    {book.volumeInfo.authors
                      ? book.volumeInfo.authors.join(", ")
                      : ""}
                    <SaveBtn onClick={() => handleBookSave(book.id)} />
                    <br></br>
                    <a
                      className="btn btn-primary text-light"
                      type="button"
                      data-toggle="collapse"
                      href={`#${book.id}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      See More
                    </a>
                  </p>
                  <div className="collapse" id={`${book.id}`}>
                    <div className="card card-body">
                      <img
                        src={`${book.volumeInfo.imageLinks.thumbnail}`}
                        className="bookImage"
                      ></img>
                      <br></br>
                      {book.volumeInfo.description}
                      <a href={`${book.volumeInfo.infoLink}`}>
                        Check out the book!
                      </a>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;
