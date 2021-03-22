import { useHistory } from 'react-router';
import unionPathSuccess from '../images/Union.svg';
import unionPathReject from '../images/UnionReject.svg';

const InfoTooltip = (props) => {
    return (
        <div className={`popup ${props.isOpen && "popup_active"}`}>
            <div className="popup-infotooltip">
                <button className="popup__button" onClick={props.onClose} />
                <img alt="Успешно!" className="popup-infotooltip__union" src={
                    props.successRegistration
                    ? unionPathSuccess
                    : unionPathReject}
                />
                <h1 className="popup-infotooltip__text">{
                    props.successRegistration
                    ? 'Вы успешно зарегистрировались!'
                    : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h1>
            </div>
        </div>

    )
}

export default InfoTooltip;