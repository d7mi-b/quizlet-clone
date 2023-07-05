import style from '../styles/loading.module.css';

const Loading = () => {
    return (
        <div className='h-screen'>
            <div className={style.wrapper}>
                <span className={`${style.circle ? style.circle : ""} ${style.circle_1 ? style.circle_1 : ""}`}></span>
                <span className={`${style.circle ? style.circle : ""} ${style.circle_2 ? style.circle_2 : ""}`}></span>
                <span className={`${style.circle ? style.circle : ""} ${style.circle_3 ? style.circle_3 : ""}`}></span>
                <span className={`${style.circle ? style.circle : ""} ${style.circle_4 ? style.circle_4 : ""}`}></span>
                <span className={`${style.circle ? style.circle : ""} ${style.circle_5 ? style.circle_5 : ""}`}></span>
                <span className={`${style.circle ? style.circle : ""} ${style.circle_6 ? style.circle_6 : ""}`}></span>
                <span className={`${style.circle ? style.circle : ""} ${style.circle_7 ? style.circle_7 : ""}`}></span>
                <span className={`${style.circle ? style.circle : ""} ${style.circle_8 ? style.circle_8 : ""}`}></span>
                <p>Loading...</p>
            </div>
        </div>
    );
}

export default Loading;