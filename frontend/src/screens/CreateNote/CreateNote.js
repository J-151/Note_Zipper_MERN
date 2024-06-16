import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const createNote = useSelector((state) => state.createNote);
  const { loading, error, note } = createNote;

  console.log(note);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;

    dispatch(createNoteAction(title, content, category));

    resetHandler();
    navigate("/mynotes");
  };

  return (
    <MainScreen title="Create a Note">
      <Card>
        <CardHeader>Create a new Note</CardHeader>
        <CardBody>
          <Form onSubmit={(e) => submitHandler(e)}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <FormGroup controlId="title">
              <FormLabel>Title</FormLabel>
              <FormControl
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId="content">
              <FormLabel>Content</FormLabel>
              <FormControl
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormGroup>
            {content && (
              <Card>
                <CardHeader>Note Preview</CardHeader>
                <CardBody>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </CardBody>
              </Card>
            )}

            <FormGroup controlId="content">
              <FormLabel>Category</FormLabel>
              <FormControl
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormGroup>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </CardBody>

        <CardFooter className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </CardFooter>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
