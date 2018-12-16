// Here you should import all your reducers and combine them


const defaultState = {
    id: 123,
    foo: 'bar',
};


export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return defaultState;
    }
};
