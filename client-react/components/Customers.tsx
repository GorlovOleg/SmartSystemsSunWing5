import * as React from "react";
//---import Moment from "moment";
import { Link, Redirect } from 'react-router-dom';
import { RoutePaths } from './Routes';
import { CustomerForm } from './CustomerForm';
import CustomerService, { ICustomer } from '../services/Customers';
import { RouteComponentProps } from "react-router";

let customerService = new CustomerService();

export class Customers extends React.Component<RouteComponentProps<any>, any> {
    refs: {
        query: HTMLInputElement;
    };

    state = {
        customers: [] as Array<ICustomer>,
        editCustomer: null as Object,
        isAddMode: false as boolean,
        searchQuery: '' as string
    };

    componentDidMount() {
        this.showAll();
    }

    showAll() {
        customerService.fetchAll().then((response) => {
            this.setState({ searchQuery: '', customers: response.content });
        });
    }

    handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSeachSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(!this.state.searchQuery){
            this.showAll();
            return;
        }

        customerService.search(this.state.searchQuery).then((response) => {
            this.setState({ customers: response.content });
        });
    }

    delete(customer: ICustomer) {
        customerService.delete(customer.customerId).then((response) => {
            let updatedCustomers = this.state.customers;
            updatedCustomers.splice(updatedCustomers.indexOf(customer), 1);
            this.setState({ customers: updatedCustomers });
        });
    }

    render() {
        return <div>
            <h1>Customers</h1>
            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => this.handleSeachSubmit(e)}>
                <input className="form-control form-control form-control-sm" type="text" value={this.state.searchQuery} onChange={(e) => this.handleSearchQueryChange(e)} placeholder="Search" />
                <button className="btn btn-outline-success btn-sm" type="submit">Search</button>&nbsp;
            </form>
            {this.state.searchQuery && this.state.customers && this.state.customers.length == 0 &&
                <p>No results!</p>
            }
            {this.state.customers && this.state.customers.length > 0 &&
                <table className="table">
                    <thead>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
	                         <th>Gender</th>						
                             <th>Phone</th>
	                         <th>Email</th>	
	                         <th>Birthday</th>	
							 
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customers.map((customer, index) =>
                            <tr key={customer.customerId}>
                                <td>{customer.lastName}</td>
                                <td>{customer.firstName}</td>
		                        <td>{customer.gender}</td>	
                                <td>{customer.phone}</td>								
                                <td>{customer.email}</td>
                                <td>{customer.birthday}</td>
																
                                <td><Link to={RoutePaths.CustomerEdit.replace(":id", customer.customerId.toString())}>edit</Link>
                                    <button type="button" className="btn btn-link" onClick={(e) => this.delete(customer)}>delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
            {this.state.searchQuery &&
                <button type="button" className="btn btn-primary" onClick={(e) => this.showAll()}>clear search</button>
            }
            <Link className="btn btn-success" to={RoutePaths.CustomerNew}>add</Link>

        </div>
    };
}
