import React from "react";
import {SnackbarProvider} from "notistack";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";


const autoHideDurationSeconds = process.env.REACT_APP_AUTO_HIDE_DURATION_SECONDS || 5;
const transitionExitDurationSeconds = process.env.REACT_APP_TRANSITION_EXIT_DURATION_SECONDS || 0;
const anchorOrigin = {horizontal: process.env.REACT_APP_ANCHOR_ORIGIN_HORIZONTAL || 'center',
    vertical: process.env.REACT_APP_ANCHOR_ORIGIN_VERTICAL || 'top'}
const maxAlerts = parseInt(process.env.REACT_APP_MAX_ALERTS || 1)
const snackbarClasses = {
            variantSuccess: 'success-message',
            variantError: 'error-message',
            variantWarning: 'warning-message',
            variantInfo: 'info-message'
}


export class CustomSnackbarProvider extends React.Component {
    snackbarRef = React.createRef();

    onClickDismiss = key => () => {
        this.snackbarRef.current.closeSnackbar(key);
    }

    render(){
        return (
            <SnackbarProvider maxSnack={maxAlerts} autoHideDuration={autoHideDurationSeconds * 1000}
                              anchorOrigin={anchorOrigin}
                              transitionDuration = {{enter: 0, exit: transitionExitDurationSeconds * 1000}}
                              TransitionComponent={Fade} classes={snackbarClasses} ref={this.snackbarRef}
                action={(key) => (
                    <IconButton onClick={this.onClickDismiss(key)}>
                        <CloseIcon/>
                    </IconButton>
                )}>
                {this.props.children}
            </SnackbarProvider>
        )
    }
}