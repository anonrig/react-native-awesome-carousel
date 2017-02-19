// @flow

import React, { PropTypes, Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

import Style from './style';

import Pager from './pager';

class Carousel extends Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.state = {
            activePage: props.initialPage > 0 ? props.initialPage : 0
        };
    }


    /**
     * Get width.
     * 
     * @return {number} width - Width of the screen.
     */
    getWidth() {
        const { width, children } = this.props;

        return width ? width : Dimensions.get('window').width;
    }


    componentDidMount() {
        const { initialPage, animate, children } = this.props;

        if (initialPage > 0) {
            this.refs.pager.scrollToPage(initialPage, false);
        }

        if (animate && children) {
            this._setUpTimer();
        }
    }


    /**
     * Triggered when an indicator is pressed.
     */
    indicatorPressed(activePage) {
        this.setState({activePage});
        this.refs.pager.scrollToPage(activePage);
    }


    /**
     * Render indicators for the carousel.
     */
    renderIndicator() {
        console.log('renderIndicator');
        const {
            indicatorAtBottom,
            indicatorOffset,
            indicatorSize,
            indicatorText,
            inactiveIndicatorText,
            children,
            indicatorSpace,
            indicatorColor,
            inactiveIndicatorColor
        } = this.props;
        const { activePage } = this.state;

        if (this.props.hideIndicators) {
            return null;
        }

        let indicatorStyle = indicatorAtBottom ? {bottom: indicatorOffset} : {top: indicatorOffset}

        const indicators = (children || [])
            .filter(child => typeof child != 'undefined')
            .map((child, index) => {
                const style = {
                    color:  (index == activePage) ? indicatorColor : inactiveIndicatorColor
                };

                return (
                    <TouchableOpacity onPress={this.indicatorPressed.bind(this, index)} key={index}>
                        <Text
                            style={[style, {fontSize: indicatorSize}]}>
                            {index == activePage ? indicatorText : inactiveIndicatorText}
                        </Text>
                    </TouchableOpacity>
                );
            });

        if (indicators.length == 1) {
            return null;
        }

        return (
            <View style={[Style.pageIndicator, indicatorStyle]}>
                {indicators}
            </View>
        )
    }


    /**
     * Rewrites timer if current view is not the initial one.
     */
    _setUpTimer() {
        const { children, delay } = this.props;

        if (children.length > 1) {
            clearTimeout(this.timer);
            this.timer = setTimeout(this._animateNextPage.bind(this), delay);
        }
    }


    /**
     * @private
     * 
     * Animates to next page.
     */
    _animateNextPage() {
        let currentActivePage = 0;

        const { activePage } = this.state;
        const { children } = this.props;

        if (activePage < children.length - 1) {
            currentActivePage = activePage + 1;
            this.indicatorPressed(currentActivePage);
            this._setUpTimer();
        }
    }


    /**
     * @private
     * Runs when animation starts.
     */
    _onAnimationBegin() {
        clearTimeout(this.timer);
    }


    /**
     * @private
     * @param {number} activePage - Active page index.
     */
    _onAnimationEnd(activePage) {
        this.setState({activePage});

        this.props.onPageChange && this.props.onPageChange(activePage);        
    }


    render() {
        const { activePage } = this.state;
        const { children } = this.props;

        const width = this.getWidth();
        const indicator = this.renderIndicator();

        return (
            <View style={Style.view}>
                <Pager
                    ref={'pager'}
                    width={width}
                    contentContainerStyle={Style.container}
                    onBegin={this._onAnimationBegin.bind(this)}
                    onEnd={this._onAnimationEnd.bind(this)}>
                    {children}
                </Pager>
                {indicator}
            </View>
        );
    }
}


Carousel.defaultProps = {
    hideIndicators: false,
    indicatorColor: '#000000',
    indicatorSize: 50,
    inactiveIndicatorColor: '#999999',
    indicatorAtBottom: true,
    indicatorOffset: 250,
    indicatorText: '•',
    inactiveIndicatorText: '•',
    width: null,
    initialPage: 0,
    indicatorSpace: 25,
    animate: true,
    delay: 1000,
    loop: true
}

export default Carousel