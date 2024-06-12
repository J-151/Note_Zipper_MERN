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
import { Link } from "react-router-dom";
import notes from "../../data/notes";
import axios from "axios";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notes");
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?6")) {
    }
  };

  return (
    <MainScreen title={"Welcome Back Jagruti"}>
      <Link to="/createnote">
        <Button style={{ marginBottom: 6, marginLeft: 10 }} size="lg">
          Create New Note
        </Button>
      </Link>

      {notes?.map((note) => {
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
                      Created On-Date
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
