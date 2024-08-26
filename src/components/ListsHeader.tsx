import React, { Fragment, ReactElement } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,

    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function Header({
  titles,
  color,
}: {
  titles: string[];
  color?: string;
}): ReactElement {
  return (
    <TableHead style={{ width: "100%" }}>
      <TableRow style={{ width: "100%" }}>
        {titles?.map((title: string, index: number) => (
          <Fragment key={index}>
            {title && (
              <StyledTableCell
                align="center"
                style={color ? { backgroundColor: color } : undefined}
              >
                {title}
              </StyledTableCell>
            )}
          </Fragment>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default Header;
