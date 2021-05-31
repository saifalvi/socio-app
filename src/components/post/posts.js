import React, { useState, useEffect } from "react";
//import Pagination from "../common/pagination";
import PostsTable from "./PostsTable";
import SearchBox from "../common/searchBox";
import { deletePost, getPosts } from "../../services/postsService";
import { paginate } from "../utils/paginate";
import { withSnackbar } from "../common/snackbar";
import _ from "lodash";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "10px",
    },
    table: {
      height: 500,
      overflow: "auto",
      width: "100%",
      marginTop: "10px",
      marginBottom: "10px",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
    },
  })
);

const Posts = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;

  useEffect(() => {
    try {
      fetchPosts();
    } catch (ex) {}
  }, [setPosts]);

  async function fetchPosts() {
    const { data: posts } = await getPosts();
    setPosts(posts);
  }

  const handleDelete = async (post) => {
    const originalposts = posts;
    const filteredPosts = originalposts.filter((m) => m.id !== post.id);
    setPosts(filteredPosts);

    try {
      await deletePost(post.id);
    } catch (ex) {
      if (ex.response && ex.response.status === "404")
        this.props.snackbarShowMessage(
          `This post has already been deleted`,
          "error"
        );

      setPosts(originalposts);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filtered = posts;
    if (searchQuery)
      filtered = posts.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const pagedPosts = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: pagedPosts };
  };

  const { totalCount, data: pagedPosts } = getPagedData();

  const pagesCount = Math.ceil(totalCount / pageSize);

  return (
    <div className={classes.root}>
      <Grid container>
        <Button
          style={{ marginRight: "10px" }}
          href="/posts/new"
          variant="contained"
          color="primary"
        >
          Create New Post
        </Button>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <div className={classes.table}>
          <PostsTable
            posts={pagedPosts}
            sortColumn={sortColumn}
            onDelete={handleDelete}
            onSort={handleSort}
          />
        </div>
        <Pagination
          count={pagesCount}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Grid>
    </div>
  );
};

export default withSnackbar(Posts);
