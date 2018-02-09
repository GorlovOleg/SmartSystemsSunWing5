import * as React from "react";
import { Link, Redirect } from 'react-router-dom';
import { RoutePaths } from './Routes';
import { EmployeeForm } from './EmployeeForm';
import EmployeeService, { IEmployee } from '../services/Employees';
import { RouteComponentProps } from "react-router";

let employeeService = new EmployeeService();

export class Employees extends React.Component<RouteComponentProps<any>, any> {
    refs: {
        query: HTMLInputElement;
    };

    state = {
        employees: [] as Array<IEmployee>,
        editEmployee: null as Object,
        isAddMode: false as boolean,
        searchQuery: '' as string
    };

    componentDidMount() {
        this.showAll();
    }

    showAll() {
        employeeService.fetchAll().then((response) => {
            this.setState({ searchQuery: '', employees: response.content });
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

        employeeService.search(this.state.searchQuery).then((response) => {
            this.setState({ employees: response.content });
        });
    }

    delete(employee: IEmployee) {
        employeeService.delete(employee.employeeId).then((response) => {
            let updatedEmployees = this.state.employees;
            updatedEmployees.splice(updatedEmployees.indexOf(employee), 1);
            this.setState({ employees: updatedEmployees });
        });
    }

    render() {
        return <div>
            <h1>Employees</h1>
            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => this.handleSeachSubmit(e)}>
                <input className="form-control form-control form-control-sm" type="text" value={this.state.searchQuery} onChange={(e) => this.handleSearchQueryChange(e)} placeholder="Search" />
                <button className="btn btn-outline-success btn-sm" type="submit">Search</button>&nbsp;
            </form>
            {this.state.searchQuery && this.state.employees && this.state.employees.length == 0 &&
                <p>No results!</p>
            }
            {this.state.employees && this.state.employees.length > 0 &&
                <table className="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
	                        <th>Gender</th>
							<th>City</th>	
	                        <th>Department</th>								 
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee, index) =>
                                <tr key={employee.employeeId}>
							    <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
		                        <td>{employee.gender}</td>
                                <td>{employee.city}</td>
                                <td>{employee.department}</td>
                                <td>{employee.phone}</td>								
								
                                <td><Link to={RoutePaths.EmployeeEdit.replace(":id", employee.employeeId.toString())}>edit</Link>
                                    <button type="button" className="btn btn-link" onClick={(e) => this.delete(employee)}>delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
            {this.state.searchQuery &&
                <button type="button" className="btn btn-primary" onClick={(e) => this.showAll()}>clear search</button>
            }
            <Link className="btn btn-success" to={RoutePaths.EmployeeNew}>add</Link>

        </div>
    };
}
