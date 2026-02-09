import '../assets/css/global.css'
import './css/btns.css'

function Btns({ classNameIconPrimaryButton, actionPrimaryButton, classNamePrimaryButton, textPrimaryButton,
     imageIconPrimaryButton, typePrimaryButton, desablitPrimaryButton, classNameIconSecondButton, 
     onClickSecondButton, classNameSecondButton, textSecondButton, imageIconSecondButton, 
     typeSecondButton, desablitSecondButton }) {
    return (
        
        <div className="btns-container">
            <div className="btn-container">
                <button className={classNameIconPrimaryButton}>
                    <img src={imageIconPrimaryButton} alt="" />
                </button>
                <button onClick={actionPrimaryButton} className={classNamePrimaryButton} type={typePrimaryButton} disabled={desablitPrimaryButton}>
                    {textPrimaryButton}
                </button>
            </div>
            <div className="btn-container">
                <button className={classNameIconSecondButton}>
                    <img src={imageIconSecondButton} alt="" />
                </button>
                <button onClick={onClickSecondButton} className={classNameSecondButton} type={typeSecondButton} disabled={desablitSecondButton}>
                    {textSecondButton}
                </button>
            </div>
        </div>

    );
}

export default Btns;