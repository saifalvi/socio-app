import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        width: "400px",
      },
    },
  })
);

const SearchBox = ({ value, onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        variant="outlined"
        label="Search Title"
        type="text"
        name="query"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBox;
