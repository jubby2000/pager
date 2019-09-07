import * as React from 'react'

export type Props = {
    endpoint : string,
    onSubmit : any,
}

export type State = {
    name : string,
    email : string,
    message : string,
}

export default class SupportForm extends React.Component<Props, State> {
    constructor( props : Props ) {
        super( props );
        this.state = {
            name : '',
            email : '',
            message : '',
        };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleChange( event : any ) {
        const newState = {};
        newState[ event.target.name ] = event.target.value;
        this.setState( newState );
      }

    handleSubmit( event : any ) : void {
        event.preventDefault();
        fetch( this.props.endpoint, {
            method : 'POST',
            body : JSON.stringify( {
                name : this.state.name,
                email : this.state.email,
                message : this.state.message,
            } ),
        } ).catch( ( error ) => {
            if( error.message ) {
                alert( error.message );
            } else {
                alert( 'There was a problem submitting your support request, please try again.' );
            }
        } );

        this.props.onSubmit();

    }

    render() {
        return(
            <form onSubmit={ this.handleSubmit } >
                <label>
                    Name:
                    <input required value={ this.state.name } onChange={ this.handleChange } type="text" name="name" />
                </label>
                <label>
                    Email:
                    <input required value={ this.state.email } onChange={ this.handleChange } type="email" name="email" />
                </label>
                <label>
                    Message:
                    <input required value={ this.state.message } onChange={ this.handleChange } type="text" name="message" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}
