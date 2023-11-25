"use client";
import Box from "@mui/material/Box/Box";
import { EmailInputField } from "../../components/EmailInput";
import { PasswordInputField } from "../../components/PasswordInput";
import { SubmitButton } from "../../components/SubmitButton";
import Paper from "@mui/material/Paper/Paper";
import Container from "@mui/material/Container/Container";
import { SignInAvatar } from "../../components/SignInAvatar";
import { FormTitle } from "../../components/FormTitle";
import { FormEventHandler } from "react";
import { SignInOptions } from "../../components/SignInOptions";
import { FormErrorText } from "../../components/FormErrorText";

export const SignInForm = ({
  handleSubmit,
  isFailedSubmit,
  isDisabled,
}: {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  isFailedSubmit: boolean;
  isDisabled: boolean;
}) => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <div className="p-4 flex flex-col items-center">
          <SignInAvatar />
          <FormTitle title="Sign in" />
          <Box component={"form"} onSubmit={handleSubmit}>
            {isFailedSubmit && (
              <FormErrorText errorText="Incorrect Email or Password" />
            )}
            <EmailInputField  isError={isFailedSubmit}/>
            <PasswordInputField isError={isFailedSubmit} />
            <SignInOptions />
            <SubmitButton
              buttonText={"Sign in"}
              isSubmitButtonDisabled={isDisabled}
            />
          </Box>
        </div>
      </Paper>
    </Container>
  );
};
