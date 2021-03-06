import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      {console.log()}
      <Row>
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>Books On My List</h1>
          </Jumbotron>
          <List>
            {books.map((book) => (
              <ListItem key={book.id}>
                <p>
                  <b>{book.title}</b>
                  {" by "}
                  {book.authors ? book.authors.join(", ") : ""}
                  <DeleteBtn onClick={() => deleteBook(book._id)} />
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
                    <img src={`${book.image}`} className="bookImage"></img>
                    <br></br>
                    {book.description}
                    <a href={`${book.link}`}>Check out the book!</a>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
          <Link to="/search">← Back to Search</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Books;
