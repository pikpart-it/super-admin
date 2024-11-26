import styled from "styled-components";
import { Button } from "../components/styled";
import { TableCell, TableRow, tableCellClasses } from "@mui/material";

const respWidth = () =>
  window.innerWidth < 540
    ? "150px"
    : window.innerWidth < 900
      ? "200px"
      : window.innerWidth < 1400
        ? "250px"
        : "300px";

const getResponsiveWidth = () => {
  if (window.innerWidth < 540) return "150px";
  if (window.innerWidth < 900) return "200px";
  if (window.innerWidth < 1400) return "250px";
  return "300px";
};
export const sideBarOpenWidth = respWidth();
export const sideBarWidth = window.innerWidth < 540 ? "0px" : "50px";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '"#42a5f5"',
    color: "#fff",
    fontSize: 13,
    padding: '5px', // Adjust padding as needed
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    padding: '5px', // Adjust padding as needed
  },
  [`&`]: {
    width: getResponsiveWidth(),
  },

}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    fontSize: 11,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const FlexDiv = styled.div<{
  width?: string;
  margin?: string;
  column?: boolean;
  justifyContentCenter?: boolean;
  justifyContentFlexStart?: boolean;
  justifyContentFlexEnd?: boolean;
  justifyContentSpaceEvenly?: boolean;
  justifyContentSpaceBetween?: boolean;
  justifyContentSpaceAround?: boolean;
  alignItemsFlexStart?: boolean;
  alignItemsFlexEnd?: boolean;
  alignItemsCenter?: boolean;
  wrap?: boolean;
  bg?: string;
}>`
  display: flex;
  background: ${(props) => props.bg};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  justify-content: ${(props) =>
    props.justifyContentCenter
      ? "center"
      : props.justifyContentFlexStart
        ? "flex-start"
        : props.justifyContentFlexEnd
          ? "flex-end"
          : props.justifyContentSpaceEvenly
            ? "space-evenly"
            : props.justifyContentSpaceBetween
              ? "space-between"
              : props.justifyContentSpaceAround
                ? "space-arount"
                : "none"};
  align-items: ${(props) =>
    props.alignItemsCenter
      ? "center"
      : props.alignItemsFlexStart
        ? "flex-start"
        : props.alignItemsFlexEnd
          ? "flex-end"
          : "none"};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};

  flex-wrap: ${(props) => (props.wrap ? "wrap" : "none")};
`;
export const StyledInputFields = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid rgb(233, 233, 233);
  margin: 10px 5px;
  border-radius: 6px;
  transition: all 0.4s ease-in-out;
  &:focus {
    outline: none;
    border: 1px solid #1773b0;
  }
`;
export const StyledInputSelectFields = styled.select`
  padding: 15px;
  border: 1px solid rgb(233, 233, 233);
  margin: 10px 5px;
  border-radius: 6px;
  min-width: 150px;
  transition: all 0.4s ease-in-out;
  &:focus-visible {
    outline: none;
    border: 1px solid #1773b0;
  }
`;
export const HeaderDiv: any = styled(FlexDiv)`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: rgb(34, 34, 34);
  z-index: 500;
`;

export const PortalDiv: any = styled.div`
  background-size: 150px 150px;
  height: 100%;
  overflow: hidden auto;
  // box-shadow: inset 0 3px 3px 3px rgba(255, 255, 255, 0.5);
  ${(props: any) => {
    return `
    margin-left: ${props.menuOpen || !props.hasSidebar ? "0px" : "50px"};
   width: calc(100vw - ${props.sidebar ? (props.menuOpen ? sideBarOpenWidth : sideBarWidth) : "0px"
      });
  `;
  }};
  @media (max-width: 540px) {
    ${(props: any) => {
    return `
      margin-left: 0px;
      width: 100%;
    `;
  }};
  }
`;

export const SideBarDivTransparent: any = styled.div`
  @media (max-width: 540px) {
    position: absolute;
    width: ${(props: any) => (props.menuOpen ? "100%" : "0")};
  }
  top: 0;
  bottom: 0;
  overflow: hidden auto;
  padding-top: 25px;
  background: transparent;
  transition: 0.4s linear;
  ${(props: any) => `
    z-index:  1001;
    position: ${props.menuOpen ? "relative" : "absolute"};
    width: ${props.menuOpen ? `0px` : "0px"};
    span {
      opacity: 0;
      overflow: hidden;
      transition: 0s;
    }
    .icon {
      margin-right: ${props.menuOpen ? "10px" : "-109px"};
    }
    .chevron {
      opacity: ${props.menuOpen ? "1" : "0"};
      margin-left: auto;
      margin-right: ${props.menuOpen ? "15px" : 0};
    }
    .active-child {
      background: ${props.menuOpen ? "#e46b33;" : "inherit"};
    }
  `}
`;

export const SideBarDiv: any = styled(FlexDiv)`
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 540px) {
    position: absolute;
    width: ${(props: any) => (props.menuOpen ? "250px" : "0")};
  }
  top: 0;
  bottom: 0;
  overflow: hidden auto;
  padding-top: 15px;
  background: rgb(34, 34, 34);
  transition: 0.4s linear;
  ${(props: any) => `
    z-index:  1002;
    position: ${props.menuOpen ? "relative" : "absolute"};
    width: ${props.menuOpen ? sideBarOpenWidth : "70px"};
    span {
      opacity: 0;
      overflow: hidden;
      transition: 0s;
    }
    .icon {
      margin-right: ${props.menuOpen ? "10px" : "-109px"};
     
    }
    .chevron {
      opacity: ${props.menuOpen ? "1" : "0"};
      margin-left: auto;
      margin-right: ${props.menuOpen ? "15px" : 0};
    }
    .active-child {
      background: ${props.menuOpen ? "#e46b33;" : "inherit"};
    }
  `}

  &:hover {
    .hover .active-sub-menu {
      transform: scale(1, 1);
      height: auto;
    }
  }

  @media (min-width: 540px) {
    &:hover {
      width: ${sideBarOpenWidth};
      transition: 0.4s linear;
      span {
        opacity: 1;
        transition: 0.3s ease;
      }
      .icon {
        margin-right: 10px;
      }
      .chevron {
        opacity: 1;
        margin-right: 15px;
      }
      .active-child {
        background: #e46b33;
      }
      .hover .active-sub-menu {
        transform: scale(1, 1);
        height: auto;
      }
    }
  }
`;

export const SubMenuLevel: any = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  // min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

  > a {
    color: black;
    padding: 12px 10px;
    font-size: 13px;
    text-decoration: none;
    display: block;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
    }
  }
`;

export const MenuLevel: any = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;

  > a {
    opacity: 0.7;
    &.active-child,
    &.active {
      opacity: 1;
    }
  }
  &:hover {
    > a {
      opacity: 1;
    }
  }
  &.hover {
    > a {
      .chevron {
        transform: rotateZ(180deg);
      }
    }
  }
  > div {
    height: 0px;
    overflow: hidden;
  }

  &:hover {
    .active-sub-menu {
      transform: scale(1, 1);
      height: auto;
    }
  }
`;

export const Anchor: any = styled.a`
  color: white;
  display: flex;
  align-items: center;
  padding: 12px 0 12px 15px;
  font-size: 14px;
  letter-spacing: 0.8px;
  text-decoration: none;
  overflow: hidden;
  &.active {
    background: #20242f;
  }
  > span {
    ${(props: any) => `
      transition: 0s;
      opacity: ${props.menuOpen ? "1" : "0"};
    `}
  }
`;

export const AppIcon = styled.img`
  @media (max-width: 540px) {
    width: 80px;
    height: auto;
    margin-top: 3px;
  }
`;

export const AppIcon2 = styled.img`
  height: 55px;
  @media (max-width: 540px) {
    width: 60px;
    height: 40px;
    margin-top: 3px;
  }
`;

export const DarkButton = styled.button`
  border: 1px solid #fff;
  padding: 4px 12px;
  border-radius: 2px;
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.2px;
  background: transparent;
  transition: 0.6s ease;
  color: #fff;
  &:hover {
    cursor: pointer;
    color: rgb(219, 89, 45);
    transition: 0.4s ease;
  }
  @media (max-width: 540px) {
    padding: 4px 8px;
  }
`;

export const Section = styled.section`
  ::-webkit-scrollbar {
    width: 100px;
    height: 100px;
  }

  width: 100%;
  position: relative;
  box-sizing: border-box;
  // margin-bottom: 4vmax;
  @media (max-width: 786px) {
    // margin-bottom: 10vmax;
  }
  @media (max-width: 540px) {
    // padding-bottom: 10vmax;
  }
`;

export const SubSection = styled.div`
  margin: 0 auto;
  transition: 0.6s linear;

  @media (min-width: 1441px) {
    transition: 0.6s linear;
    width: 70%;
  }
  @media (max-width: 1440px) {
    transition: 0.6s linear;
    width: 80%;
  }
  @media (max-width: 1200px) {
    transition: 0.6s linear;
    width: 85%;
  }
  @media (max-width: 786px) {
    transition: 0.6s linear;
    width: 90%;
  }
  @media (max-width: 540px) {
    transition: 0.6s linear;
    width: 95%;
  }
`;
export const SubSection80 = styled(SubSection)`
  @media (max-width: 540px) {
    transition: 0.6s linear;
    width: 80%;
  }
`;

export const SubSection100 = styled(SubSection)`
  padding: 50px 0;
  @media (max-width: 540px) {
    transition: 0.6s linear;
    width: 100%;
    padding: 0;
  }
`;

export const SubSectionUser85 = styled(SubSection)`
  @media (max-width: 540px) {
    transition: 0.6s linear;
    width: 85%;
    padding: 0px !important;
  }
`;

export const BtnGroupUser = styled(FlexDiv)`
  margin: 5px 0;
  button {
    border-radius: 0;
  }
  button:first-child {
    border-radius: 3px 0 0 3px !important;
  }
  button:last-child {
    border-radius: 0 3px 3px 0 !important;
  }
  @media (max-width: 540px) {
    justify-content: center;
  }
`;
export const ThemeButton = styled(Button)`
  background-color: #e95330;
  justify-content: center;
  width: 100%;
  margin: 5px 0px;
  color: white;
  &:hover {
    background-color: #e95330;
    color: white;
  }

  &:disabled {
    background: gray;
  }

  @media (max-width: 540px) {
    width: 45%;
  }
`;
