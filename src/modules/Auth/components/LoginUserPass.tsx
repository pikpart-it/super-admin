import React from "react";
import { FormInput } from "../../../components/Forms/Form";
import { validateEmail } from "../../../utility/func";
import { AuthFormButton, LoginWrapper } from "../styled";
import { RoutesPath } from "../../../config/routes.config";
import { Link } from "react-router-dom";

function LoginUserPass({
  setLoginForm,
  loading,
  loginForm,
  onSubmit,
  history,
}: any) {
  function resetError(target: any) {
    setLoginForm({
      ...loginForm,
      errors: { ...loginForm.errors, [target.name]: undefined },
    });
  }
  function onchange(target: any) {
    setLoginForm({
      ...loginForm,
      values: { ...loginForm.values, [target.name]: target.value },
    });
  }

  function onBlur({ target }: any) {
    if (["Email", "Password"].includes(target.name) && !target.value) {
      setLoginForm({
        ...loginForm,
        errors: { ...loginForm.errors, [target.name]: "Field Cannot be Empty" },
      });
    } else {
      if (target.name === "Email") {
        if (validateEmail(target.value)) {
          resetError(target);
        } else {
          setLoginForm({
            ...loginForm,
            errors: {
              ...loginForm.errors,
              [target.name]: "Invalid Email",
            },
          });
        }
      }
      if (target.name === "Password") {
        if (target.value.length > 7) {
          resetError(target);
        } else {
          setLoginForm({
            ...loginForm,
            errors: {
              ...loginForm.errors,
              [target.name]: "Required Min. 8 characters",
            },
          });
        }
      }
    }
  }
  const isSubmitDisabled =
    !loginForm.errors.Email && !loginForm.errors.Password;
  return (
    <LoginWrapper column alignItemsCenter>
      <AuthFormButton
        variant="primary"
        onClick={(e: any) => {
          e.preventDefault();
          history.push(RoutesPath.NewLoginPage);
        }}
        style={{ marginTop: 35 }}
      >
        Login using Mobile
      </AuthFormButton>
      <h5 style={{ margin: "20px 0px" }}>OR</h5>
      <FormInput
        label="Enter Your Email"
        type="email"
        placeholder="Enter Email"
        name="Email"
        onChange={onchange}
        onBlur={onBlur}
        value={loginForm.values["Email"]}
        fieldErrors={loginForm.errors}
      />
      <FormInput
        label="Enter Your Password"
        type="password"
        placeholder="Enter Password"
        name="Password"
        onChange={onchange}
        onBlur={onBlur}
        value={loginForm.values["Password"]}
        fieldErrors={loginForm.errors}
      />
      <AuthFormButton
        disabled={!isSubmitDisabled}
        isLoading={loading}
        variant="primary"
        style={{ marginTop: "10px" }}
        onClick={onSubmit}
      >
        Login
      </AuthFormButton>
      {/* <Link
        to={RoutesPath.ForgotPassword}
        style={{ marginTop: 5, textDecoration: 'none', color: '#000' }}>
        Forgot Password ? Click Here
      </Link> */}
    </LoginWrapper>
  );
}

export default LoginUserPass;
