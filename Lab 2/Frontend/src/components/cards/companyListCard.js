import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';
import {fetchCompanies, filterStudent} from '../../actions/fetchAction'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class ComapnyListCard extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      studentData: [],
      searchText: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
}

handleChange = (e) => {
  const accessString = localStorage.getItem('JWT');
  if(!e.target.value){
    this.props.fetchStudent(accessString)
  }

  e.preventDefault()
  this.setState({
    searchText: e.target.value
  });
}

handleSearch=()=>{ 
      const{searchText} = this.state
      this.props.filterStudent(searchText, this.props.studentDetails)
}

componentDidMount(){
  const accessString = localStorage.getItem('JWT');
  if(accessString === null){
      this.setState({
          isLogin: false
      })
      console.log("token is null!");
  }
  this.props.fetchCompanies(accessString);
}

render(){

  var searchBar = (
    <div className ="row">
              <div className="ui fluid action input" style={{marginLeft: "1.5%", marginRight:"1.5%", width:"100%"}}>
                  <input type="text" placeholder="Search students" onChange={this.handleChange}/>
                  <div className="ui button" onClick={this.handleSearch}>Search</div> 
              </div>
      </div>
  )

const renderdata = this.props.companyList;
console.log('renderdata - ', renderdata)

  if(renderdata !== undefined){
    return(
      <div className="container">
       <br/>
          {searchBar}   
        <br/>
            <div className="row" style={{marginTop:"2%"}} >
            <div className="header" style={{marginLeft: "14px"}}>
                        <h2>Companies</h2>
              </div>
            <div className="ui items" style={{width:"100%"}}>
                    { renderdata.map( (item, index) =>
                    <div className="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "10px", margin:"15px", boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.10)"}}>
                        <img src={`${API_ENDPOINT}/${item.profileInfo.profile_pic}`} alt="" style={{width:"200px", height: "130px" }}/>
                        <div className="content" style={{padding: "10px 5px 5px 60px"}}>
                          <Link to={`/companyProfile?email=${item.email}`}>
                                  <div className="header" ><h4><b>{item.profileInfo.name}</b></h4></div>
                          </Link>
                          <div className="extra"><b>{item.profileInfo.location}</b></div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
  }else{
      return(
        <div className="container">
            <div className="row" style={{margin:"2%"}} >
                <div className="header">
                            <h2>Companies</h2>
                  </div>
                  <div>
                      <h3>No Data!</h3>
                  </div>
              </div>
          </div>
      )
  }
}
}

ComapnyListCard.propTypes = {
  companyList : PropTypes.array.isRequired,
  fetchCompanies : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  companyList : state.Handshake_User_Info.companyList
})

export default connect(mapStateToProps, {fetchCompanies, filterStudent})(ComapnyListCard)