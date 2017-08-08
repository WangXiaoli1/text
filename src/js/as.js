import React, { Component } from 'react';
import $ from 'jquery';
class As extends Component {
  constructor(){
    super()
    this.state={
      da:{}
    }
  }
  componentDidMount(){
    $.ajax({
      url:"http://localhost:8000/news/news1",
      type:"post",
      data:{
      	id:this.props.match.params.id.split(":")[1]
      },
      success:function (e){
        // console.log(e)
        this.setState({
          da:e[0]
        })
      }.bind(this)
    })
  }
  render() {
  	return <div className="content">{this.state.da.content}</div>
  }
}
export default As