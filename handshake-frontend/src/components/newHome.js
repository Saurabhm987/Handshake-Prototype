import React, {component} from 'react';
// import{Link, Route, Swith} from 'react-router-dom';

export default class newHome extends Component {
    constructor() {
        super();

        this.state = {
            message: 'Loading...'
        }
    }

    componentDidMount(){
        fetch('/newHome')
            .then(res => res.text())
            .then(res => this.setState({message: res}));
    }

    render() {
        return(
            <div>
                <h1>
                    Home
                </h1>
                <p>
                    {this.state.message}
                </p>
            </div>
        );
    }
}