import unionPathSuccess from '../images/Union.svg';
import unionPathReject from '../images/UnionReject.svg';

const InfoTooltip = (props) => {
    return (
        <div className="popup popup_active">
            <div className="popup-infotooltip">
                <button className="popup__button" />
                <img alt="Успешно!" className="popup-infotooltip__union" src={
                    props.success
                    ? unionPathSuccess
                    : unionPathReject}
                />
                <h1 className="popup-infotooltip__text">{
                    props.success
                    ? 'Вы успешно зарегистрировались!'
                    : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h1>
            </div>
        </div>

    )
}

export default InfoTooltip;