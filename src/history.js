import { createBrowserHistory, createMemoryHistory } from 'history';


export default __BROWSER__ ? createBrowserHistory() : createMemoryHistory();

