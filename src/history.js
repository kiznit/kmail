import { createBrowserHistory, createLocation } from 'history';
import valueEqual from 'value-equal';


const createEnhancedHistory = () => {
    const proto = createBrowserHistory();

    return Object.assign(Object.create(proto), {

        // Emulate the behaviour of the browser when a link (anchor) is clicked.
        // This means only pushing to the history when the location is different.
        navigate: (path, state) => {
            const currentLocation = proto.location;
            const newLocation = createLocation(path, state, null, currentLocation);

            if (newLocation.pathname === currentLocation.pathname &&
                newLocation.search === currentLocation.search &&
                newLocation.hash === currentLocation.hash &&
                valueEqual(newLocation.state, currentLocation.state)) {
                // Same location, replace
                proto.replace.call(this, newLocation);
            } else {
                // New location, push
                proto.push.call(this, newLocation);
            }
        },
    });
};


export default __BROWSER__ ? createEnhancedHistory() : null;
