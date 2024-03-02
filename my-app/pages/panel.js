import React from 'react';
import styles from './panel.module.scss';
import Panel from '../src/components/PanelComponent/panel'

const PanelPage = () => {
    return (
        <div className={styles.container}>
            <Panel />
        </div >
    )
}

export default PanelPage;