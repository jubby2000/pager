/**
 * @class Pager
 */

import * as React from 'react';
import SupportForm from './support-form';

export type Props = {
  pages : any[],
  getLabel : Function,
  children : any,
  supportRequestUrl : string,
  pageInfoUrl : Function,
}

export type State = {
  currentPage : number,
  maxPages : number,
  showHelp : boolean,
  loading : boolean,
  pageInfo : any,
  pageInfoError : string | null,
}

export default class Pager extends React.Component<Props, State> {
  constructor( props : Props ) {
    super( props );
    this.state = {
      currentPage : 0,
      maxPages : this.props.pages.length,
      showHelp : false,
      loading : false,
      pageInfo : null,
      pageInfoError : null,
    };
    this.toggleHelpScreen = this.toggleHelpScreen.bind( this );
  }

  static defaultProps = {
    pageInfoUrl : null,
  };

  componentDidMount() : void {
    this.retrievePageInfo();
  }

  componentDidUpdate( prevProps : Readonly<Props> ) : void {
    if( this.props !== prevProps ) {
      this.setState({
        currentPage : 0,
        maxPages : this.props.pages.length,
        showHelp : false,
        loading : false,
        pageInfo : null,
        pageInfoError : null,
      } );
    }
    if( this.props.pageInfoUrl !== prevProps.pageInfoUrl ) {
      this.retrievePageInfo();
    }
  }

  retrievePageInfo() : void {
    if( this.props.pageInfoUrl ) {
      this.setState( { loading : true } );
      fetch( this.props.pageInfoUrl() )
        .then( ( response : any ) => {
          this.setState({
            loading : false,
            pageInfo : JSON.parse( response ),
          })
        } )
        .catch( ( error ) => {
          if( error.message ) {
            this.setState({
              loading : false,
              pageInfoError : error.message,
            });
          } else {
            this.setState( {
              loading : false,
              pageInfoError : 'There was a problem retrieving page info, please try again.',
            } );
          }
        } );
    }
  }

  goToNextPage() : void {
    if( this.props.pages[this.state.currentPage + 1] ) {
      this.setState( { currentPage : this.state.currentPage + 1 } )
    }
  }

  goToPreviousPage() : void {
    if( this.props.pages[this.state.currentPage - 1] ) {
      this.setState( { currentPage : this.state.currentPage - 1 } )
    }
  }

  goToPageByLabel( label : string ) : void {
    const pageIndex : number = this.findPageIndexByLabel( label );
    this.setState( { currentPage : pageIndex } );
  }

  findPageIndexByLabel( label : string ) : number {
    const pageLabels : string[] = this.props.pages.map( ( _page, index ) => this.props.getLabel( index ) );
    return pageLabels.findIndex( pageLabel => pageLabel === label );
  }

  toggleHelpScreen() : void {
    this.setState( { showHelp : !this.state.showHelp } )
  }

  render() {
    const pageLabels : string[] = this.props.pages.map( ( _page, index ) => this.props.getLabel( index ) );

    if( this.state.showHelp && this.props.supportRequestUrl ) {
      return (
        <SupportForm onSubmit={ this.toggleHelpScreen } endpoint={ this.props.supportRequestUrl }/>
      );
    } else {
      return (
        <div>
          { this.props.children(
            {
              page : this.props.pages[ this.state.currentPage ],
              goPrevious : () => this.goToPreviousPage(),
              goNext : () => this.goToNextPage(),
              goToLabel : ( label : string ) => this.goToPageByLabel( label ),
              currentPageLabel : pageLabels[ this.state.currentPage ],
              pageLabels : pageLabels,
              showHelpScreen : () => this.toggleHelpScreen(),
              pageInfoIsLoading : this.state.loading,
              pageInfoError : this.state.pageInfoError,
              pageInfo : this.state.pageInfo,
            }
          )}
        </div>
      );
    }
  }
}
