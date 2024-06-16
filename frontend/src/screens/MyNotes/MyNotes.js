import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import {
  Accordion,
  AccordionBody,
  AccordionCollapse,
  AccordionHeader,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/noteActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = ({ search }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createNote = useSelector((state) => state.createNote);
  const { success: successCreate } = createNote;

  const updateNote = useSelector((state) => state.updateNote);
  const { success: successUpdate } = updateNote;

  const deleteNote = useSelector((state) => state.deleteNote);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteNote;

  useEffect(() => {
    dispatch(listNotes());

    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    successCreate,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginBottom: 6, marginLeft: 10 }} size="lg">
          Create New Note
        </Button>
      </Link>

      {(loading || loadingDelete) && <Loading />}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {notes
        ?.reverse()
        ?.filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        ?.map((note) => {
          return (
            <Accordion key={note?._id}>
              <Card>
                <CardHeader
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>
                    <AccordionHeader as={CardText} variant="link" eventKey="0">
                      {note?.title}
                    </AccordionHeader>
                  </span>

                  <span>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(note?._id)}>
                      Delete
                    </Button>
                  </span>
                </CardHeader>
                <AccordionBody eventKey="0">
                  <CardBody>
                    <h4>
                      <Badge variant="info">Category - {note?.category}</Badge>{" "}
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created On -
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </CardBody>
                </AccordionBody>
              </Card>
            </Accordion>
          );
        })}
    </MainScreen>
  );
};

export default MyNotes;
