import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div className="error">
            <ErrorMessage/>
            <p className="error__text">Страница не существует</p>
            <Link className="error__link" to="/">Вернутся на главную</Link>
        </div>
    )
}

export default Page404;