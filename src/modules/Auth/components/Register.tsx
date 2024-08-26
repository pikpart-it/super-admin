import React from 'react'
import { FormInput, MyFormSelect } from '../../../components/Forms/Form'
import { registerTypeOptions } from '../../../config/constants/register'
import { validateEmail } from '../../../utility/func'
import { sendOTP } from '../service'
import { RegisterWrapper, AuthFormButton } from '../styled'
import { TLoadingFormElement } from '../types'
import styled from 'styled-components'
import { FlexDiv } from '../../../style/styled'
import { Link } from 'react-router-dom'
import { Span } from '../../../components/styled'

interface IRegistrationForm {
  formLoading: TLoadingFormElement
}

// const [formLoading, setFormLoading] = React.useState<TLoadingFormElement>('')
// const [showOTP, setShowOTP] = React.useState<boolean>(false)
// const [session, setSession] = React.useState<string>('')
// const [resendOTP, setResendOTP] = React.useState<boolean>(false)

const RegisterType = styled.div`
  @media (max-width: 540px) {
    display: none;
  }
  display: none;
`

function RegisterForm({
  submitOTP,
  otpStatus,
  formLoading,
  doesPhoneExists,
  doesEmailExists,
  registrationState,
  customerRegistration,
  setRegistrationState,
  resetRegistrationForm,
}: any) {
  function onchange(target: any) {
    if (target.name === 'Mobile' && target.value.length === 10) {
      sendOTP({
        // setLoading: setFormLoading,
        // onSuccess: (response: any) => {
        //   setSession(response.data.Details)
        //   setResendOTP(true)
        //   setShowOTP(true)
        // },
      })
    }

    if (target.name === 'OTP' && target.value.length === 6) {
      submitOTP(target.value)
    }
    setRegistrationState({
      ...registrationState,
      values: { ...registrationState.values, [target.name]: target.value },
    })
  }

  function resetError(target: any) {
    setRegistrationState({
      ...registrationState,
      errors: { ...registrationState.errors, [target.name]: undefined },
    })
  }

  function onBlur({ target }: any) {
    if (
      ['Email', 'Fname', 'Lname', 'Phone', 'Password', 'ConfirmPassword'].includes(target.name) &&
      !target.value
    ) {
      setRegistrationState({
        ...registrationState,
        errors: { ...registrationState.errors, [target.name]: '*Field Cannot be Empty' },
      })
    } else {
      if (target.name === 'Phone') {
        if (target.value.length === 10) {
          resetError(target)
          doesPhoneExists(target.value)
        } else {
          setRegistrationState({
            ...registrationState,
            errors: {
              ...registrationState.errors,
              [target.name]: 'Phone number must be of 10 digit',
            },
          })
        }
      }
      if (target.name === 'Email') {
        if (target.value.length > 4 && validateEmail(target.value)) {
          resetError(target)
        } else {
          setRegistrationState({
            ...registrationState,
            errors: { ...registrationState.errors, [target.name]: 'Invalid Email' },
          })
        }
      }
      if (target.name === 'Password') {
        if (target.value.length > 7) {
          resetError(target)
        } else {
          setRegistrationState({
            ...registrationState,
            errors: {
              ...registrationState.errors,
              [target.name]: 'Required Min. 8 characters',
            },
          })
        }
      }
      if (target.name === 'ConfirmPassword') {
        if (target.value === registrationState.values['Password']) {
          resetError(target)
        } else {
          setRegistrationState({
            ...registrationState,
            errors: {
              ...registrationState.errors,
              [target.name]: 'Password not match',
            },
          })
        }
      }
    }
  }

  const Wrapper = styled(FlexDiv)`
    padding: 20px 30px;
    border-radius: 5px;
    box-shadow: 0px 0px 2px 1px #ccc;
    background: #fff;
    @media (min-width: 540px) {
      padding: 20px 60px;
    }
  `

  const isSubmitEnabled =
    registrationState.values.Fname &&
    registrationState.values.Lname &&
    registrationState.values.Phone &&
    registrationState.values.Email &&
    registrationState.values.Password &&
    registrationState.values.ConfirmPassword === registrationState.values.Password &&
    registrationState.values.Password.length > 7 &&
    registrationState.values.Phone.length === 10

  return (
    <RegisterWrapper column>
      <Wrapper column>
        <h3 style={{ textAlign: 'center', fontWeight: 800, margin: '10px' }}>Register</h3>
        <FormInput
          label="Enter Name"
          type="text"
          placeholder="Enter Name"
          name="Fname"
          onChange={onchange}
          onBlur={onBlur}
          value={registrationState.values['Fname']}
          fieldErrors={registrationState.errors}
        />
        <FormInput
          label="Enter Name"
          type="text"
          placeholder="Last Name"
          name="Lname"
          onChange={onchange}
          onBlur={onBlur}
          value={registrationState.values['Lname']}
          fieldErrors={registrationState.errors}
        />
        <RegisterType>
          <MyFormSelect
            list={[]}
            options={registerTypeOptions}
            name="RegisterType"
            label="Register Type"
            onChange={onchange}
            onBlur={onBlur}
            value={registrationState.values['RegisterType']}
            fieldErrors={registrationState.errors}
          />
        </RegisterType>

        <FormInput
          label="Enter No."
          type="number"
          placeholder="Phone Number"
          isLoading={formLoading === 'Phone'}
          name="Phone"
          onChange={onchange}
          onBlur={onBlur}
          // label="Enter Name"
          value={registrationState.values['Phone']}
          fieldErrors={registrationState.errors}
        />
        {registrationState.values?.Phone?.length === 10 ? (
          <FormInput
            label="Submit OTP*"
            type="number"
            placeholder="OTP"
            name="OTP"
            isLoading={formLoading === 'OTP'}
            onChange={onchange}
            onBlur={onBlur}
            value={registrationState.values['OTP']}
            fieldErrors={registrationState.errors}
          />
        ) : null}
        {otpStatus ? (
          <>
            <FormInput
              label="Enter Your Email*"
              type="email"
              placeholder="Email"
              name="Email"
              isLoading={formLoading === 'Email'}
              onChange={onchange}
              onBlur={onBlur}
              value={registrationState.values['Email']}
              fieldErrors={registrationState.errors}
            />
            <FormInput
              label="Enter Your Password*"
              type="password"
              placeholder="Password"
              name="Password"
              onChange={onchange}
              onBlur={onBlur}
              value={registrationState.values['Password']}
              fieldErrors={registrationState.errors}
            />
            <FormInput
              label="Confirm Your Password*"
              type="password"
              placeholder="Password"
              name="ConfirmPassword"
              onChange={onchange}
              onBlur={onBlur}
              value={registrationState.values['ConfirmPassword']}
              fieldErrors={registrationState.errors}
            />
            <FlexDiv justifyContentFlexEnd>
              <Span style={{ color: '#e95210' }} onClick={resetRegistrationForm}>
                Reset
              </Span>
            </FlexDiv>
            <AuthFormButton
              variant="primary"
              style={{
                marginTop: 20,
                background: '#e95210',
                color: '#fff',
                borderRadius: 20,
                fontWeight: 600,
              }}
              disabled={!isSubmitEnabled}
              onClick={() => {
                customerRegistration()
              }}>
              Register
            </AuthFormButton>
          </>
        ) : null}

        <FlexDiv justifyContentCenter>
          <Link
            to="/login"
            style={{
              margin: '10px auto',
              color: '#e95210',
              fontWeight: 600,
              textDecoration: 'none',
            }}>
            LOGIN
          </Link>
        </FlexDiv>
      </Wrapper>
    </RegisterWrapper>
  )
}

export default RegisterForm
