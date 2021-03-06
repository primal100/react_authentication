import React from 'react';
import { Field } from 'react-final-form';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import { InputAdornment } from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";
import useStyles from "./styles";


class EditableField extends React.Component {
    state = {
        disabled: true
    }

    handleClick = async (event) => {
        this.setState({disabled:false});
    }

    handleChange = async (event) => {
        this.setState({disabled:true});
        event.target.form.dispatchEvent(new Event('submit', { cancelable: true }))
    }

    handleKeyDown = async(event) => {
         if(event.keyCode === 13){
             await this.handleChange(event)
         }
    }

    render() {
        const { classes, ...fieldProps } = this.props;
        return (
            <Field
                 onBlur={this.handleChange}
                 onKeyDown={this.handleKeyDown}
                 disabled={this.state.disabled}
                 {...fieldProps}
                 InputProps={{
                       endAdornment:
                           <InputAdornment position="end" >
                                   <IconButton id={`enable-${fieldProps.name}`} onClick={this.handleClick}>
                                       <EditIcon/>
                                   </IconButton>
                           </InputAdornment>
                       }}
                 />
        )
    }
}


export default withStyles(useStyles)(EditableField);