import { createBrowserHistory } from 'history';

const history = __BROWSER__ ? createBrowserHistory() : null;

export default history;
