import { Logo } from 'components/Logo/index.jsx';
// import imgUrl from '../../assets/images/logo.png'
import imgUrl from 'assets/images/logo.png'; //possible car jsconfig.json
import style from './style.module.css';
import { ButtonPrimary } from 'components/ButtonPrimary/ButtonPrimary.jsx';
import { useNavigate } from 'react-router-dom';

export const Header = () => {

    const navigate = useNavigate();
    const url = 'note/new';

    const redirect = (e, url) => {
        e.preventDefault();
        navigate(url);
    }
    return (
        <div className={`row ${style.container}`}>
            <div className="col-xs-12 col-sm-4">
                <Logo title='Notomatic' subtitle='Easy note manager' image={imgUrl}/>
            </div>
            <div className="col-xs-12 col-sm-8 text-end">
                <ButtonPrimary handleClick={(e) => redirect(e, url)}>Add note +</ButtonPrimary>
            </div>
        </div>
    );
}