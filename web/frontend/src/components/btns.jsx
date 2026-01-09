import '../assets/css/global.css'
import './css/btns.css'

function Btns({ classNameIcon1, onClick1, className1, text1, classNameIcon2, onClick2, className2, text2 }) {
    return (
        
        <div className="btns-container">
            <div className="btn-container">
                <button className={classNameIcon1}>img</button>
                <button onClick={onClick1} className={className1}>
                    teste
                    {text1}
                </button>
            </div>
            <div className="btn-container">
                <button className={classNameIcon2}>img</button>
                <button onClick={onClick2} className={className2}>
                    teste
                    {text2}
                </button>
            </div>
        </div>

    );
}

export default Btns;