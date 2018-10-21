import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Boards from './routes/Boards';
import NewBoard from './routes/NewBoard';
import NotFound from './routes/NotFound';
import UserForm from './UserForm';
import Filters from './Filters';
import Counter from './Counter';
import KudosesPage from './routes/KudosesPage';
import {Switch, Route, Redirect, NavLink} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import history from '../history';
import BoardOfKudos from './BoardOfKudos';

class App extends Component {

    static childContextTypes = {
        user: PropTypes.string
    }

    state = {
        username: ''
    }

    getChildContext () {
        return {
            user: this.state.username
        }
    }

    render () {
        return (
            <ConnectedRouter history = {history}>
                <div className="mdl-layout__container">
                    <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header has-drawer is- is-small-screen">
                        <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600 is-casting-shadow">
                        <div role="button" tabIndex="0" className="mdl-layout__drawer-button"><i className="material-icons"></i></div>
                            <div className="mdl-layout__header-row">
                            <span className="mdl-layout-title">Home</span>
                            <div className="mdl-layout-spacer"></div>
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                                <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                                <i className="material-icons">search</i>
                                </label>
                                <div className="mdl-textfield__expandable-holder">
                                <input className="mdl-textfield__input" type="text" id="search" />
                                <label className="mdl-textfield__label" htmlFor="search">Enter your query...</label>
                                </div>
                            </div>
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
                                <i className="material-icons">more_vert</i>
                            </button>
                            <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
                                <li className="mdl-menu__item">About</li>
                                <li className="mdl-menu__item">Contact</li>
                                <li className="mdl-menu__item">Legal information</li>
                            </ul>
                            </div>
                        </header>
                        <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                            
                            <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
                                <div>
                                    <NavLink className="mdl-navigation__link" activeStyle = {{color: 'red'}} to = "/counter">Counter</NavLink>
                                </div>
                                <div>
                                    <NavLink className="mdl-navigation__link" activeStyle = {{color: 'red'}} to = "/filters">Filters</NavLink>
                                </div>
                                <div>
                                    <NavLink className="mdl-navigation__link" activeStyle = {{color: 'red'}} to = "/board-of-kudos">Board Of Kudos</NavLink>
                                </div>
                                <div>
                                    <NavLink className="mdl-navigation__link" activeStyle = {{color: 'red'}} to = "/boards"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Boards</NavLink>
                                </div>
                                <div>
                                    <NavLink className="mdl-navigation__link" activeStyle = {{color: 'red'}} to = "/kudoses/1"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Kudoses</NavLink>
                                </div>
                            <div className="mdl-layout-spacer"></div>
                            </nav>
                        </div>
                        <main className="mdl-layout__content mdl-color--grey-100">
                            <UserForm value = {this.state.username} onChange = {this.handleUserChange} />
                            <Switch>
                                <Route path = "/counter" component = {Counter} />
                                <Route path = "/filters" component = {Filters} />
                                <Route path = "/board-of-kudos" component = {BoardOfKudos} />
                                <Route path = "/kudoses" component = {KudosesPage} />
                                {/* <Redirect from = '/kudoses/' to = '/kudoses/1' />  */}
                                <Route path = "/boards/new" component = {NewBoard} />
                                <Route path = "/boards" component = {Boards} />
                                <Route path = "*" component = {NotFound} />
                            </Switch>
                        </main>
                        <div className="mdl-layout__obfuscator"></div>
                    </div>
                </div>
            </ConnectedRouter>
        )
    }

    handleUserChange = (username) => {
        this.setState({
            username: username
        })
    }
}

export default App;