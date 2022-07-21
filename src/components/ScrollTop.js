import React from 'react'

const ScrollTop = () => {

    React.useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return null;
}

export default ScrollTop;