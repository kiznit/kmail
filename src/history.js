import { createBrowserHistory } from 'history';


export default __BROWSER__ ? createBrowserHistory() : null;
