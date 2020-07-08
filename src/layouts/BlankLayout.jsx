// import React from 'react';
import styles from './BlankLayout.less'
// const Layout = ({ children }) => <>{children}</>;

const Layout = props => {
    const {
        children
    } = props;
    return (
        <>
            <div className={styles.RootContainer}>{children}</div>
        </>
    )
}

export default Layout;
