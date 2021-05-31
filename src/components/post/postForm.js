import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { getPost, savePost } from "../../services/postsService";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Input from "./../common/input";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "500px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(4),
      width: "500px",
    },
  },
}));

const PostForm = (props) => {
  const [post, setPost] = useState({ userId: 1, id: 0, title: "", body: "" });
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  useEffect(() => {
    try {
      async function fetchPost() {
        try {
          const postId = props.match.params.id;
          if (postId === "new") return;

          const { data: currentPost } = await getPost(postId);
          setPost(mapToViewModel(currentPost));
        } catch (ex) {
          if (ex.response && ex.response.status === 404)
            this.props.history.replace("/not-found");
        }
      }

      fetchPost();
    } catch (ex) {}
  }, [props.match.params.id]);

  const schema = {
    id: Joi.number(),
    userId: Joi.number(),
    title: Joi.string().required().label("Title"),
    body: Joi.string().required().label("Description"),
  };

  const mapToViewModel = (post) => {
    return {
      id: post.id,
      userId: post.userId,
      title: post.title,
      body: post.body,
    };
  };

  const validate = () => {
    const { error } = Joi.validate(post, schema, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    error.details.map((error) => (errors[error.path[0]] = error.message));
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const propertySchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, propertySchema);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const terrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) terrors[input.name] = errorMessage;
    else delete terrors[input.name];

    const tpost = { ...post };
    tpost[input.name] = input.value;
    setPost(tpost);
    setErrors(terrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (errors) {
      setErrors(errors);
      return;
    }

    await savePost(post);

    props.history.push("/");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Input
        label="title"
        error={errors && errors.title}
        id="title"
        type="text"
        name="title"
        value={post.title}
        onChange={handleChange}
      />
      <Input
        label="body"
        error={errors && errors.body}
        id="body"
        type="text"
        name="body"
        value={post.body}
        onChange={handleChange}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
