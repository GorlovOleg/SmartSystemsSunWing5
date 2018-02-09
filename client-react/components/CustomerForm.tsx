import 'object-assign';
import * as React from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import CustomerService, { ICustomer } from '../services/Customers'
import { RoutePaths } from './Routes';

let customerService = new CustomerService();

export class CustomerForm extends React.Component<RouteComponentProps<any>, any> {
    state = {
        customer: null as ICustomer,
        errors: {} as { [key: string]: string }
    }

    componentDidMount() {
        if (this.props.match.path == RoutePaths.CustomerEdit) {
            customerService.fetch(this.props.match.params.id).then((response) => {
                this.setState({ customer: response.content });
            });
        } else {
            let newCustomer: ICustomer = {
                 firstName: '', lastName: '', gender: '', phone: '', email: '', birthday: ''
            };
            this.setState({ customer: newCustomer });
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.saveCustomer(this.state.customer);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let customerUpdates = {
            [name]: value
        };

        this.setState({
            customer: Object.assign(this.state.customer, customerUpdates)
        });
    }

    saveCustomer(customer: ICustomer) {
        this.setState({ errors: {} as { [key: string]: string } });
        customerService.save(customer).then((response) => {
            if (!response.is_error) {
                this.props.history.push(RoutePaths.Customers);
            } else {
                this.setState({ errors: response.error_content });
            }
        });
    }

    _formGroupClass(field: string) {
        var className = "form-group ";
        if (field) {
            className += " has-danger"
        }
        return className;
    }

    render() {
        if (!this.state.customer) {
            return <div>Loading...</div>;
        }
        else {
            return <fieldset className="form-group">
                <legend>{this.state.customer.customerId ? "Edit Customer" : "New Customer" }</legend>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    
					<div className={this._formGroupClass(this.state.errors.firstName)}>
                        <label htmlFor="inputFirstName" className="form-control-label">First Name</label>
                        <input type="text" name="firstName" id="inputFirstName" value={this.state.customer.firstName} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" required />
                        <div className="form-control-feedback">{this.state.errors.firstName}</div>
                    </div>	
					
                    <div className={this._formGroupClass(this.state.errors.lastName)}>
                        <label htmlFor="inputLastName" className="form-control-label">Last Name</label>
                        <input type="text" autoFocus name="lastName" id="inputLastName" value={this.state.customer.lastName} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" required />
                        <div className="form-control-feedback">{this.state.errors.lastName}</div>
                    </div>
					
                    <div className={this._formGroupClass(this.state.errors.gender)}>
                        <label htmlFor="inputGender" className="form-control-label">Gender</label>
                        <input type="gender" name="gender" id="inputGender" value={this.state.customer.gender} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" />
                        <div className="form-control-feedback">{this.state.errors.gender}</div>
                    </div>	
					
                    <div className={this._formGroupClass(this.state.errors.phone)}>
                        <label htmlFor="inputPhone" className="form-control-label">Phone</label>
                        <input type="tel" name="phone" id="inputPhone" value={this.state.customer.phone} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" />
                        <div className="form-control-feedback">{this.state.errors.phone}</div>
                    </div>
										
                    <div className={this._formGroupClass(this.state.errors.email)}>
                        <label htmlFor="inputEmail" className="form-control-label">Email</label>
                        <input type="email" name="email" id="inputEmail" value={this.state.customer.email} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" />
                        <div className="form-control-feedback">{this.state.errors.email}</div>
                    </div>
					
                    <div className={this._formGroupClass(this.state.errors.birthday)}>
                        <label htmlFor="inputBirthday" className="form-control-label">Birthday</label>
                        <input type="tel" name="birthday" id="inputBirthday" value={this.state.customer.birthday} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" />
                        <div className="form-control-feedback">{this.state.errors.birthday}</div>
                    </div>
					
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                    <Link className="btn btn-lg btn-secondary btn-block" to="/customers">Cancel</Link>
                </form>
            </fieldset>
        }
    }
}
