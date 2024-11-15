import{aP as j,aQ as C,r as w,aR as k,aS as B,_ as N,j as e,m as v,O as S,T as P,G as F,aT as T,aU as _,aV as $,p as h,ak as E,F as a}from"./index-D2pmaiQC.js";const M=["className","component"];function R(t={}){const{themeId:o,defaultTheme:x,defaultClassName:s="MuiBox-root",generateClassName:r}=t,i=j("div",{shouldForwardProp:n=>n!=="theme"&&n!=="sx"&&n!=="as"})(C);return w.forwardRef(function(c,m){const l=k(x),d=B(c),{className:b,component:g="div"}=d,y=N(d,M);return e.jsx(i,v({as:g,ref:m,className:S(b,r?r(s):s),theme:o&&l[o]||l},y))})}function H(t){return P}const z=F("MuiBox",["root"]),D=T(),I=R({themeId:_,defaultTheme:D,defaultClassName:z.root,generateClassName:$.generate}),U=h.span`
  font-size: ${({fontSize:t})=>t||14}px;
  color: ${({color:t})=>t||"#000"};
`,u={success:"rgb(115, 209, 61) ",secondary:"rgb(140, 140, 140)",primary:"rgb(64, 169, 255)",danger:"rgb(255, 77, 79)"},f=h.button`
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  outline: none;
  padding: 9px 16px;
  font-size: 14px;
  line-height: 1.1;
  letter-spacing: normal;
  font-stretch: 100%;
  transition: all 0.4s ease 0s;
  border-radius: 4px;
  border: 1px solid rgb(217, 217, 217);
  margin: 0px;
  color: ${({variant:t})=>t?"#fff":"#000"};
  cursor: pointer;
  border-color: ${({variant:t})=>u[t]};
  background-color: ${({variant:t})=>u[t]||"#fff"};
  &:disabled {
    background-color: rgb(183, 235, 143);
    border-color: rgb(217, 217, 217);
    cursor: not-allowed;
  }
`,W={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:500,bgcolor:"background.paper",boxShadow:24,p:4,padding:"10px",outline:"none"};function L({toggleModal:t,setToggleModal:o,setModal:x,modal:s,onInitiateInspection:r,onConfirm:i,onCancel:p,header:n,body:c}){return e.jsx(E,{open:t,onClose:o,children:e.jsxs(I,{sx:W,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",margin:"0px 5px"},children:[e.jsx("p",{style:{margin:"0px "},children:n}),e.jsx("p",{style:{margin:"0px",fontWeight:"bold",fontSize:"16px",cursor:"pointer"},onClick:o,children:"x"})]}),e.jsx("hr",{style:{width:"100%"}}),e.jsx(a,{justifyContentFlexStart:!0,children:e.jsx(U,{variant:"h4",style:{fontWeight:600},children:c||`Do you want to ${s.type} this booking?`})}),e.jsx("hr",{style:{width:"100%"}}),e.jsxs(a,{justifyContentFlexEnd:!0,style:{margin:"10px 0px 0px 0px"},children:[e.jsx(a,{children:e.jsx(f,{style:{margin:"0px 10px",color:"#fff"},variant:"primary",onClick:()=>{o(),s.type==="inspect"?r(s.content):s.type==="confirm"?i(s.content):p(s.content)},children:"Yes"})}),e.jsx(a,{children:e.jsx(f,{style:{margin:"0px 10px",color:"#fff"},variant:"danger",onClick:o,children:"No"})})]})]})})}export{I as B,L as M,H as c};
