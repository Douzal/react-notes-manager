import { useNavigate } from 'react-router-dom';

export const Utils = () => {
    const navigate = useNavigate();

    const navigateTo = (url) => {
        navigate(url);
    }
}