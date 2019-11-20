import React, { Component, Suspense } from 'react'

const lazyHOC = (WrapComponent) => {
    class HOC extends Component {
        render() {
            return (
                <Suspense fallback={<div>Loading...</div>}>
                    <WrapComponent {...this.props} />
                </Suspense>
            )
        }
    }
    return HOC
}
export default lazyHOC;