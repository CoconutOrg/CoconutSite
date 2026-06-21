import { useTranslation, Trans } from 'react-i18next'
import './LoadingOverlay.css'
import { useState } from 'react'

const LoadingOverlay = (props) => {
    const { t } = useTranslation()

    const hideLoadingOverlay = props.hidden ? " hidden" : ""

    return(
        <div className={"loading-overlay" + hideLoadingOverlay}>
            <div className="loader-content">
                <div className="spinner"></div>
                <p>{t('loading', 'Loading...')}</p>
            </div>
        </div>
    )
}

export default LoadingOverlay