import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {tasks: [], text: ''};
        if (localStorage.tasks) {
            this.state.tasks = JSON.parse(localStorage.tasks);
        }
        localStorage.activeNum = ' ';
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    render() {
        return (
            <div id="tasks">
                <div id="title">
                    <h2>Items</h2>
                    <form id="input" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Type name here..."
                               value={this.state.text}
                               onChange={this.handleChange}/>
                        <button className='addButton'>Add new</button>
                    </form>
                    <div id="taskList">
                        <ul>
                            {localStorage.tasks && JSON.parse(localStorage.tasks).map(task => (
                                <li><a className="taskButton" onClick={this.handleClick} id={task.id+1} name={task.text}>{task.text}
                                    <button className='counter'> {localStorage[task.text] ? JSON.parse(localStorage[task.text]).length : '0'}</button>
                                    <button className="deleteButton" id={task.id} onClick={this.handleDelete} value={task.text}>Delete</button></a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    handleDelete(e){
        localStorage.removeItem(e.target.value);
        const arr = JSON.parse(localStorage.tasks);
        for(let i=0;i<arr.length;i++)
            if(arr[i].text===e.target.value)
                arr.splice(i,1);
        localStorage.tasks = JSON.stringify(arr);
        this.state.tasks = arr;
    }

    handleClick(e){
        localStorage.active = e.target.name;
        localStorage.activeNum = e.target.id;
    }

    handleChange(e) {
        this.setState({text: e.target.value});

    }

    componentDidUpdate(){
        localStorage.tasks = JSON.stringify(this.state.tasks);
    }

    handleSubmit(e) {

        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }

        const newTask = {
            text: this.state.text,
            id: this.state.tasks.length
        };
        this.setState(prevState => ({
            tasks: prevState.tasks.concat(newTask),
            text: ''
        }));
    }
}



class Comments extends Component{
    constructor(props) {
        super(props);
        this.state = {comments: [], text: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    render(){
        return(
            <div id="comments">
                <div id="title">
                    <h2>Comments #{localStorage.activeNum}</h2>
                </div>
                   <CommentsList comments={localStorage[localStorage.active]}/>
                <form id="comment">
                    <img width="50px" height="50px" src="https://www.csa1.com/images/blank-image-avatar.jpg" alt=""/>
                    <input type="text"
                           value={this.state.text}
                            onChange={this.handleChange}/>
                </form>
            </div>
        )
    }


    handleSubmit(e){
        if(e.keyCode===13 && e.ctrlKey) {
            e.preventDefault();
            if (!this.state.text.length) {
                return;
            }

            const newComment = {
                text: this.state.text,
                id: localStorage.activeNum,

            };
                if(localStorage[localStorage.active])
                     this.state.comments = JSON.parse(localStorage[localStorage.active]);
                else this.state.comments =[];
            this.setState(prevState => ({
                comments: prevState.comments.concat(newComment),
                text: ''
            }));
            if(localStorage.active)
            localStorage[localStorage.active] = JSON.stringify(this.state.comments);
        }}

    componentDidMount(){
        document.addEventListener('keydown',this.handleSubmit);
    }


    handleChange(e){
        this.setState({text: e.target.value});
    }

}

class CommentsList extends Component{
    render(){
        return(
            <ul>
                {this.props.comments && JSON.parse(this.props.comments).map(comment => (
                    <li id="comm"><div id="img"><img width="50px" height="50px" src="https://www.csa1.com/images/blank-image-avatar.jpg" alt=""/></div><div id="text">{comment.text}</div></li>
                ))}
            </ul>
        )
    }
}

class SideBar extends Component {
    render() {
        return (
            <div id="sidebar">
                <h1>Dairy app</h1>
                <p>Comment with no sense</p>
            </div>
        );
    }
}


class App extends Component {
    render(){
        return (
            <div id="app">
                <SideBar/>
                    <div id="flexblock">
                        <Tasks/>
                        <Comments/>
                    </div>
            </div>
        );
    }
}

export default App;
