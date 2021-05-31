import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

const CTable = ({ columns, sortColumn, onSort, items }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody items={items} columns={columns} />
      </Table>
    </TableContainer>
  );
};

export default CTable;
