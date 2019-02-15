import React from "react";
import LibraryLogo from "../../../core/LibraryLogo";
import { Intro, Timeline, Flags, Css, Release, Overview } from "./summary.js";



class Cannonball extends React.Component {


    render() {
        return (
            <div className="cannonball-container formatted-content ">
                <div className="cannonball-bg--1">
                    <div className="background-overlay"></div>
                    <div>
                        <div id="intro" className="slide">
                            <div className="ping-logo--inverse" />
                            <div className="ui-lib-landing-page__info">
                                <LibraryLogo variant="dark" className="ui-lib-landing-page__logo"/>
                                <Intro />
                            </div>
                        </div>
                        <div id="timeline" className="slide">
                            <div className="overlay--light">
                                <Timeline />
                            </div>
                        </div>
                        <div id="overview" className="slide">
                            <div className="overlay--light">
                                <Overview />
                            </div>
                        </div>
                        <div id="css" className="slide">
                            <div className="overlay--light">
                                <Css />
                            </div>
                        </div>
                        <div id="flags" className="slide">
                            <div className="overlay--light">
                                <Flags />
                            </div>
                        </div>
                        <div id="release" className="slide">
                            <div className="overlay--light">
                                <Release />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Cannonball;
