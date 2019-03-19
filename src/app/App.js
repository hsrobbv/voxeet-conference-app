import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import logo from '../static/images/logo.svg';
import '../styles/App.css';
import Sdk from './sdk'
import VoxeetConference from './VoxeetConference'
import VoxeetSdk from '@voxeet/voxeet-web-sdk'
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
 en:{
   join:"Join call",
   name:"Your Name",
   admin:"Admin",
   conferencename:"Your conference name",
   electronmessage:"Voxeet is loading, please wait",
   copyright:" All rights reserved"
 },
 fr: {
   join:"Rejoindre la conférence",
   name:"Nom",
   admin:"Administrateur",
   conferencename:"Nom de la conférence",
   electronmessage:"Le client Voxeet va démarrer, veuillez patienter",
   copyright:"Tous droits réservés"
 }
});

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        isSubmit: false,
        isListener: false,
        isJoiningFromUrl: false,
        form : {
          conferenceName: "",
          userName: ""
        }
      }
      this.handleClick = this.handleClick.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.escFunction = this.escFunction.bind(this)
      this.toggleChangeListener = this.toggleChangeListener.bind(this)
  }

  componentWillMount() {
    const { conferenceName } = this.props.match.params
    var url_string = window.location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get("name");
    if (conferenceName) {
      if (c != null) {
        this.setState({ isSubmit: true, form :{ conferenceName: conferenceName, userName: c}})
      } else {
        this.setState({ isJoiningFromUrl: true, form :{ conferenceName: conferenceName}})
      }
    }
  }

  escFunction(event){
      if(event.keyCode === 13 && !this.state.isSubmit) {
          this.handleClick()
      }
    }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  handleChange(e) {
    const { form } = this.state;
    form[e.target.name] = e.target.value;
    this.setState({ form });
  }

  handleOnLeave() {
    this.setState({ isSubmit: false })
  }

  toggleChangeListener() {
    this.setState({
      isListener: !this.state.isListener,
    });
  }

  handleClick() {
    this.props.history.push('/' + this.state.form.conferenceName)
    this.setState({ isJoiningFromUrl: false, isSubmit: true})
    this.props.handleJoin();
  }

  handleClickDemo() {
    const sdk = Sdk.create()
    this.setState({ sdk: sdk, isDemo: true, isSubmit: true})
    this.props.handleJoin();
  }

  render() {
    if (this.state.isSubmit) {
        const photoURL = "https://gravatar.com/avatar/" + Math.floor(Math.random() * 1000000) + "?s=200&d=identicon"
        return (
          <div>
            <div>
              <div className="electron-message-container">
                <div className="electron-center-container">
                  <div className="electron-logo-container">
                    <img src={logo} />
                  </div>
                  <div id="loader-container"><div className="loader"></div></div>
                  <div className="electron-info-container">
                    {strings.electronmessage}<span className="one">.</span><span className="two">.</span><span className="three">.</span>​
                  </div>
                </div>
              </div>
            </div>
            <VoxeetConference isListener={this.state.isListener} handleOnLeave={this.handleOnLeave.bind(this)} userName={this.state.form.userName} photoURL={photoURL} conferenceName={this.state.form.conferenceName} />
          </div>
        )
    }

    return (
      <div>
        <div className="content-sample">
          <div className="logo">
            <img src={logo} className="voxeet-logo" alt="logo" />
            <h1>voxeet</h1>
          </div>
          { !this.state.isJoiningFromUrl &&
          <div className="input-field">
            <input name="conferenceName" placeholder={strings.conferencename} value={this.state.form.conferenceName} onChange={this.handleChange} id="conferenceName" type="text" className="validate" />
          </div>
          }
          <div className="input-field">
            <input name="userName" placeholder={strings.name} value={this.state.form.userName} onChange={this.handleChange} id="userName" type="text" className="validate" />
          </div>

          <input type="checkbox" id="isListener" checked={this.state.isListener} onChange={this.toggleChangeListener} />
          <label id="isListenerLabel" htmlFor="isListener">Join as a listener</label>

          <div className="blockButton">
            <button id="join" disabled={ this.state.form.conferenceName.length == 0 ? true : false } className={ this.state.form.conferenceName.length == 0 ? "waves-effect waves-light disable" : "waves-effect waves-light" } onClick={this.handleClick}>
              <span>{strings.join}</span>
            </button>
          </div>
          <button className="button-demo" onClick={this.handleClickDemo.bind(this)}>
            <span>{strings.joinDemo}</span>
          </button>
        </div>
        <div className="copyright">
          Voxeet © 2018 {strings.copyright}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  handleJoin: PropTypes.func,
  handleLeave: PropTypes.func
}

App.defaultProps = {
  handleJoin: () => {},
  handleLeave: () => {}
}

const mapStateToProps = (state, ownProps) => {
  return {...state, conferenceName: ownProps.match.params.conferenceName}
}

export default App;
