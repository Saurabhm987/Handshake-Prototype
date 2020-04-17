import React, { Component } from 'react';
import {connect} from 'react-redux';
import {API_ENDPOINT} from '../../controller/endpoint'
import {fetchStudent, fetchCompanies} from '../../../actions/fetchAction'
import PropTypes from 'prop-types'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.setState({
            data: []
        });
        // const scoll ={
        //         margin:'6px, 6px',
        //         padding:'6px',
        //         width: '500px',
        //         height: '70%' ,
        //         'overflow-x': 'hidden',
        //         'overflow-x': 'auto', 
        //         'text-align':'justify' 
        // }
    }

    componentDidMount(){
        const token = localStorage.getItem('JWT')
        console.log(token)
        this.props.fetchStudent(token)
        this.props.fetchCompanies(token)
    }
    
    render() {
        let renderdata = this.props.studentDetails
        let companyData = this.props.companyList
        const {handleClick} = this.props

        if(renderdata){
            return (
                    <div className="ui items"  style={{width:"100%"}} >
                        { renderdata.map( (item, index) =>
                            <div className="item" id="cardHover" data-div_id={item.email} onClick={ handleClick }  style={{background: "white", padding: "10px", margin:"15px", boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.10)"}}>
                                <img src={`${API_ENDPOINT}/${item.profileInfo.profile_pic}`} style={{width:"120px", height: "66px" }}/>
                                <div className="content" style={{padding: "10px 5px 5px 60px"}}>
                                    <div className="header" ><h4><b>{item.name}</b></h4></div>
                                    <div className="extra"><b>{item.college}</b></div>
                                </div>
                            </div>
                        )}
                        {
                            companyData.map( (list, index) =>
                                <div className="item" id="cardHover" data-div_id={list.email} onClick={ handleClick }  style={{background: "white", padding: "10px", margin:"15px", boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.10)"}}>
                                    <img src={`${API_ENDPOINT}/${list.profileInfo.profile_pic}`} style={{width:"120px", height: "66px" }}/>
                                    <div className="content" style={{padding: "10px 5px 5px 60px"}}>
                                        <div className="header" ><h4><b>{list.profileInfo.name}</b></h4></div>
                                        <div className="extra"><b>{list.profileInfo.location}</b></div>
                                    </div>
                                </div>
                            )
                        }
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
    studentDetails: PropTypes.array.isRequired,
    companyList: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    studentDetails : state.Handshake_User_Info.studentDetails,
    companyList: state.Handshake_User_Info.companyList,
})

export default connect(mapStateToProps,{fetchStudent, fetchCompanies})(Sidebar);