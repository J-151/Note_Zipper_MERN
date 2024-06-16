import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
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
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

function SingleNote() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  const updateNote = useSelector((state) => state.updateNote);
  const { loading, error } = updateNote;

  const deleteNote = useSelector((state) => state.deleteNote);
  const { loading: loadingDelete, error: errorDelete } = deleteNote;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    navigate("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes");
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <CardHeader>Edit your Note</CardHeader>
        <CardBody>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <FormGroup controlId="title">
              <FormLabel>Title</FormLabel>
              <FormControl
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId="content">
              <FormLabel>Content</FormLabel>
              <FormControl
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
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
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormGroup>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}>
              Delete Note
            </Button>
          </Form>
        </CardBody>

        <CardFooter className="text-muted">
          Updated on - {date.substring(0, 10)}
        </CardFooter>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
