import React from 'react';
import './regForm.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default class registrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password:""
        }
    }
    handleChange(event) {
        console.log(event.currentTarget.value);
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        console.log("This is the state: ", this.state);
        const data = {
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            email: this.state.email,
            userName: this.state.userName,
            password:this.state.password
        }
        console.log(data);
        fetch('https://unc-eats-back.herokuapp.com/user/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then( (res) => {
                return res.json();
            })  
            .then( (resJSON) => {console.log(resJSON)
                this.props.history.push('/LoginForm');
            })
            .catch( (error) => {console.error(error)
            });
    }

    render () {
        return (
                <form class="regForm" onSubmit={(event) => this.handleSubmit(event)}>  
                    <h1 class="regTitle">Register for an account</h1>
                    <div class="container">
                        <label for="firstname"></label>
                        <input type="text" className="firstname Info" placeholder="First Name" name="firstName" required
                            onChange={(event) => this.handleChange(event)}
                        />
                        
                        <label for="lastname"></label>
                        <input type="text" className="lastname Info"placeholder="Last Name" name="lastName" required
                            onChange={(event) => this.handleChange(event)}
                        />    

                        <label for="username"></label>
                        <input type="text" className="regUsername Info"placeholder="Username" name="userName" required
                            onChange={(event)=> this.handleChange(event)}
                        />

                        <label for="pwd"></label>
                        <input type="password" className="regPassword Info"placeholder="Password" name="password" required
                            onChange={(event)=> this.handleChange(event)}
                        />

                        <label for="email"></label>
                        <input type="text" className="email Info"placeholder="Email" name="email"
                            onChange={(event)=> this.handleChange(event)}
                        />
                        <Button className="regBtn" type="submit">Register</Button>
                        <p class="login"><Link to="/LoginForm">Already have an account?</Link></p>
                    </div>
                </form>      
        );
    }
}
