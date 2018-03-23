import { createBrowserHistory, createLocation } from 'history';
import valueEqual from 'value-equal';


const createEnhancedHistory = () => {
    const proto = createBrowserHistory();

    return Object.assign(Object.create(proto), {

        // Fix push() so that links behave like browser anchors
        push: (path, state) => {
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

        // Refresh the page (re-render)
        refresh: () => {
            return proto.replace.call(this, proto.location);
        },
    });
}


export default __BROWSER__ ? createEnhancedHistory() : null;
