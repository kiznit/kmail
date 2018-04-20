import { createMuiTheme } from 'material-ui/styles';
import red from 'material-ui/colors/red';

export default function createTheme() {
    return createMuiTheme({
        palette: {
            primary: red,
        },
    });
}
