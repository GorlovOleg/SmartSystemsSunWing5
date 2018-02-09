import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import { SignIn, Register } from './Auth';
import AuthService from '../services/Auth';
import { ErrorPage } from './Error';

import { Contacts } from './Contacts';
import { ContactForm } from './ContactForm';

import { Customers } from './Customers';
import { CustomerForm } from './CustomerForm';

import { Employees } from './Employees';
import { EmployeeForm } from './EmployeeForm';

import { Header } from './Header';

export class RoutePaths {
	
    public static Contacts: string = "/contacts";
    public static ContactEdit: string = "/contacts/edit/:id";
    public static ContactNew: string = "/contacts/new";
	
	public static Customers: string = "/customers";
    public static CustomerEdit: string = "/customers/edit/:id";
    public static CustomerNew: string = "/customers/new";
	
	public static Employees: string = "/employees";
    public static EmployeeEdit: string = "/employees/edit/:id";
    public static EmployeeNew: string = "/employees/new";
	
    public static SignIn: string = "/";
    public static Register: string = "/register/";
}

export default class Routes extends React.Component<any, any> {
    render() {
        return <Switch>
		
            <Route exact path={RoutePaths.SignIn} component={SignIn} />
            <Route path={RoutePaths.Register} component={Register} />
			
            <DefaultLayout exact path={RoutePaths.Contacts} component={Contacts} />
            <DefaultLayout path={RoutePaths.ContactNew} component={ContactForm} />
            <DefaultLayout path={RoutePaths.ContactEdit} component={ContactForm} />

	        <DefaultLayout exact path={RoutePaths.Customers} component={Customers} />
            <DefaultLayout path={RoutePaths.CustomerNew} component={CustomerForm} />
            <DefaultLayout path={RoutePaths.CustomerEdit} component={CustomerForm} />	

	        <DefaultLayout exact path={RoutePaths.Employees} component={Employees} />
            <DefaultLayout path={RoutePaths.EmployeeNew} component={EmployeeForm} />
            <DefaultLayout path={RoutePaths.EmployeeEdit} component={EmployeeForm} />				
			
            <Route path='/error/:code?' component={ErrorPage} />
        </Switch>
    }
}

const DefaultLayout = ({ component: Component, ...rest }: { component: any, path: string, exact?: boolean }) => (
    <Route {...rest} render={props => (
        AuthService.isSignedInIn() ? (
            <div>
                <Header {...props} />
                <div className="container">
                    <Component {...props} />
                </div>
            </div>
        ) : (
                <Redirect to={{
                    pathname: RoutePaths.SignIn,
                    state: { from: props.location }
                }} />
            )
    )} />
);
