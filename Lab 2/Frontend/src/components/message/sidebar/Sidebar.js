import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchStudent} from '../../../actions/fetchAction'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.setState({
            data: []
        });
    }

    componentDidMount(){
        const token = localStorage.getItem('JWT')
        console.log(token)
        this.props.fetchStudent(token)
    }
    
    render() {
        let renderdata = this.props.studentDetails
        const {handleClick} = this.props

        if(renderdata){
            return (
                    <div className="ui items" style={{width:"100%"}} >
                        { renderdata.map( (item, index) =>
                            <div className="item" id="cardHover" data-div_id={item.email} onClick={ handleClick }  style={{background: "white", padding: "10px", margin:"15px", boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.10)"}}>
                                <div className="content" style={{padding: "10px 5px 5px 60px"}}>
                                    <div className="header" ><h4><b>{item.name}</b></h4></div>
                                    <div className="extra"><b>{item.college}</b></div>
                                </div>
                            </div>
                        )}
                    </div>
            );
         }else{
             return(
                <div className="col-md-3" style={{padding:"10px"}}>
                    <div class="ui placeholder">
                        <div class="image header">
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                </div>
             )
         }
    }
}

Sidebar.propTypes = {
    fetchStudent : PropTypes.func.isRequired,
    studentDetails: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    studentDetails : state.Handshake_User_Info.studentDetails
})

export default connect(mapStateToProps,{fetchStudent})(Sidebar);