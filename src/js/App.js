import React, { Component } from 'react';
import '../css/App.css';
import '../css/as.css';
import As from './as'
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class App extends Component {
    constructor(){
        super()
        this.state={
            arr:[{"id":"","title":"","content":""}],
            arr1:[{"id":"","title":"","content":""}],
            uid:"",


        }
    }
    componentDidMount(){
        $.ajax({
            url:"http://localhost:8000/news",
            type:"post",
            success:function (e){
                console.log(e)
                this.setState({
                    arr1:e
                })
            }.bind(this)
        })
    }
    //修改
    updateTitle=function(event) {
        $(".updateBox").css("display", "block");
        var aa = event.target;
        var id = aa.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            uid: id,
        })
    }.bind(this);
    ok(){
        $(".updateBox").css("display", "none");
        var title = $(".updateBox input:nth-of-type(1)").val();
        var content = $(".updateBox input:nth-of-type(2)").val();
        if (title == "" || content == "") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: "http://192.168.43.5:8000/news/upNews",
                data: {
                    id: this.state.uid,
                    title: title,
                    content:content
                },
                success: (e)=> {
                    this.setState({
                        arr: e,

                    })
                    console.log(e)
                },
                error: function () {
                    console.log("失败")
                }
            });
        }
    }

    //删除
    delTitle=function (e) {
        console.log(e);
        var ev = e || window.event;
        var target = ev.target || ev.srcElement;
        var id = target.parentNode.parentNode.children[0].innerHTML;
        $.ajax({
            type: "post",
            url: "http://192.168.43.5:8000/news/delNews",
            data: {id: id},
            success: function (e) {
                this.setState({
                    arr: e
                })
            }.bind(this),
            error: function () {
                console.log("删除失败")
            }
        });
    }


    render() {
        return (
            <Router>
                <div className="App">
                    <Link to="/"></Link>
                    <ul className="list">
                        <li>id</li>
                        <li>title</li>
                        <li>content</li>
                    </ul>

                    <Route exact path='/' render={() => (
                        <ul className="news">
                            {
                                this.state.arr1.map((v,i)=>{
                                    return <div>
                                        <li>{v.id}</li>
                                        <Link key={i} to={`/as:${v.id}`}><li>{v.title}</li></Link>
                                        <li>{v.content}</li>
                                        <li><button onClick={this.updateTitle}>修改</button></li>
                                        <li><button onClick={this.delTitle.bind(this)}>删除</button></li>
                                        </div>
                                })
                            }
                        </ul>
                    )} />
                    <div className="updateBox">
                        <input type="text" placeholder="title"/>
                        <input type="text" placeholder="content"/>
                        <button id="ok" onClick={this.ok.bind(this)}>确定</button>
                    </div>

                    <Route path="/:id" component={As} />
                </div>
            </Router>
        );
    }
}

export default App;

