import React, { Component } from 'react'
import PropTypes from 'prop-types'
import browser from 'bowser';
import ReactTooltip from 'react-tooltip'
import LocalizedStrings from 'react-localization';
import PhoneWhite from '../../../../static/images/icn_conf_live.png'
import PhoneBlue from '../../../../static/images/icn_conf_live_primary.png'
import pinCode from '../../../constants/PinCode'

let strings = new LocalizedStrings({
 en:{
    pincode: "Call-in",
    pinCodeExplanations: "Call this number below and provide the conference pin code to join the conference via PSTN."
 },
 fr: {
    pincode: "Call-in",
    pinCodeExplanations: "Appelez un numéro ci-dessous et renseignez le code de la conference pour rejoindre la conference via RTCP."
 }
});

class TogglePSTN extends Component {
    constructor(props) {
        super(props)
        this.state = {
          opened: false,
          hover: false
        }
        this.togglePopUp = this.togglePopUp.bind(this)
        this.toggleClosePopUp = this.toggleClosePopUp.bind(this)
        this.togglePinCode = this.togglePinCode.bind(this)
    }

    togglePinCode(type) {
      this.props.toggle(type)
      this.setState({ opened: !this.state.opened })
    }

    togglePopUp() {
      this.setState({ opened: !this.state.opened })
    }

    toggleClosePopUp() {
        this.setState({ opened: !this.state.opened, hover: false })
    }

    country2emoji(country_code) {
        var OFFSET = 127397;
        var cc = country_code.toUpperCase();
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                    arr2[i] = arr[i];
                }
                return arr2;
            } else {
                return Array.from(arr);
            }
        }
        return /^[A-Z]{2}$/.test(cc) ? String.fromCodePoint.apply(String, _toConsumableArray([].concat(_toConsumableArray(cc)).map(function (c) {
            return c.charCodeAt() + OFFSET;
        }))) : null;
    }

    render() {
        const { toggle, tooltipPlace, isBottomBar, conferencePincode } = this.props
        const { hover, opened } = this.state
        return (
            <li id="pincode-container" className={opened ? 'active' : ''}
                onMouseEnter={() => this.setState({hover: true})}
                onMouseLeave={() => this.setState({hover: false})}>
                <a data-tip data-for="toggle-pincode"
                    className={'' + (opened ? 'on' : 'off')}
                    title={strings.screenshare}
                    onClick={() => this.togglePopUp()}>
                    <img src={(hover || opened) ? PhoneBlue : PhoneWhite} />
                    { isBottomBar &&
                      <div><span>{strings.pincode}</span></div>
                    }
                </a>
                { opened &&
                  <div className="bubble-tip">
                    <a className="icon-close" title="Close" currentitem="false" onClick={() => this.toggleClosePopUp()}></a>
                    <span className="title">{strings.pincode}</span>

                    <div>
                        <p><span className="pincode">{conferencePincode}</span></p>
                        <p>{strings.pinCodeExplanations}</p>
                        <select>
                            { pinCode.map((code, i) => {
                                return(<option key={i}>
                                    {this.country2emoji(code.Code)} {code.Number}
                                </option>)
                            })
                            }
                        </select>
                    </div>


                    <div className="anchor-popup">
                    </div>
                  </div>
                }
                { !isBottomBar &&
                  <ReactTooltip id="toggle-pincode" place={tooltipPlace} effect="solid" className="tooltip">{strings.pincode}</ReactTooltip>
                }
            </li>
        )
    }
}

TogglePSTN.propTypes = {
    conferencePincode: PropTypes.string.isRequired,
    tooltipPlace: PropTypes.string.isRequired,
    isBottomBar: PropTypes.bool.isRequired
};

TogglePSTN.defaultProps = {
    tooltipPlace: "right"
};

export default TogglePSTN
