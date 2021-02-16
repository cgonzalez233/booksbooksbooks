import React from "react";
import { Col, Row } from "../Grid";
import { List, ListItem } from "../List";
import SaveBtn from "../SaveBtn";

function BookList() {
  return (
    <Row>
      <Col size="md-12">
        {books.length ? (
          <List>
            {books.map((book) => (
              <ListItem key={book.id}>
                <p>
                  <b>{book.volumeInfo.title}</b>
                  {" by "}
                  {book.volumeInfo.authors[0]}
                  <SaveBtn />
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
  );
}

export default BookList;
