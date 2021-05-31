import { useEffect, useState } from "react";
import { getPost, getPostComments } from "../../services/postsService";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const PostDetail = (props) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    try {
      async function fetchPostById() {
        const postId = props.match.params.id;
        const { data: post } = await getPost(postId);
        const { data: comments } = await getPostComments(postId);
        setPost(post);
        setComments(comments);
      }
      fetchPostById();
    } catch (ex) {}
  }, [props.match.params.id]);

  return (
    <div>
      <h1>Post Detail</h1>
      <Card>
        <CardContent>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <hr />
          {comments.length > 0 && <h4>Comments</h4>}
          {comments.map((comment) => (
            <Card>
              <CardContent>
                <div>
                  <b>Name:</b>
                  <span>{comment.name}</span>
                </div>
                <div>
                  <b>Added by:</b>
                  <span>{comment.email}</span>
                </div>
                <div>
                  <b>Comment:</b>
                  <span>{comment.body}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PostDetail;
