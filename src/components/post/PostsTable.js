import { Link } from "react-router-dom";
import CTable from "../common/table";
import Button from "@material-ui/core/Button";

const PostsTable = ({ posts, sortColumn, onDelete, onSort }) => {
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (post) => (
        <Link to={`/post-detail/${post.id}`}>{post.title}</Link>
      ),
    },
    {
      key: "edit",
      content: (post) => (
        <Button color="primary" size="small" href={`/posts/${post.id}`}>
          Edit
        </Button>
      ),
    },
    {
      key: "delete",
      content: (post) => (
        <Button color="secondary" size="small" onClick={() => onDelete(post)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <CTable
      columns={columns}
      sortColumn={sortColumn}
      items={posts}
      onSort={onSort}
    />
  );
};

export default PostsTable;
