import { createBrowserHistory } from 'history';


const createEnhancedHistory = () => {
    const proto = createBrowserHistory();

    return Object.assign(Object.create(proto), {

        // Refresh the page (re-render)
        refresh: () => {
            return proto.replace.call(this, proto.history);
        },
    });
}


export default __BROWSER__ ? createEnhancedHistory() : null;
