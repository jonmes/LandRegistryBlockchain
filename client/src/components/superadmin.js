import React from 'react';
import axios from 'axios';

import './superadmin.css';

class SuperAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { adminsList: [], address: "", name: "", Id: "", citytown: "", kebele: "", state: "" }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/admin/')
            .then(res => {
                this.setState({ adminsList: res.data })
            })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeDetect() {
        let { phone, name, Id, email } = this.props.userinfo
        let { phone: updatedPhone, name: updatedName, Id: updatedId, email: updatedEmail } = this.state
        if (phone === updatedPhone && name === updatedName && Id === updatedId && email === updatedEmail) {
            return false
        } else {
            return true
        }
    }

    addAdmin = async () => {
        await this.props.addAdmin(this.state.address.toLowerCase())
        axios.get('http://localhost:5000/api/admin/' + this.state.address.toLowerCase())
            .then(res => {
                if (res.data === null) {
                    axios.post('http://localhost:5000/api/admin/add/', { name: this.state.name, address: this.state.address.toLowerCase(), citytown: this.state.citytown, Id: this.state.Id, kebele: this.state.kebele, state: this.state.state })
                        .then(res => {
                            let list = this.state.adminsList;
                            list.push(res.data);
                            this.setState({ adminsList: list, address: "", name: "", Id: "", citytown: "", kebele: "", state: "" });
                            this.props.codeChanger(8)
                        })
                } else {
                    this.props.codeChanger(6)
                }
            })

    }

    render() {
        return (
            <div className="superadmin">
                <div className="wrapper">
                    <h2>Add an Admin</h2>
                    <input className="app-input" type="text" name="address" placeholder="Token Address" autoComplete="new-password" value={this.state.address} onChange={this.handleInput} required />
                    <input className="app-input" type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInput} required />
                    <input className="app-input" type="text" name="Id" placeholder="ID No" value={this.state.Id} onChange={this.handleInput} required />
                    <input className="app-input" type="text" name="state" placeholder="Region" value={this.state.state} onChange={this.handleInput} required />
                    <input className="app-input" type="text" name="city" placeholder="City"  required />
                    <input className="app-input" type="text" name="citytown" placeholder="Woreda" value={this.state.citytown} onChange={this.handleInput} required />
                    <input className="app-input" type="text" name="kebele" placeholder="Kebele" value={this.state.kebele} onChange={this.handleInput} required />
                    <button onClick={() => this.addAdmin()} className="app-button-1">Add Admin</button>
                </div>
                <div className="adminpanel">
                    <h3 className="superadmintitle">Super Admin Portal</h3>
                    <div className="nodestatuses">
                        <div className="nodestatus">
                            <div className="nodeloc"><strong>Location:</strong> Local Host</div>
                            <div className="nodestat"><strong>Node Status:</strong> <span className="activenode"><span className="blink"></span> Active</span></div>
                        </div>
                        <div className="nodestatus">
                            <div className="nodeloc"><strong>Location:</strong> Woreda 1</div>
                            <div className="nodestat"><strong>Node Status:</strong> <span className="idlenode"><span className="blink"></span> Idle</span></div>
                        </div>
                        <div className="nodestatus">
                            <div className="nodeloc"><strong>Location:</strong> Woreda 2</div>
                            <div className="nodestat"><strong>Node Status:</strong> <span className="damagednode"><span className="blink"></span> Inactive</span></div>
                        </div>
                    </div>
                    <div className="adminslist">
                        {this.state.adminsList.map((info, index) => (
                            <div className="adminel" key={"adminel-" + index}>
                                <div className="adnumber"><strong>{info.name}</strong></div>
                                <div className="adaddress"><strong>Address:</strong> {info.address}</div>
                                <div className="adTown"><strong>Region:</strong> {info.state}</div>
                                <div className="adTown"><strong>Woreda:</strong> {info.citytown}</div>
                                <div className="adTown"><strong>Kebele:</strong> {info.kebele}</div>
                            </div>
                        ))}
                    </div>
                    {/* Can view all admins and can remove them as well */}
                </div>
            </div>
        )
    }
}

export default SuperAdmin