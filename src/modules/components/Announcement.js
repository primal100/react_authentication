import React from "react";
import { withSnackbar } from 'notistack';
import {AjaxRequest} from "../../index";


const announcementDuration = (parseInt(process.env.REACT_APP_ANNOUNCEMENT_DURATION) || 10) * 1000;
const announcementsCheckInterval = (parseInt(process.env.REACT_APP_ANNOUNCEMENT_CHECK_INTERVAL) || 1800) * 1000;
const announcementsUrl = process.env.REACT_APP_ANNOUNCEMENT_URL;


class Announcement extends React.Component {

    componentDidMount() {
        if (this.props.msg) this.showMessage(this.props.msg);
    }

    showMessage = (msg) => {
        let snackbarOptions = this.props.snackbarOptions || {};
        snackbarOptions = {variant: 'info', autoHideDuration: announcementDuration, ...snackbarOptions}
        this.props.enqueueSnackbar(msg, snackbarOptions);
    }

    showMessageFromResponseIfNotAlreadySeen = (response) => {
        if (response && response.length > 0){
            const announcement = response[0];
            const lastAnnouncement = parseInt(localStorage.getItem('announcementId'));
            if (lastAnnouncement !== announcement.id) {
                this.showMessage(announcement.text);
                localStorage.setItem('announcementId', announcement.id);
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {announcementsUrl && <AjaxRequest url={announcementsUrl} method="GET" runAtInterval={announcementsCheckInterval}
                       onSuccess={this.showMessageFromResponseIfNotAlreadySeen} noImmediateRequest={Boolean(this.props.msg)}
                analyticsEventArgs={{category: 'Announcements', action:'Getting announcement', label:'PageLoad',
                    nonInteraction: true}} />}
            </React.Fragment>
            )
    }

}




export default withSnackbar(Announcement);