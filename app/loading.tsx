import style from './components/Loading.module.scss';

export default function Loading(){
    return (
        <div className={ 'w-screen h-screen flex justify-center items-center' }>
            <span className={ style.loader }></span>
        </div>
    )
}