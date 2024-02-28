//default page
import React from 'react';
import styles from './register.module.scss';
import Register from "../src/components/RegisterComponent/register"

const RegisterPage = () => {
    return (
        <div className={styles.container}>
            < Register />
        </div>
    );
};

export default RegisterPage;
