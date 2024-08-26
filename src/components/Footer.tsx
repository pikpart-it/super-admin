import React from "react";
import Logo from "../assets/images/Final-Logo-white-pikpaprt.png";
import { FooterDescription } from "../modules/StaticFooterPages/styled";
import { validateEmail } from "../utility/func";

import { Link } from "react-router-dom";
import {
  FoooterLink,
  FooterRows,
  Footercontainer,
  Footerlink,
  LogoIcon,
  Social,
  SocialCircle,
  SocialMediaMobile,
  Span,
  WebLink,
} from "./styled";

function Footer(props: any) {
  const [subscribe, setSubscribe] = React.useState<any>({
    values: {},
    errors: {},
  });
  function onchange(target: any) {
    setSubscribe({
      ...subscribe,
      values: { ...subscribe.values, [target.name]: target.value },
    });
  }
  function onBlur({ target }: any) {
    if (target.name === "Email") {
      if (target.value.length > 4 && validateEmail(target.value)) {
        setSubscribe({
          ...subscribe,
          errors: { ...subscribe.errors, [target.name]: "" },
        });
      } else {
        setSubscribe({
          ...subscribe,
          errors: { ...subscribe.errors, [target.name]: "Invalid Email" },
        });
      }
    }
  }

  const isSubscribeEnabled = subscribe.values.Email;

  return (
    <>
      <Footercontainer id="footer">
        <Footerlink>
          <div>
            <Link to="/" style={{ paddingLeft: "0px", textDecoration: "none" }}>
              <LogoIcon src={Logo} alt="logo" />
            </Link>
            <FooterDescription style={{ margin: "0", padding: "0" }}>
              <Span style={{ color: "#fff", padding: "0" }}>
                <span>Pikpart Building</span>
              </Span>
              <Span style={{ color: "#fff", padding: "0" }}>
                <span>Sector-9, Bypass Road</span>
              </Span>
              <Span style={{ color: "#fff", padding: "0" }}>
                <span>Faridabad - 121003</span>
              </Span>
              <Span style={{ color: "#fff", padding: "0" }}>
                <strong>Call us on: +91 90279 14004</strong>
              </Span>
            </FooterDescription>
          </div>
          {/* <FooterRows>
            {links.map((content: any, i: number) => {
              if (content.name === "Blog") {
                return (
                  <WebLink
                    key={i}
                    id={`footer-menu-link-${i}`}
                    href={content.link}
                    target="_blank"
                  >
                    {content.name}
                  </WebLink>
                );
              } else
                return (
                  <FoooterLink
                    key={i}
                    id={`footer-menu-link-${i}`}
                    to={content.link}
                  >
                    {content.name}
                  </FoooterLink>
                );
            })}
          </FooterRows> */}
        </Footerlink>
        <hr style={{ width: "86%" }} />
        {/* <Social>
          {socialMedia.map((social: any, i: number) => (
            <div key={i}>
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                <SocialCircle>{social.logo}</SocialCircle>
              </a>
            </div>
          ))}
        </Social> */}
      </Footercontainer>
      <SocialMediaMobile>
        {/* <Social>
          {socialMedia.map((social: any, i: number) => (
            <div key={i}>
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                <SocialCircle>{social.logo}</SocialCircle>
              </a>
            </div>
          ))}
        </Social> */}
      </SocialMediaMobile>
      {/* {props.location.pathname === RoutesPath.InitialInspection ||
      props.location.pathname === RoutesPath.NewMobilefranchise ||
      props.location.pathname === RoutesPath.Newfranchise ||
      props.location.pathname === RoutesPath.PrivacyPolicy ||
      props.location.pathname === RoutesPath.Invoice ||
      props.location.pathname === RoutesPath.HealthCheck ||
      props.location.pathname === RoutesPath.GeneralService ||
      props.location.pathname === RoutesPath.ExpressService ||
      props.location.pathname === RoutesPath.EmergencyService ||
      props.location.pathname === RoutesPath.RoadAssistance ||
      props.location.pathname === RoutesPath.HomeService ||
      props.location.pathname === RoutesPath.ContactUs ||
      props.location.pathname === RoutesPath.ElectricalService ||
      props.location.pathname === RoutesPath.Services ||
      props.location.pathname === RoutesPath.RegisterForm ? null : (
        <MobFooter {...props} />
      )} */}
    </>
  );
}

export default Footer;
