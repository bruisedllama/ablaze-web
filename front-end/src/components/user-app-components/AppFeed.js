import React from 'react'
import { } from 'carbon-components-react'

export default class AppFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            feedItems: []
        }
    }

    componentDidMount() {
        //perform API call to get feed items
        this.setState({
            feedItems: ['test1', 'test2', 'test3', 'test4' ]
        }) //manually set for testing
    }
    
    render() {
        return (
            <div id="feed" style={{right: this.props.shown ? 0 : '-25%'}}>
                <h2>Feed</h2>
                {this.state.feedItems.map((item) => {
                    return <p>item</p>
                })}
            </div>
        )
    }
}