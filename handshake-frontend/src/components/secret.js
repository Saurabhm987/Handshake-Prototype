import React, {component} from 'react';
// import{Link, Route, Swith} from 'react-router-dom';

export default class secret extends Component {
    constructor() {
        super();

        this.state = {
            message: 'Loading...'
        }
    }

    componentDidMount(){
        fetch('/secret')
            .then(res => res.text())
            .then(res => this.setState({message: res}));
    }

    render() {
        return(
            <div>
                <h1>
                    Secret
                </h1>
                <p>
                    {this.state.message}
                </p>
            </div>
        );
    }
}