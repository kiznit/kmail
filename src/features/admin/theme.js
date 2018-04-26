import { createMuiTheme } from 'material-ui/styles';
import color from 'material-ui/colors/brown';

export default function createTheme() {
    return createMuiTheme({
        palette: {
            primary: color,
        },
    });
}
