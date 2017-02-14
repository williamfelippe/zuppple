import Moment from 'moment';

export function format(date) {
    Moment.locale("pt-br");
    return Moment.utc(date).fromNow();
}