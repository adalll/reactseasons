import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

    state = {
        lat : null,
        errorMessage: ''
    };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({lat: position.coords.latitude});
            },
            (err) => {
                this.setState({errorMessage: err.message});
            }
        );
    }

    renderContent = () => {
        if (this.state.errorMessage) {
            return <div>{this.state.errorMessage}</div>;
        }
        if (this.state.lat) {
            return <SeasonDisplay lat={this.state.lat}/>
        }
        return <Spinner message="Please allow to get your location!" />;
    };

    render(){
        return (
          <div>
              {this.renderContent()}
          </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));