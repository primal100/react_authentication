import React from 'react';
import { Field, } from 'react-final-form';
import Typography from './Typography';
import AppForm from '../views/AppForm';
import { required, passwords_match } from '../form/validation';
import RFTextField from '../form/RFTextField';
import AjaxForm from '../form/AjaxForm';


const changePasswordUrl = process.env.REACT_APP_CHANGE_PASSWORD_URL


class ChangePassword extends React.Component {

    validate = (values) => {
      const errors = required(['old_password', 'password', 'password_confirm'], values);

      if (!errors.password_confirm) {
          const passwordConfirmError = passwords_match(values.password, values.password_confirm);
        if (passwordConfirmError) {
            errors.password_confirm = passwordConfirmError;
          }
      }

      return errors;
    };

    render() {
      const redirect = {
          pathname: "/profile",
      }
      return (
          <React.Fragment>
            <AppForm>
              <React.Fragment>
                <Typography variant="h3" gutterBottom marked="center" align="center">
                  Change Password
                </Typography>
              </React.Fragment>
              <AjaxForm url={changePasswordUrl} method="POST" redirectTo={redirect} showSuccessMessage
                      validate={this.validate} buttonText="Change Password"
              analyticsEventArgs={{category: 'User', action:'Change password'}}>
                      <Field
                          autoFocus
                          fullWidth
                          component={RFTextField}
                          required
                          name="old_password"
                          autoComplete="current-password"
                          label="Current Password"
                          type="password"
                          margin="normal"
                      />
                      <Field
                          fullWidth
                          component={RFTextField}
                          required
                          name="password"
                          autoComplete="new-password"
                          label="New Password"
                          type="password"
                          margin="normal"
                      />
                      <Field
                          fullWidth
                          component={RFTextField}
                          required
                          name="password_confirm"
                          autoComplete="new-password"
                          label="Confirm New Password"
                          type="password"
                          margin="normal"
                      />
              </AjaxForm>
            </AppForm>
          </React.Fragment>
      );
    }
}

export default ChangePassword;