import React from 'react'
import styled from 'styled-components'
import SmartGargeLogo from '../../../assets/AboutUsPage/aboutUs/Final-Logo-white-pikpaprt.png'
import Sg from '../../../assets/AboutUsPage/aboutUs/sg.jpg'
import Sp from '../../../assets/AboutUsPage/aboutUs/sp.jpg'
import Se from '../../../assets/AboutUsPage/aboutUs/Se.jpg'
import jalgon from '../../../assets/AboutUsPage/aboutUs/jalgaw.jpg'
import GorakPur from '../../../assets/AboutUsPage/aboutUs/gorakhpur.jpg'
import GopalGanj from '../../../assets/AboutUsPage/aboutUs/gopalganj.jpg'
import Ghaziabad from '../../../assets/AboutUsPage/aboutUs/ghaziaibad.jpg'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import AttachEmailIcon from '@mui/icons-material/AttachEmail'
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'
import sparelogo from '../../../assets/AboutUsPage/aboutUs/App_Logo.png'
import Evlogo from '../../../assets/AboutUsPage/aboutUs/pikpart-electric-logo.jpg'
export const Franchisedata = [
  {
    id: 1,
    images: jalgon,
    garageName: 'Eco Point Smart Garage',
    place: 'Jalgao',
  },
  {
    id: 2,
    images: GorakPur,
    garageName: 'Rajan Automobile',
    place: 'GorakhPur',
  },
  {
    id: 3,
    images: GopalGanj,
    garageName: 'Redforce EnterPrises',
    place: 'GopalGanj',
  },
  {
    id: 4,
    images: Ghaziabad,
    garageName: 'Realable EnterPrises',
    place: 'Ghaziabad',
  },
]
export const websiteData = [
  {
    logo: SmartGargeLogo,
    buttonText: 'VISIT NOW',
    link: 'https://www.mysmartgarage.in/',
  },
  {
    logo: sparelogo,
    buttonText: 'VISIT NOW',
    link: 'https://sparestest.pikpart.com/',
  },
  {
    logo: Evlogo,
    buttonText: 'VISIT NOW',
    link: '',
  },
]
export const qualityData = [
  {
    icon: <TaskAltIcon style={{ fontSize: '2.5em' }} />,
    title: 'Quality Products',
    description: 'High-Quality Two-Wheeler Spare Parts for Optimal Performance and Durability.',
  },
  {
    icon: <AssuredWorkloadIcon style={{ fontSize: '2.5em' }} />,
    title: 'Assured Warranty',
    description:
      'Claim Assured Warranty on Two-Wheeler Spare Parts Effortlessly with the Pikpart website.',
  },
  {
    icon: <LocalAtmIcon style={{ fontSize: '2.5em' }} />,
    title: 'Affordable Prices',
    description: 'Affordable Prices and Great Deals on a Wide Range of Two-Wheeler Spare Parts.',
  },
]
export const contactData = [
  {
    icon: <LocationOnIcon style={{ fontSize: '2em' }} />,
    title: 'LOCATION',
    info: 'Pikpart Building, Sector-9, Bypass Road, Faridabad - 121003',
  },
  {
    icon: <HeadsetMicIcon style={{ fontSize: '2em' }} />,
    title: "LET'S TALK",
    info: 'Phone: +91 9315218992',
  },
  {
    icon: <AttachEmailIcon style={{ fontSize: '2em' }} />,
    title: 'EMAIL US',
    info: 'info@pikpart.com',
  },
  {
    icon: <TwoWheelerIcon style={{ fontSize: '2em' }} />,
    title: 'CUSTOMER SERVICES',
    info: 'We Provide Best Customer Services',
  },
]
export const imageData = [
  {
    src: Sg,
    alt: 'Pikpart Smart Garage',
    title: 'Pikpart Smart Garage',
    link: 'https://www.mysmartgarage.in/',
  },
  {
    src: Sp,
    alt: 'Pikpart Spare',
    title: 'Pikpart Spare',
    link: 'https://sparestest.pikpart.com/',
  },
  {
    src: Se,
    alt: 'Pikpart EV',
    title: 'Pikpart EV',
    link: '',
  },
]
export const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #ffffff;
`
export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
`
export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
`
export const Websitewrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2em;

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
`
export const TeamWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2em;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`
export const Websitebox = styled.div`
  width: 330px;
  height: 200px;
  padding: 8px;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 850px) {
    margin-bottom: 20px;
  }
`
export const Visitbutton = styled.div`
  width: 150px;
  padding: 10px;
  border-radius: 5px;
  background: #ff5c00;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
export const LogoImageContainer = styled.div`
  width: 200px;
  height: 70px;
  margin-top: 5px;
  margin-bottom: 40px;
`
export const TeamContainer = styled.div`
  width: 100%;
  background: #f7f7f7;
  margin-top: 1.5em;
`
export const TeamImageContainer = styled.div`
  width: 350px;
  height: 450px;
`
export const QualityContainer = styled.div`
  width: 100%;
  background: #f7f7f7;
  margin-top: 1.5em;
  padding-bottom: 1.5em;
`
export const QualityWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2em;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`
export const QualityBox = styled.div`
  width: 330px;
  height: 200px;
  padding: 8px;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    margin-bottom: 20px;
  }
`
export const ContactusContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2em;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`
export const ContactusBox = styled.div`
  width: 250px;
  text-align: center;
  @media (max-width: 700px) {
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid black;
  }
`
export const AboutWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2em;

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
`
export const IconConatainer = styled.div`
  color: #e7522d;
`
export const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2em;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`
export const ImageBox = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  @media (max-width: 800px) {
    margin-bottom: 30px;
  }
`
export const OpeningContainer = styled.div`
  width: 400px;
  height: 300px;
  position: relative;
`
export const CountWraper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2em;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`
export const CountBox = styled.div`
  @media (max-width: 800px) {
    margin-bottom: 20px;
    font-size: 0.7em;
  }
`
