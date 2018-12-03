import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from '@patternfly/react-core';

class Wizard extends Component {

    constructor () {
        super();
        this.state = {
            currentStep: 0
        };
        this.handlePreviousModalStep = this.handlePreviousModalStep.bind(this);
        this.handleNextModalStep = this.handleNextModalStep.bind(this);
        this.handleOnClose = this.handleOnClose.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    };

    handleNextModalStep() {
        this.setState(({ currentStep }) => ({
            currentStep: currentStep + 1
        }));
    }

    handlePreviousModalStep() {
        this.setState(({ currentStep }) => ({
            currentStep: currentStep - 1
        }));
    }

    // On modal close, reset currentStep back to the initial step, the call modalToggle(PF)
    handleOnClose() {
        this.setState({ currentStep: 0 });
        console.log('Closed');
        this.props.handleOnClose && this.props.handleOnClose();
    }

    // On modal submit, reset currentStep back to the initial step, the call modalToggle(PF)
    handleOnSubmit() {
        this.setState({ currentStep: 0 });
        console.log('Submitted');
        this.props.handleOnSubmit && this.props.handleOnSubmit();
    }

    render() {

        const { isLarge, title, className, isOpen, handleOnClose, handleOnSubmit, ...props } = this.props;

        const renderModalActions =  [
            <Button key="cancel" variant="secondary" onClick={ this.handleOnClose }>
            Cancel
            </Button>,
            // Conditionally render 'previous' button if not on first page
            this.state.currentStep !== 0 &&
                <Button key="previous" variant="secondary" onClick={ this.handlePreviousModalStep }> Previous </Button>,
            // Conditionally render 'confirm' button if on last page
            this.state.currentStep < this.props.content.length - 1
                ? <Button key="continue" variant="primary" onClick={ this.handleNextModalStep }> Continue </Button>
                : <Button key="confirm" variant="primary" onClick={ this.handleOnSubmit }> Confirm </Button>
        ];

        return (
            <Modal
                { ...props }
                isLarge = { isLarge }
                title= { title }
                className= { className }
                isOpen={ isOpen }
                onClose={ this.handleOnClose }
                actions={ renderModalActions }>
                { this.props.content[this.state.currentStep] }
            </Modal>
        );
    }
}

Wizard.propTypes = {
    isLarge: PropTypes.bool,
    title: PropTypes.string,
    className: PropTypes.string,
    isOpen: PropTypes.any,
    onClose: PropTypes.any,
    onSubmit: PropTypes.any,
    content: PropTypes.array
};

export default Wizard;
