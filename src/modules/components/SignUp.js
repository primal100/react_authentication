import React from 'react';
import { Field, } from 'react-final-form';
import Link from '@material-ui/core/Link';
import Typography from './Typography';
import AppForm from '../views/AppForm';
import { email, required, passwords_match } from '../form/validation';
import RFTextField from '../form/RFTextField';
import {Link as RouterLink} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import AjaxForm from '../form/AjaxForm';
import { Switches } from 'mui-rff'


const signUpUrl = process.env.REACT_APP_SIGN_UP_URL

class SignUp extends React.Component {

    validate = (values) => {
      const errors = required(['first_name', 'last_name', 'email', 'password', 'password_confirm'], values);

      if (!errors.email) {
        const emailError = email(values.email);
        if (emailError) {
            errors.email = emailError;
          }
      }

      if (!errors.password_confirm) {
          const passwordConfirmError = passwords_match(values.password, values.password_confirm);
        if (passwordConfirmError) {
            errors.password_confirm = passwordConfirmError;
          }
      }

      return errors;
    };

    render() {
      const successMessage = "We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link.\n" +
          "\n" +
          "If you do not receive a confirmation email, please check your spam folder. Also, please verify that you entered a valid email address in our sign-up form."
      const redirect = {
          pathname: "/",
      }
      this.mailingListSwitchData = [
            {label: 'Join Our Mailing List'}
      ];
      this.privacySwitchData = [
            {label: 'Accept Our Privacy Policy'}
      ];
      this.termsSwitchData = [
            {label: 'Accept Our Terms & Conditions'}
      ];
      const initialValues = {mailing_list: true}
      return (
          <React.Fragment>
            <AppForm>
              <React.Fragment>
                <Typography variant="h3" gutterBottom marked="center" align="center">
                  Sign Up
                </Typography>
                <Typography variant="body2" align="center">
                  <Link component={RouterLink} to="/sign-in" underline="always">
                    Already have an account?
                  </Link>
                </Typography>
              </React.Fragment>
              <AjaxForm formID="sign-up-form" url={signUpUrl} method="POST" redirectTo={redirect}
                        successMessage={successMessage} validate={this.validate} buttonText="Sign Up"
                        initialValues={initialValues} noAuth analyticsEventArgs={{category: 'User', action: 'Sign Up'}}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Field
                              autoFocus
                              component={RFTextField}
                              autoComplete="fname"
                              fullWidth
                              label="First name"
                              name="first_name"
                              required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                              component={RFTextField}
                              autoComplete="lname"
                              fullWidth
                              label="Last name"
                              name="last_name"
                              required
                          />
                        </Grid>
                      </Grid>
                      <Field
                          autoComplete="email"
                          component={RFTextField}
                          fullWidth
                          label="Email"
                          margin="normal"
                          name="email"
                          required
                      />
                      <Field
                          fullWidth
                          component={RFTextField}
                          required
                          name="password"
                          autoComplete="new-password"
                          label="Password"
                          type="password"
                          margin="normal"
                      />
                      <Field
                          fullWidth
                          component={RFTextField}
                          required
                          name="password_confirm"
                          autoComplete="new-password"
                          label="Confirm Password"
                          type="password"
                          margin="normal"
                      />
                      <Grid item xs={12} sm={6}>
                      <Switches
                          color="secondary"
                          name="mailing_list"
                          required
                          data={this.mailingListSwitchData}
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <Switches
                          color="secondary"
                          name="privacy"
                          required
                          data={this.privacySwitchData}
                      />
                      </Grid>
                  <Typography variant="body1" paragraph>
                      <Link component={RouterLink} to="privacy" target="_blank">
                          Click here to view our privacy policy
                       </Link>
                  </Typography>
                      <Grid item xs={12} sm={6}>
                      <Switches
                          color="secondary"
                          name="terms"
                          required
                          data={this.termsSwitchData}
                      />
                      </Grid>
                  <Typography variant="body1" paragraph>
                  <Link component={RouterLink} to="terms" target="_blank">
                      Click here to view our terms & conditions
                  </Link>
                  </Typography>
              </AjaxForm>
            </AppForm>
          </React.Fragment>
      );
    }
}

export default SignUp;