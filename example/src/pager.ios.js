import React, { Component, PropTypes } from 'react';

import { ScrollView, I18nManager } from 'react-native';

export default class Pager extends Component {
    /**
     * Scrolls to specific page.
     * 
     * @param {number} page - Index of the page.
     * @param {boolean} animated
     */
    scrollToPage(page, animated) {
        const { width } = this.props;

        if (typeof animated == 'undefined') {
            animated = true;
        }

        this.refs.scrollView.scrollTo({
            x: (I18nManager.isRTL ? -1 : 1)  * page * width,
            y: 0,
            animated
        });
    }


    /**
     * @private
     */
    _onMomentumScrollEnd(e) {
        const { width, onEnd } = this.props;
        const activePage = e.nativeEvent.contentOffset.x / width;
        onEnd(activePage);
    }


    render() {
        const { scrollStyle, onBegin } = this.props;
        
        return (
            <ScrollView
                ref={'scrollView'}
                contentContainerStyle={scrollStyle}
                automaticallyAdjustContentInsets={false}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollsToTop={false}
                onScrollBeginDrag={onBegin}
                style={{flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'}}
                onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}>
                {this.props.children}
            </ScrollView>
        );
    }
}