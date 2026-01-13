import style from './Loading.module.scss';

export default function Loader(){
    return (
        <div className={'w-full h-full flex justify-center items-center'}>
            <span className={style.loader}></span>
        </div>
    )
}