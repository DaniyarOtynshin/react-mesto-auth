import unionPathSuccess from '../images/Union.svg';
import unionPathReject from '../images/UnionReject.svg';

const InfoTooltip = (props) => {
    return (
        <div className="popup popup_active">
            <div className="popup-infotooltip">
                <button className="popup__button" />
                <img alt="Успешно!" className="popup-infotooltip__union" src={unionPathSuccess} />
                <h1 className="popup-infotooltip__text">Вы успешно зарегистрировались!</h1>
            </div>
        </div>

    )
}

export default InfoTooltip;