import React, { Fragment, ReactElement } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    padding: '5px', // Adjust padding as needed
    color: theme.palette.common.white,
    fontSize: 13,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    padding: '5px', // Adjust padding as needed
  },
}));

function Header({
  titles,
  color,
  width
}: {
  titles: string[];
  color?: string;
  width?: string
}): ReactElement {
  return (
    <TableHead style={{ width: "100%" }}>
      <TableRow style={{ width: "100%" }}>
        {titles?.map((title: string, index: number) => (
          <Fragment key={index}>
            {title && (
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: color || "inherit", // Set default background if no color is passed
                  width: width || "auto",              // Apply dynamic width with a fallback
                }}
              >
                {title}
              </StyledTableCell>
            )}
          </Fragment>
        ))}
      </TableRow>
    </TableHead >
  );
}

export default Header;
