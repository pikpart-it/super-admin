import styled from 'styled-components'
import { FlexDiv } from '../../style/styled'
import { Span } from '../../components/styled'

export const Heading = styled(Span)`
  text-align: left;
  font-size: 16px;
  padding-bottom: 5px;
  font-weight: 600;
  &::after {
    width: 30px;
    margin-top: 4px;
    display: block;
    content: '';
    height: 1px;
    background-color: #e95330;
  }
`
// color: ${(props: any) => props.theme.colors.secondary};
export const Description = styled.p`
  padding-top: 3px;
  text-align: left;
  padding-bottom: 20px;
  span {
    display: block;
    font-size: 14px;
    letter-spacing: 0.3px;
    padding-bottom: 12px;
    text-align: justify;
  }
`

export const FooterDescription = styled.p`
  text-align: left;
  span {
    display: block;
    font-size: 14px;
    letter-spacing: 0.3px;
    padding-bottom: 8px;
    text-align: justify;
  }
`

export const AmcCard = styled(FlexDiv)`
  padding: 15px 2vmax;
  align-items: flex-start;
  box-shadow: 0px 3px 2px #aab2bd;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  margin-bottom: 20px;
  transition: 0.6s ease;
  border: 1px solid #ccc;
  &:hover {
    transition: 0.8s ease;
    transform: scale(1.02);
    box-shadow: 0px 3px 5px #aab2bd;
  }
`

export const AMCDetails: any = styled(FlexDiv)`
  width: calc(100% - 150px - 2vw);
  > span {
    width: 50%;
    @media (min-width: 1920px) {
      width: 20%;
    }
    @media (max-width: 1920px) {
      width: 25%;
    }
    @media (max-width: 1440px) {
      width: 33%;
    }
    @media (max-width: 1200px) {
      width: 50%;
    }
    @media (max-width: 540px) {
      width: 100%;
    }
  }
  @media (max-width: 786px) {
    width: 100%;
  }
`

export const ProductGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-gap: 10px;
  justify-content: space-between;
  @media (max-width: 786px) {
    grid-template-columns: repeat(auto-fill, 220px);
  }
  @media (max-width: 540px) {
    grid-template-columns: repeat(auto-fill, 100%);
  }
`
export const ProductCard = styled(FlexDiv)`
  cursor: pointer;
  flex-direction: column;
  margin: 10px;
  width: auto;
  align-items: center;
  padding: 10px;
  transition: 0.4s ease;
  &:hover {
    transition: 0.6s ease;
    box-shadow: 0px 3px 2px #aab2bd;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  img {
    margin: 40px 0;
    width: auto;
    height: 150px;
  }
`
export const ImageCol = styled(FlexDiv)`
  display: flex;
  // flex-direction: column;
  flex-wrap: wrap;
  width: 23%;
  margin: 1%;
  @media (max-width: 786px) {
    width: 50%;
  }
  @media (max-width: 540px) {
    width: 100%;
  }
`
export const ImageContainer = styled(FlexDiv)`
  display: flex;
  flex-wrap: wrap;
  margin: 1%;
`

export const ProductImage = styled(FlexDiv)`
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 30px;
  }
`
export const ProductDetailsWithPic = styled.div`
  width: 50%;
  margin: 40px 0px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const CareerCard = styled.div`
  margin: 20px 0px;
  box-shadow: 0px 3px 2px #aab2bd;
  border-radius: 8px;
  padding: 0px 20px;
  cursor: pointer;
  word-break: break-all;
  border: 1px solid #ccc;
`
export const FranchiseDescription = styled.p`
  padding-top: 3px;
  font-size: 12px;
  text-align: left;
  padding-bottom: 20px;
  span {
    font-size: 14px;
  }
`
export const FranchiseForm = styled(FlexDiv)`
  flex-direction: column;
  margin-left: 15px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 50px;
  }
  @media (max-width: 540px) {
    margin-bottom: 50px;
  }
`
export const FranchiseWithUsContainer = styled(FlexDiv)`
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`

export const FranchiseWithUsStyle = styled(FlexDiv)`
  flex-direction: column;
  margin-right: 15px;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`
