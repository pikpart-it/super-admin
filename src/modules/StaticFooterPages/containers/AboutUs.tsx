import React, { useEffect, useState } from "react";
import { FlexDiv, Section, SubSection } from "../../../style/styled";
import { H2Heading, Span } from "../../../components/styled";
import { Heading, Description } from "../styled";
import { FaCheck } from "react-icons/fa";
import {
  description,
  whyChooseAnswer,
} from "../../../config/constants/aboutUs";
import Bigbanner from "../../../assets/AboutUsPage/aboutUs/BigBanner.jpg";
import OfficePic from "../../../assets/AboutUsPage/aboutUs/housepic2.jpg";
import Pawan from "../../../assets/AboutUsPage/aboutUs/pawan2.jpg";
import Ratan from "../../../assets/AboutUsPage/aboutUs/ratan1.jpg";
import Deepak from "../../../assets/AboutUsPage/aboutUs/deepak1.jpg";
import Team from "../../../assets/AboutUsPage/aboutUs/team12.jpg";
import Slider from "react-slick";
import {
  CenteredContent,
  GradientOverlay,
  ImageContainer,
  Websitebox,
  Websitewrapper,
  Visitbutton,
  LogoImageContainer,
  TeamContainer,
  TeamImageContainer,
  QualityBox,
  QualityContainer,
  QualityWrapper,
  ContactusContainer,
  ContactusBox,
  AboutWrapper,
  IconConatainer,
  ImageBox,
  ImageWrapper,
  OpeningContainer,
  CountBox,
  CountWraper,
  TeamWrapper,
  Franchisedata,
  websiteData,
  qualityData,
  contactData,
  imageData,
} from "./styled";
import { config } from "../../../config/config";
import { getAuthorized } from "../../../services";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const settings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 100,
  slidesToShow: 3,
  slidesToScroll: 3,
  vertical: false,
  responsive: [
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
      },
    },

    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

function AboutUs({ screenSize }: { screenSize: any }) {
  const [recentOpenings, setRecentOpenings] = useState<any[]>([]);
  const getRecentBookings = async () => {
    try {
      const url = `${config.baseUrl}/utilities/recentOpenings`;
      const response = await getAuthorized(url);
      setRecentOpenings(response?.data?.data);
    } catch (error) {
      console.log("BAD API");
    }
  };
  useEffect(() => {
    getRecentBookings();
  }, []);
  return (
    <div style={{ width: "100%", position: "relative", overflowX: "hidden" }}>
      <ImageContainer>
        <GradientOverlay />
        <img src={Bigbanner} style={{ width: "100%" }} alt="Banner" />
        <CenteredContent>
          <h1 style={{ fontSize: "3em" }}>
            Welcome to
            <div>Pikpart</div>
          </h1>
          <h2>One of the two-wheeler multi-brand workshop chain</h2>
        </CenteredContent>
      </ImageContainer>

      <Websitewrapper style={{ marginTop: "2em" }}>
        {websiteData.map((item, index) => (
          <Websitebox key={index}>
            <LogoImageContainer>
              <img src={item.logo} style={{ width: "100%" }} alt="Logo" />
            </LogoImageContainer>
            {index !== 2 && (
              <Visitbutton
                onClick={() => window.open(item?.link)}
                style={{ color: "#fff" }}
              >
                {item.buttonText}
              </Visitbutton>
            )}

            {index === 2 && (
              <Visitbutton style={{ color: "#fff" }}>Coming Soon</Visitbutton>
            )}
          </Websitebox>
        ))}
      </Websitewrapper>

      <CountWraper
        style={{
          marginTop: "2em",
          backgroundColor: "#F7F7F7",
          padding: "20px",
        }}
      >
        <CountBox>
          <div
            style={{
              fontSize: "4em",
              color: "#FF5C00",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            5,000 +
          </div>
          <span style={{ fontSize: "1em" }}>RETAIL SPARE SHOPS</span>
        </CountBox>
        <CountBox>
          <div
            style={{
              fontSize: "4em",
              color: "#FF5C00",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            150 +
          </div>
          <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
            PLUS FRANCHISE GARAGES
          </span>
        </CountBox>
        <CountBox>
          <div
            style={{
              fontSize: "4em",
              color: "#FF5C00",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            65,000 +
          </div>
          <span style={{ fontSize: "1em" }}>CUSTOMERS</span>
        </CountBox>
      </CountWraper>

      <div style={{ margin: "40px" }}>
        <h1 style={{ fontSize: "2.8em" }}>About Pikpart</h1>
        <AboutWrapper>
          <div style={{ width: "40%", marginTop: "3em" }}>
            <div style={{ marginBottom: "1em" }}>
              <h4 style={{ fontSize: "19px", fontWeight: "" }}>
                Pikpart Smart Garage
              </h4>
              <p
                style={{
                  color: "#A09389",
                  lineHeight: "28px",
                  fontSize: "15px",
                  marginTop: "5px",
                }}
              >
                One of the leading two-wheeler multi-brand workshop chain,
                committed to serve, the best quality and most efficient repair
                and maintenance services to Indian customers.
              </p>
            </div>
            <div style={{ marginBottom: "1em" }}>
              <h4 style={{ fontSize: "19px" }}>Pikpart Spare</h4>
              <p
                style={{
                  color: "#A09389",
                  lineHeight: "28px",
                  fontSize: "15px",
                  marginTop: "5px",
                }}
              >
                With the aim of revolutionizing the two-wheeler maintenance
                industry in India, Pikpart decided to bring a change by
                introducing a digital platform for two-wheeler maintenance
                services.
              </p>
            </div>
            <div style={{ marginBottom: "1em" }}>
              <h4 style={{ fontSize: "19px" }}>Pikpart Electric</h4>
              <p
                style={{
                  color: "#A09389",
                  lineHeight: "28px",
                  fontSize: "15px",
                  marginTop: "5px",
                }}
              >
                The company aims to be a top sustainable transportation
                provider, focusing on electric vehicles. They are dedicated to
                reducing carbon emissions and providing customers with the
                latest and most innovative electric vehicles available.
              </p>
            </div>
          </div>
          <div>
            <div style={{ width: "600px", height: "500px" }}>
              <img
                src={OfficePic}
                style={{ width: "100%", height: "100%" }}
              ></img>
            </div>
          </div>
        </AboutWrapper>
      </div>

      <ImageWrapper style={{ marginTop: "6em" }}>
        {imageData.map((item, index) => (
          <ImageBox key={index}>
            <img
              src={item.src}
              alt={item.alt}
              style={{ width: "100%", height: "300px" }}
            />
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <span>{item.title}</span>
            </div>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              {index !== 2 && (
                <Visitbutton
                  onClick={() => window.open(item?.link)}
                  style={{ color: "#fff" }}
                >
                  Visit Website
                </Visitbutton>
              )}
              {index === 2 && (
                <Visitbutton style={{ color: "#fff" }}>Coming Soon</Visitbutton>
              )}
            </div>
          </ImageBox>
        ))}
      </ImageWrapper>

      <TeamContainer>
        <div
          style={{
            marginBottom: "2em",
            paddingTop: "2em",
            textAlign: "center",
          }}
        >
          <span style={{ color: "#E7522D" }}>Pikpart Team</span>
          <h4 style={{ marginTop: "5px", fontSize: "2em", fontWeight: "bold" }}>
            Our Core Team
          </h4>
        </div>
        <TeamWrapper>
          <div>
            <TeamImageContainer>
              <img src={Ratan} style={{ width: "100%", height: "100%" }}></img>
            </TeamImageContainer>
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              RATAN KUMAR SINGH
            </div>
            <div
              style={{
                textAlign: "center",
                color: "#9E9188",
                fontSize: "13px",
                marginTop: "5px",
              }}
            >
              CO-FOUNDER & COO
            </div>
          </div>
          <div>
            <TeamImageContainer>
              <img src={Pawan} style={{ width: "100%", height: "100%" }}></img>
            </TeamImageContainer>
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              PAWAN SINGH
            </div>
            <div
              style={{
                textAlign: "center",
                color: "#9E9188",
                fontSize: "13px",
                marginTop: "5px",
              }}
            >
              FOUNDER & CEO
            </div>
          </div>
          <div>
            <TeamImageContainer>
              <img src={Deepak} style={{ width: "100%", height: "100%" }}></img>
            </TeamImageContainer>
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              DEEPAK BARANWAL
            </div>
            <div
              style={{
                textAlign: "center",
                color: "#9E9188",
                fontSize: "13px",
                marginTop: "5px",
              }}
            >
              CO-FOUNDER & CTO
            </div>
          </div>
        </TeamWrapper>

        <div style={{ margin: "auto", width: "95%" }}>
          <img src={Team} style={{ width: "95%", margin: "30px" }} alt="" />
        </div>

        <h4
          style={{
            marginTop: "5px",
            fontSize: "2em",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Pikpart Team
        </h4>
      </TeamContainer>

      <QualityContainer>
        <h2
          style={{
            marginTop: "2em",
            textAlign: "center",
            fontSize: "2em",
            marginBottom: "2em",
          }}
        >
          Why People Choose Us
        </h2>
        <QualityWrapper>
          {qualityData.map((item, index) => (
            <QualityBox key={index}>
              <div style={{ color: "#E7522D" }}>{item.icon}</div>
              <div
                style={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  marginTop: "8px",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  color: "#A09389",
                  marginTop: "8px",
                  textAlign: "center",
                }}
              >
                {item.description}
              </div>
            </QualityBox>
          ))}
        </QualityWrapper>
      </QualityContainer>

      <h2
        style={{
          marginTop: "2em",
          textAlign: "center",
          fontSize: "2em",
          marginBottom: "2em",
        }}
      >
        Let Us Call You
      </h2>

      {/* Contact Box */}
      <ContactusContainer>
        {contactData.map((item, index) => (
          <ContactusBox key={index}>
            <IconConatainer>{item.icon}</IconConatainer>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              {item.title}
            </div>
            <div style={{ color: "#A09389" }}>{item.info}</div>
          </ContactusBox>
        ))}
      </ContactusContainer>

      {/* ------Recent opening--- */}
      <h2
        style={{
          marginTop: "2em",
          textAlign: "center",
          fontSize: "2em",
          marginBottom: "2em",
        }}
      >
        Our Recent Openings
      </h2>
      <div style={{ overflowX: "scroll", whiteSpace: "nowrap", width: "100%" }}>
        <Slider {...settings}>
          {recentOpenings.map((i, key) => (
            <div key={key}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <OpeningContainer>
                  <img
                    src={i?.serviceCentreDetail?.iconUrl}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  />
                  <GradientOverlay />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 1,
                      color: "whitesmoke",
                      marginBottom: "1em",
                    }}
                  >
                    <h3 style={{ marginLeft: "8em" }}>{i?.name}</h3>
                  </div>
                </OpeningContainer>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
export default AboutUs;
