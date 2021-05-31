import _ from "lodash";
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const CTableBody = ({ items, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };
  return (
    <TableBody>
      {items.map((item) => (
        <TableRow key={item.id}>
          {columns.map((column) => (
            <TableCell key={item.id + (column.path || column.key)}>
              {renderCell(item, column)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CTableBody;
