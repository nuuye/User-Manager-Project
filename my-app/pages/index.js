//default page
import React from 'react';
import Login from "../src/components/LoginComponent/login"
import styles from './index.module.scss';

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <Login />
        </div>
    );
};

export default LoginPage;
