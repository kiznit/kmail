import { createMuiTheme } from '@material-ui/core/styles';
import color from '@material-ui/core/colors/brown';

export default function createTheme() {
    return createMuiTheme({
        palette: {
            primary: color,
        },
        typography: {
            suppressWarning: true,
        },
    });
}
