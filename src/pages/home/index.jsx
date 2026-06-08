import '../../assets/main.css'
import { setTitle } from '../../utils/setPageTitle';

export const Home = () => {
    setTitle("Home");

    return (
        <div className="container">
            Hello world...
        </div>
    );
}
