import React, {Component} from 'react';
import Header from '../components/main/header';
import Footer from '../components/main/footer';

export default class MainLayout extends Component {
    render() {
        return (
            <div className="zuppple-app">
                <Header/>

                <main>
                    {this.props.children}
                </main>

                <Footer/>
            </div>
        )
    }
}
