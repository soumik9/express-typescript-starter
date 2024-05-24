import moment from 'moment'

const currentTimeToUnix = () => {
    return moment().unix()
}

export default {
    currentTimeToUnix,
}