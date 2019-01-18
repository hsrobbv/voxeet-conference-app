import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import LocalizedStrings from 'react-localization';
import Hangup from '../../../../static/images/newicons/icon-hang-up.svg'

let strings = new LocalizedStrings({
 en:{
   leave:"End"
 },
 fr: {
   leave:"Quitter"
 }
});

class HangupButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { leave, tooltipPlace } = this.props
        return (
            <li data-tip data-for="end-call">
                <a onClick={() => leave()} className="hang-up-btn icon-phone-end-call" title={strings.leave}><img src={Hangup} />
                </a>
                <ReactTooltip id="end-call" place={tooltipPlace} effect="solid" className="tooltip">{strings.leave}</ReactTooltip>
            </li>
        )
    }
}

HangupButton.propTypes = {
    leave: PropTypes.func.isRequired,
    tooltipPlace: PropTypes.string.isRequired,
};

HangupButton.defaultProps = {
    tooltipPlace: "right"
};

export default HangupButton
